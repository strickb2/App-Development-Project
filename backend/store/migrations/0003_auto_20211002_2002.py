# Generated by Django 3.1.2 on 2021-10-02 19:02

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('store', '0002_basket_basketitems_order_product'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='BasketItems',
            new_name='BasketItem',
        ),
    ]