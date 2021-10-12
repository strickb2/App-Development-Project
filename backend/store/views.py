from django.db.models import query
from django.shortcuts import render
from rest_framework import viewsets, generics
from .models import *
from .serializers import *
from rest_framework.permissions import IsAuthenticated, IsAdminUser, AllowAny

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

class OrderViewSet(viewsets.ModelViewSet):
	queryset = Order.objects.all()
	serializer_class = OrderSerializer

class APIUserViewSet(viewsets.ModelViewSet):
	queryset = APIUser.objects.all()
	serializer_class = APIUserSerializer

class UserRegistrationAPIView(generics.CreateAPIView):
    serializer_class = UserRegistrationSerializer
    permission_classes = [AllowAny] #No login is needed to access this route
    queryset = queryset = APIUser.objects.all()

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