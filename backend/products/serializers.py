from rest_framework import serializers
from django.contrib.auth import get_user_model


from .models import Product,Category



class CategorySerializer(serializers.ModelSerializer):
    class Meta :
        model = Category
        fields = ['title','slug']


class ProducerSerializer(serializers.ModelSerializer):
    class Meta :
        model = get_user_model()
        fields = ['id','username','first_name','last_name']

class ProductSerializer(serializers.ModelSerializer):
    producer = ProducerSerializer()
    category = CategorySerializer(many=True)
    class Meta :
        model = Product
        fields = "__all__"