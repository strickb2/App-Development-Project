# Generated by Django 3.2.7 on 2021-11-14 19:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('store', '0013_auto_20211011_1207'),
    ]

    operations = [
        migrations.AddField(
            model_name='apiuser',
            name='address',
            field=models.CharField(default='123 Apple St', max_length=200),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='apiuser',
            name='name',
            field=models.CharField(default='John Smith', max_length=100),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='apiuser',
            name='phone',
            field=models.CharField(default='0835555123', max_length=20),
            preserve_default=False,
        ),
    ]