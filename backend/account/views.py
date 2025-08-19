from rest_framework.generics import ListAPIView,CreateAPIView
from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated,AllowAny
from rest_framework.decorators import action
from rest_framework.exceptions import NotFound
from .models import User,ContactMessage
from products.models import Product
from .serializers import UserSerializer,ProducerSerializer,ProducerProductsSerializer,ContactMessageSerializer,RegistersSerializer



class UserJoinDateView(ListAPIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        join_date = request.user.date_joined.date() 
        return Response({'date_joined': str(join_date)})


class UserInfoViewSet(ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return User.objects.filter(id=self.request.user.id)

    @action(detail=False, methods=['patch', 'put'], url_path='update-info')
    def update_user_info(self, request):
        user = self.request.user
        serializer = self.get_serializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)

class ProducerList(ListAPIView):
    serializer_class = ProducerSerializer
    queryset = User.objects.filter(is_producer=True)


class ProducerProductsView(ListAPIView):
    serializer_class = ProducerProductsSerializer

    def get_queryset(self):
        username = self.kwargs.get('username')
        try:
            producer = User.objects.get(username=username, is_producer=True)
        except User.DoesNotExist:
            raise NotFound("محصولی برای این سازنده وجود ندارد")
        return Product.objects.filter(producer=producer)


class ContactMessageView(CreateAPIView):
    queryset = ContactMessage.objects.all()
    serializer_class = ContactMessageSerializer
    permission_classes = []
    def perform_create(self, serializer):
        serializer.save()

    def create(self, request, *args, **kwargs):
        response = super().create(request, *args, **kwargs)
        response.data = {"message": "فرم با موفقیت ارسال شد!"}  
        return response

class RegisterView(CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegistersSerializer
    permission_classes = [AllowAny]