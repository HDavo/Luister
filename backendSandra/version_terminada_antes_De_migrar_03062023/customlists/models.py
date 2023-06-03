from django.db import models
from users.models import User

class Customlist(models.Model):
    id = models.AutoField(primary_key = True)
    title = models.CharField('Title', max_length = 200, unique=True)
    description = models.TextField('Description', max_length = 400)
    image = models.ImageField(null=True, upload_to='api')
    creation = models.DateTimeField(auto_now=True)
    userid= models.ForeignKey(User, on_delete=models.CASCADE) 

    def __str__(self):
        return '{0},{1}'.format(self.id,self.title)
