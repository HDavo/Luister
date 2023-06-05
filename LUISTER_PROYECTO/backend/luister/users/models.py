from django.db import models
from django.contrib.auth.models import AbstractBaseUser
from .admin import UserAdmin

class Users(AbstractBaseUser):
    name=models.CharField(null=True, max_length=25)
    email = models.EmailField('Email', unique=True, max_length=55)
    password = models.TextField()
    last_login=models.DateTimeField(null=True)
    creationdate=models.DateTimeField(auto_now=True)
    USERNAME_FIELD = 'email'
    #REQUIRED_FIELDS = ['username']
    objects = UserAdmin()

    class Meta:
        managed = False
        db_table = 'users'