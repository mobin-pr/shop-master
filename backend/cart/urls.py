from django.urls import path,include
from rest_framework.routers import SimpleRouter
from .views import CartItemViewSet,CartViewSet

router = SimpleRouter()
router.register(r'cart', CartViewSet, basename='cart')
router.register(r'cart-items', CartItemViewSet, basename='cart-item')

urlpatterns = [
    path("",include(router.urls))
]
