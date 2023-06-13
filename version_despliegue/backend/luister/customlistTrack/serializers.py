from rest_framework import serializers
from customlistTrack.models import CustomlistTrack
from customlists.models import Customlist
from django import forms


class CustomlistTrackModelSerializer(serializers.ModelSerializer):


    class Meta:
     

        model = CustomlistTrack
        fields = (
            'id',
            'title',
            'artist',
            'customlistid',
            'lookupkey',
            'includedon',
        )



class CustomlistTrackSerializer(serializers.Serializer):
  
    customlistid=serializers.IntegerField()
    title = serializers.CharField(max_length=250)
    artist = serializers.CharField(allow_null=True)
    lookupkey = serializers.CharField(allow_null=True)
    includedon = serializers.DateTimeField(allow_null=True)
    
    def create(self, data):
        cid = Customlist.objects.get(id=data['customlistid'])
        try:
            customlist = CustomlistTrack.objects.get(customlistid=data['customlistid'],title=data['title'],artist=data['artist'])
        except:
            new = CustomlistTrack.objects.create(customlistid=cid,title=data['title'],artist=data['artist'],lookupkey=data['lookupkey'],includedon=data['includedon'])
            return new
        raise forms.ValidationError(u'CustomlistTrack "%s" is already added' % customlist)


       