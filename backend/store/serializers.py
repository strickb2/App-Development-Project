from django.utils import tree
from rest_framework import serializers
from .models import *

class UserRegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = APIUser
        fields = ['username', 'email', 'password', 'name', 'address', 'phone']
        #extra_kwargs = {'password': {'write-only': True}}

    def create(self, validated_data):
        email = validated_data['email']
        username = validated_data['username']
        password = validated_data['password']
        name = validated_data['name']
        address = validated_data['address']
        phone = validated_data['phone']
        new_user = APIUser.objects.create_user(username=username,
                                              email=email,
                                              password=password,
                                              name=name,
                                              address=address,
                                              phone=phone)
        new_user.save()
        new_basket = Basket.objects.create(user_id = new_user)
        new_basket.save()
        return new_user

class APIUserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = APIUser
        fields = ['username', 'email', 'password', 'name', 'address', 'phone']

class ProductSerializer(serializers.HyperlinkedModelSerializer):
    artist = serializers.CharField(source="artist.name")
    genre = serializers.CharField(source="genre.name")
    label = serializers.CharField(source="label.name")

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
    product_id = serializers.CharField(source="product.id")

    class Meta:
        model = Song
        fields = ['id', 'product_id', 'name']

class BasketItemSerializer(serializers.HyperlinkedModelSerializer):
    product_id = serializers.CharField(source="product_id.id")
    item_price = BasketItem.item_price
    
    class Meta:
        model = BasketItem
        fields = ['id', 'product_name', 'product_id', 'quantity', 'item_price', 'basket_id']

class BasketSerializer(serializers.HyperlinkedModelSerializer):
    items = BasketItemSerializer(many=True, read_only=True, source='basketitems_set')
    class Meta:
        model = Basket
        fields = ['id', 'user_id', 'is_active', 'items']

class OrderSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Order
        fields = ['id', 'date_ordered', 'basket_id', 'user_id', 'total_price']

class AddBasketItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = BasketItem
        fields = ['product_id']
    
    def create(self, validated_data):
        product_id = validated_data['product_id']
        request = self.context.get('request', None)
        if request:
            current_user = request.user
            shopping_basket = Basket.objects.filter(user_id=current_user, is_active=True).first()
            # Check if the item is already in the user's basket
            basket_items = BasketItem.objects.filter(product_id=product_id, basket_id=shopping_basket).first()
            if basket_items:
                basket_items.quantity = basket_items.quantity + 1 # if it is already in the basket, add to the quantity
                basket_items.save()
                return basket_items
            else:
                new_basket_item = BasketItem.objects.create(basket_id = shopping_basket, product_id=product_id)
                new_basket_item.save()
                return new_basket_item
        else:
            return None

class RemoveBasketItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = BasketItem
        fields = ['product_id']

    
    def create(self, validated_data):
        product_id = validated_data['product_id']
        request = self.context.get('request', None)
        if request:
            current_user = request.user
            shopping_basket = Basket.objects.filter(user_id=current_user, is_active=True).first()
            # Check if the item is already in the basket
            basket_items = BasketItem.objects.filter(product_id=product_id).first()
            if basket_items:
                if basket_items.quantity > 1:
                    basket_items.quantity = basket_items.quantity - 1 # if it is already in the basket, add to the quantity
                    basket_items.save()
                    return basket_items
                else:
                    basket_items.delete()
                    return BasketItem.objects.create(basket_id=shopping_basket, product_id=product_id, quantity=0)
        else:
            return None

class CheckoutSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ['basket_id']

    def create(self, validated_data):
        request = self.context.get('request', None)
        current_user = request.user
        basket_id = validated_data['basket_id']
        # get the sopping basket
        # mark as inactive
        basket_id.is_active = False
        basket_id.save()
        # create a new order 
        order = Order.objects.create(basket_id = basket_id, user_id = current_user)
        order.save()
        # create a new empty basket for the customer 
        new_basket = Basket.objects.create(user_id = current_user)# Create a shopping basket 
        new_basket.save()
        # return the order
        return order