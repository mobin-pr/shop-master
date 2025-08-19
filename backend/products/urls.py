from django.urls import path , include
from .views import ProductViewSet
from rest_framework import routers

app_name="products"

router = routers.SimpleRouter()
router.register(r'products', ProductViewSet , basename="products")


# urlpatterns = router.urls

urlpatterns = [
    path("",include(router.urls)),
]