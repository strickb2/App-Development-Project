# Generated by Django 3.1.2 on 2021-10-09 22:42

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('store', '0005_product_product_image'),
    ]

    operations = [
        migrations.AddField(
            model_name='product',
            name='artist',
            field=models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, to='store.artist'),
        ),
        migrations.AddField(
            model_name='product',
            name='genre',
            field=models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, to='store.genre'),
        ),
        migrations.AddField(
            model_name='product',
            name='label',
            field=models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, to='store.label'),
        ),
    ]
