# Generated by Django 4.0.3 on 2022-03-12 15:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('store', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='review',
            name='is_featured',
            field=models.BooleanField(default=False),
        ),
    ]