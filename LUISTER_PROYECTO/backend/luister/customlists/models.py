from django.db import models
from users.models import User

class Customlists(models.Model):
    title = models.CharField('Title', max_length = 200, unique=True)
    description = models.TextField('Description', max_length = 400)
    image =  models.ImageField(upload_to='api', null=True)
    userid = models.ForeignKey(User, models.DO_NOTHING, db_column='userid', on_delete=models.CASCADE)
    creationdate = models.DateTimeField(auto_now=True)

    class Meta:
        managed = False
        db_table = 'customlists'
        unique_together = (('title', 'userid'),)
    
    def __str__(self):
        return '{0},{1}'.format(self.id,self.title)
