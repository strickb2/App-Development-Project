from django.db import models
from django.contrib.auth.models import AbstractUser


# Create your models here.
class APIUser(AbstractUser):
    pass


class Product(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=200, null=False)
    price = models.DecimalField(max_digits=6, decimal_places=2, default=0.0)


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
