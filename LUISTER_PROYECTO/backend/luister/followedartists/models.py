from django.db import models
from users.models import Users

class FollowedArtists(models.Model):
    name = models.CharField('Nombre', max_length = 200, null=True)
    image = models.ImageField(null=True, upload_to='api')
    follower = models.ForeignKey(Users, models.DO_NOTHING, db_column='follower', on_delete=models.CASCADE)
    lookupkey= models.TextField('Lookupkey', max_length = 400)
    followedon= models.DateTimeField(auto_now=True)

    class Meta:
        managed = False
        db_table = 'followedartists'
        unique_together = (('name', 'follower'),)

    def __str__(self):
        return '{0},{1}'.format(self.id,self.name)