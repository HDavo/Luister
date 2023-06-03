from django.shortcuts import get_object_or_404
from rest_framework import serializers
from django.conf import settings
from rest_framework.response import Response
from customlistTrack.models import CustomlistTrack
from customlists.serializers import CustomlistModelSerializer
from customlists.models import Customlist
from django.db import models
class CustomlistTrackModelSerializer(serializers.ModelSerializer):


    class Meta:
     

        model = CustomlistTrack
        fields = (
            'pk',
            'title',
            'artist',
            'customlistid',
            'lookupkey',
            'includedon',
        )



class CustomlistTrackSerializer(serializers.Serializer):
    
    #customlistid=get_object_or_404(Customlist,userid=int(settings.AUTH_USER_MODEL.id)).id
    #user = models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.CASCADE, related_name='user')
    #customlistid=get_object_or_404(Customlist,userid=1)
    customlistid=serializers.IntegerField()
    title = serializers.CharField(max_length=250)
    artist = serializers.CharField(allow_null=True)
    lookupkey = serializers.CharField(allow_null=True)
    includedon = serializers.DateTimeField()

    def create(self, data):
        
        Customlisttrack = CustomlistTrack.objects.create(**data)
        return Customlisttrack