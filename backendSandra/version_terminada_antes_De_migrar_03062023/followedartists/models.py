from django.db import models

class FollowedArtist(models.Model):
    id = models.AutoField(primary_key = True)
    nombre = models.CharField('Nombre', max_length = 200, null=True)
    follower= models.IntegerField()
    lookupkey= models.TextField('Lookupkey', max_length = 400)
    followedon= models.DateTimeField(auto_now=True)
    image = models.ImageField(null=True, upload_to='api')

    def __str__(self):
        return '{0},{1}'.format(self.id,self.nombre)