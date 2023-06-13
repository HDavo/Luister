from django.db import models
from users.models import User

class FollowedArtist(models.Model):
    id = models.AutoField(primary_key = True)
    nombre = models.CharField('Nombre', max_length = 200, null=True)
    lookupkey= models.TextField('Lookupkey', max_length = 400)
    followedon= models.DateTimeField(auto_now=True)
    image = models.ImageField(null=True, upload_to='api')
    follower= models.ForeignKey(User, on_delete=models.CASCADE, db_column='follower') 

    def __str__(self):
        return '{0},{1}'.format(self.id,self.nombre)

    class Meta:
        managed = False
        db_table = 'followedartists'
