from django.db import models
from django.contrib.auth.models import AbstractUser


# Create your models here.
class APIUser(AbstractUser):
    pass

# Product Artist Model
class Artist(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=150, null=False)

# Product Label Company Model
class Label(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=150, default="Independent")

# Product Genre Types Model
class Genre(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=50, null=False)

# Product Model
class Product(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=200, null=False)
    artist = models.ForeignKey(Artist, on_delete=models.CASCADE)
    genre = models.ForeignKey(Genre, on_delete=models.CASCADE)
    label = models.ForeignKey(Label, on_delete=models.CASCADE)
    product_image = models.FileField(upload_to='products')
    price = models.DecimalField(max_digits=6, decimal_places=2, default=0.00)

    def __str__(self):
        return self.name
        

# Product songs
class Song(models.Model):
    id = models.AutoField(primary_key=True)
    product_id = models.ForeignKey(Product, on_delete=models.CASCADE)
    name = models.CharField(max_length=100, null=False)

    def __str__(self):
        return self.name

class Basket(models.Model):
    id = models.AutoField(primary_key=True)
    user_id = models.ForeignKey(APIUser, on_delete=models.CASCADE)
    is_active = models.BooleanField(default=True)


class BasketItem(models.Model):
    id = models.AutoField(primary_key=True)
    basket_id = models.ForeignKey(Basket, on_delete=models.CASCADE)
    product_id = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.IntegerField(default=1)

    def item_price(self):
        return self.product_id.price * self.quantity


class Order(models.Model):
    id = models.AutoField(primary_key=True)
    date_ordered = models.DateTimeField(auto_now_add=True)
    basket_id = models.ForeignKey(Basket, on_delete=models.CASCADE)
    user_id = models.ForeignKey(APIUser, on_delete=models.CASCADE)
    total_price = models.DecimalField(max_digits=6, decimal_places=2, default=0.0)
