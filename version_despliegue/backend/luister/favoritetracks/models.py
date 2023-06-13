from django.db import models
from users.models import User

class FavoriteTrack(models.Model):
    id = models.AutoField(primary_key = True)
    userid= models.ForeignKey(User, on_delete=models.CASCADE, db_column='userid')
    nombre = models.CharField('Nombre', max_length = 200, null=True)
    lookupkey= models.TextField('Lookupkey', max_length = 400)
    includedon= models.DateTimeField(auto_now=True)

    def __str__(self):
        return '{0},{1}'.format(self.id,self.nombre)

    class Meta:
        managed = False
        db_table = 'favoritetracks'
