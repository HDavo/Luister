from django.shortcuts import get_object_or_404
from rest_framework import serializers
from django.conf import settings
from rest_framework.response import Response
from customlistTrack.models import CustomlistTrack
from customlists.serializers import CustomlistModelSerializer
from customlists.models import Customlist
from django.db import models
from django import forms


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
  
    customlistid=serializers.IntegerField()
    title = serializers.CharField(max_length=250)
    artist = serializers.CharField(allow_null=True)
    lookupkey = serializers.CharField(allow_null=True)
    includedon = serializers.DateTimeField(allow_null=True)
    
    def create(self, data):
        cid = Customlist.objects.get(id=data['customlistid'])
        try:
            cancionenlista = CustomlistTrack.objects.get(customlistid=data['customlistid'],title=data['title'],artist=data['artist'])
        except:
            nueva = CustomlistTrack.objects.create(customlistid=cid,title=data['title'],artist=data['artist'],lookupkey=data['lookupkey'],includedon=data['includedon'])
            return nueva
        raise forms.ValidationError(u'CustomlistTrack "%s" ya se encuentra agregada a favoritos' % cancionenlista)


       