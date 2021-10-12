"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import include, path
from django.conf import settings
from django.conf.urls.static import static
from rest_framework import routers
from store import views
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

router = routers.DefaultRouter()
router.register(r'products', views.ProductViewSet)
router.register(r'genres', views.GenreViewSet)
router.register(r'labels', views.LabelViewSet)
router.register(r'artists', views.ArtistViewSet)
router.register(r'songs', views.SongViewSet)
router.register(r'baskets', views.BasketViewSet)
router.register(r'basketitems', views.BasketItemViewSet)
router.register(r'orders', views.OrderViewSet)
router.register(r'users', views.APIUserViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls')),
    path('register/', views.UserRegistrationAPIView.as_view(), name="register"),
    path('add/', views.AddBasketItemAPIView.as_view(), name="add_to_basket"),
    path('remove/', views.RemoveBasketItemAPIView.as_view(), name="remove_from_basket"),
    path('checkout/', views.CheckoutAPIView.as_view(), name="checkout"),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)