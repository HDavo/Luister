# Generated by Django 4.2.1 on 2023-06-03 11:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0005_user_name'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='creationdate',
            field=models.DateTimeField(auto_now=True),
        ),
    ]
