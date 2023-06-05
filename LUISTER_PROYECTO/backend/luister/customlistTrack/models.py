
from django.db import models
from customlists.models import Customlists

class CustomlistTracks(models.Model):
    title = models.CharField('Title', max_length = 255)
    artists = models.CharField('Artist', max_length = 200)
    album = models.TextField()
    customlistid= models.ForeignKey(Customlists, db_column='customlistid', on_delete=models.CASCADE)
    lookupkey= models.TextField('Lookupkey', max_length = 100)
    includedon= models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'customlisttracks'

    def __str__(self):
        return '{0},{1}'.format(self.id,self.title)