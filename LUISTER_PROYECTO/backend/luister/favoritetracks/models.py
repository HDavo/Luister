from django.db import models
from users.models import Users

class FavoriteTracks(models.Model):
    title = models.CharField('Title', max_length=255)
    artists = models.TextField()
    album = models.TextField()
    userid= models.ForeignKey(Users, on_delete=models.CASCADE, db_column='userid')
    lookupkey= models.TextField('Lookupkey', max_length = 400)
    includedon= models.DateTimeField(auto_now=True)

    class Meta:
        managed = False
        db_table = 'favoritetracks'
    
    def __str__(self):
        return '{0},{1}'.format(self.id,self.nombre)
