from rest_framework.viewsets import ModelViewSet

from .serializers import ProductSerializer
from .models import Product
from .permissions import IsStaffOrReadOnly,IsProducerOrReadOnly
# Create your views here.
class ProductViewSet(ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    ordering = ["-created_date"]
    ordering_fields = ['status', 'price']
    search_fields = ['title',
                     'category__slug',
                     'producer__username',
                     'producer__first_name',
                     'producer__last_name']
    
    def get_permissions(self):
        if self.action == 'list':
            permission_classes = [IsStaffOrReadOnly]
        else:
            permission_classes = [IsStaffOrReadOnly, IsProducerOrReadOnly]
        return [permission() for permission in permission_classes]

    def get_queryset(self):
        queryset = self.queryset


        category_slug = self.request.query_params.get('category__slug', None)
        if category_slug:
            queryset = queryset.filter(category__slug=category_slug)

        producer_username = self.request.query_params.get('producer__username', None)
        if producer_username:
            queryset = queryset.filter(producer__username=producer_username)

        return queryset
