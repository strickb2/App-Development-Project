# Generated by Django 3.1.2 on 2021-12-13 23:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('store', '0015_auto_20211213_2231'),
    ]

    operations = [
        migrations.AlterField(
            model_name='apiuser',
            name='id',
            field=models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID'),
        ),
    ]