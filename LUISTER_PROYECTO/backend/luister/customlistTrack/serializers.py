from django.shortcuts import get_object_or_404
from rest_framework import serializers
from django.conf import settings
from rest_framework.response import Response
from customlistTrack.models import CustomlistTracks
from customlists.serializers import CustomlistModelSerializer
from customlists.models import Customlists
from django import forms

class CustomlistTrackModelSerializer(serializers.ModelSerializer):

    class Meta:
        model = CustomlistTracks
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
    artists = serializers.CharField(allow_null=True)
    album = serializers.CharField(allow_null=True)
    lookupkey = serializers.CharField(allow_null=True)
    includedon = serializers.DateTimeField(allow_null=True)
    
    def create(self, data):
        cid = Customlists.objects.get(id=data['customlistid'])
        try:
            cancionenlista = CustomlistTracks.objects.get(customlistid=data['customlistid'],title=data['title'],artists=data['artist'])
        except:
            nueva = CustomlistTracks.objects.create(customlistid=cid,title=data['title'],artists=data['artist'],lookupkey=data['lookupkey'],includedon=data['includedon'])
            return nueva
        raise forms.ValidationError(u'CustomlistTrack "%s" ya se encuentra agregada a favoritos' % cancionenlista)


       