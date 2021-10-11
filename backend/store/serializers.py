from rest_framework import serializers
from .models import *

class UserRegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = APIUser
        fields = ['username', 'email', 'password']
        extra_kwargs = {'password': {'write-only': True}}

    def create(self, validated_data):
        email = validated_data['email']
        username = validated_data['username']
        password = validated_data['password']
        new_user =APIUser.objects.create_user(username=username,email=email,password=password)
        new_user.save()
        return new_user

class APIUserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = APIUser
        fields = ['username', 'email', 'password']

class ProductSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Product
        fields = ['id', 'name', 'artist', 'genre', 'label', 'product_image', 'price']

class ArtistSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Artist
        fields = ['id', 'name']

class LabelSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Label
        fields = ['id', 'name']

class GenreSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Genre
        fields = ['id', 'name']

class SongSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Song
        fields = ['id', 'product_id', 'name']

class BasketSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Basket
        fields = ['id', 'user_id', 'is_active']

class BasketItemSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Basket
        fields = ['id', 'basket_id', 'product_id', 'quantity']

class OrderSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Basket
        fields = ['id', 'date_ordered', 'basket_id', 'user_id', 'total_price']
