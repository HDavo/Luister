from django.db import models
from django.contrib.auth.models import AbstractUser



class User(AbstractUser):
    id=models.AutoField
    name=models.CharField(null=True, max_length=25)
    email = models.EmailField('email address', unique=True)
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']
    modified = models.DateTimeField(auto_now=True)
    photo = models.ImageField(null=True, upload_to='users')
    extract = models.CharField(null=True, max_length=15)
    phone = models.CharField(null=True, max_length=15)
    city = models.CharField(null=True, max_length=255)
    country = models.CharField(null=True, max_length=255)
    is_recruiter = models.BooleanField(default=False)
    creationdate=models.DateTimeField(auto_now=True)
    