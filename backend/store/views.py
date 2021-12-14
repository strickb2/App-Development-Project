from django.db.models import query
from django.http import request
from django.shortcuts import render
from rest_framework import views, viewsets, generics
from rest_framework.decorators import authentication_classes, permission_classes
from rest_framework.serializers import Serializer
from .models import *
from .serializers import *
from rest_framework.permissions import IsAuthenticated, IsAdminUser, AllowAny
from django_filters.rest_framework import DjangoFilterBackend

class ProductViewSet(viewsets.ModelViewSet):
	serializer_class = ProductSerializer
	queryset = Product.objects.all()
	filter_backends = [DjangoFilterBackend]
	filterset_fields = ['artist', 'genre', 'label', 'id']

class ArtistViewSet(viewsets.ModelViewSet):
	queryset = Artist.objects.all()
	serializer_class = ArtistSerializer

class GenreViewSet(viewsets.ModelViewSet):
	queryset = Genre.objects.all()
	serializer_class = GenreSerializer

class SongViewSet(viewsets.ModelViewSet):
	queryset = Song.objects.all()
	serializer_class = SongSerializer
	filter_backends = [DjangoFilterBackend]
	filterset_fields = ['product_id']

class LabelViewSet(viewsets.ModelViewSet):
	queryset = Label.objects.all()
	serializer_class = LabelSerializer

class BasketViewSet(viewsets.ModelViewSet):
	queryset = Basket.objects.all()
	serializer_class = BasketSerializer
	permission_classes = [IsAuthenticated]

	def get_queryset(self):
		user = self.request.user # get the current user
		if user.is_superuser:
			return Basket.objects.all() # return all the baskets if a superuser requests
		else:
			# For normal users, only return the current active basket
			shopping_basket = Basket.objects.filter(user_id=user, is_active=True)
			return shopping_basket

class BasketItemViewSet(viewsets.ModelViewSet):
	queryset = BasketItem.objects.all()
	serializer_class = BasketItemSerializer
	permission_classes = [IsAuthenticated]
	
	def get_queryset(self):
		user = self.request.user
		if user.is_superuser:			
			BasketItem.objects.all()
		else:
			# Get basket for current user and current basket's items
			basket = Basket.objects.filter(user_id=user, is_active=True).values()[0]['id']
			return BasketItem.objects.filter(basket_id=basket)

class OrderViewSet(viewsets.ModelViewSet):
	queryset = Order.objects.all()
	serializer_class = OrderSerializer

	def get_queryset(self):
		user = self.request.user # get the current user
		if user.is_superuser:
			return Order.objects.all() # return all the orders if a superuser requests
		else:
			# For normal users, only return their orders
			orders = Order.objects.filter(user_id=user)
			return orders

class APIUserViewSet(viewsets.ModelViewSet):
	queryset = APIUser.objects.all()
	serializer_class = APIUserSerializer
	permission_classes = [IsAuthenticated]

	def get_object(self):
		pk = self.kwargs.get('pk')
		if pk == "current":
			return self.request.user
		
		return super(APIUserViewSet, self).get_object()

class UserRegistrationAPIView(generics.CreateAPIView):
	serializer_class = UserRegistrationSerializer
	permission_classes = [AllowAny] # No login is needed to access this route
	queryset = APIUser.objects.all()

class AddBasketItemAPIView(generics.CreateAPIView):
    serializer_class = AddBasketItemSerializer
    permission_classes = [IsAuthenticated]
    queryset = BasketItem.objects.all()

class RemoveBasketItemAPIView(generics.CreateAPIView):
    serializer_class = RemoveBasketItemSerializer
    permission_classes = [IsAuthenticated]
    queryset = BasketItem.objects.all()

class CheckoutAPIView(generics.CreateAPIView):
    serializer_class = CheckoutSerializer
    permission_classes = [IsAuthenticated]
    queryset = Order.objects.all()