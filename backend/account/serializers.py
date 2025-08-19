from rest_framework import serializers
from .models import User , ContactMessage 
from products.models import Product
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields =  ['username', 'email', 'phone_number', 'address', 'bio', 'profile_picture'] 

class ProducerProductsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['id', 'title', "slug", "image", 'content', 'price', 'status']

class ProducerSerializer(serializers.ModelSerializer):
    products_link = serializers.SerializerMethodField()  

    class Meta:
        model = User
        fields = ['username', 'first_name', 'last_name', 'profile_picture' , 'products_link']

    def get_products_link(self, obj):
        request = self.context.get('request') 
        return request.build_absolute_uri(f'/api/producers/{obj.username}/')
    

class ContactMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = ['name','email',"message"]



class RegistersSerializer(serializers.ModelSerializer):
    password1 = serializers.CharField(write_only=True, min_length=8)
    password2 = serializers.CharField(write_only=True, min_length=8)
    
    class Meta:
        model = User
        fields = ['username', 'email', 'password1', 'password2']
    
    def validate(self, data):
        if data['password1'] != data['password2']:
            raise serializers.ValidationError({'password': "Passwords don't match."})
        return data
    
    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password1']
        )
        user.is_active = True
        user.save()
        return user