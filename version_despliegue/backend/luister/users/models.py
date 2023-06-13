from django.db import models
from django.contrib.auth.models import AbstractUser



class User(AbstractUser):
    id=models.AutoField
    name=models.CharField(null=True, max_length=25)
    email = models.EmailField('email address', unique=True)
    USERNAME_FIELD='email'
    REQUIRED_FIELDS = ['name']
    is_superuser= models.BooleanField(default=False)
    creationdate=models.DateTimeField(auto_now=True)

class Meta:
    managed = False
    db_table = 'users'
