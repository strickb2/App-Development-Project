# Generated by Django 3.1.2 on 2021-10-11 10:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('store', '0011_auto_20211011_1057'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='product_image',
            field=models.FileField(blank=True, default=None, upload_to='products'),
        ),
    ]
