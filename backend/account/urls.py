from django.urls import path , include
from rest_framework import routers
from .views import UserInfoViewSet,UserJoinDateView,ProducerList,ProducerProductsView,ContactMessageView,RegisterView

app_name="user_accounts"

router = routers.SimpleRouter()
router.register(r'user', UserInfoViewSet , basename="user")

urlpatterns = [
    path("",include(router.urls)),
    path("account/create/",RegisterView.as_view(),name="account-register"),
    path('user/update-info/', UserInfoViewSet.as_view({'patch': 'update_user_info', 'put': 'update_user_info'}), name='update-info'),
    path("user/date-joined",UserJoinDateView.as_view(),name="joined-date"),
    path("producers/",ProducerList.as_view(),name="producer-list"),
    path('producers/<str:username>/', ProducerProductsView.as_view(), name='producer-products'),
    path("contact/",ContactMessageView.as_view(),name="contact")
]