from django.db import models
from customlists.models import Customlist

class CustomlistTrack(models.Model):
    id = models.AutoField(primary_key = True)
    title = models.CharField('Title', max_length = 200, unique=True)
    artists = models.CharField('Artist', max_length = 200)
    customlistid= models.ForeignKey(Customlist, on_delete=models.CASCADE, db_column='customlistid')
    lookupkey= models.TextField('Lookupkey', max_length = 400)
    includedon= models.DateTimeField(null=True)

    def __str__(self):
        return '{0},{1}'.format(self.id,self.title)

    class Meta:
        managed = False
        db_table = 'customlisttracks'
