from django.db.models import query
from django.shortcuts import render
from rest_framework import viewsets
from .models import *
from .serializers import *
from rest_framework.permissions import IsAuthenticated, IsAdminUser

class ProductViewSet(viewsets.ModelViewSet):
	queryset = Product.objects.all()
	serializer_class = ProductSerializer

class ArtistViewSet(viewsets.ModelViewSet):
	queryset = Artist.objects.all()
	serializer_class = ArtistSerializer

class GenreViewSet(viewsets.ModelViewSet):
	queryset = Genre.objects.all()
	serializer_class = GenreSerializer

class SongViewSet(viewsets.ModelViewSet):
	queryset = Song.objects.all()
	serializer_class = SongSerializer

class LabelViewSet(viewsets.ModelViewSet):
	queryset = Label.objects.all()
	serializer_class = LabelSerializer

class BasketViewSet(viewsets.ModelViewSet):
	queryset = Basket.objects.all()
	serialzer_class = BasketSerializer

class BasketItemViewSet(viewsets.ModelViewSet):
	queryset = BasketItem.objects.all()
	serializer_class = BasketItemSerializer

class OrderViewSet(viewsets.ModelViewSet):
	queryset = Order.objects.all()
	serializer_class = OrderSerializer

class APIUserViewSet(viewsets.ModelViewSet):
	queryset = APIUser.objects.all()
	serializer_class = APIUserSerializer