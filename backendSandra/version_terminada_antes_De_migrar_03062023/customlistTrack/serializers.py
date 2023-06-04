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
    #customlistid=get_object_or_404(Customlist,userid=int(settings.AUTH_USER_MODEL.id)).id
    #user = models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.CASCADE, related_name='user')
    #customlistid=get_object_or_404(Customlist,userid=1)
    customlistid=serializers.IntegerField()
    title = serializers.CharField(max_length=250)
    artist = serializers.CharField(allow_null=True)
    lookupkey = serializers.CharField(allow_null=True)
    includedon = serializers.DateTimeField(allow_null=True)
    #Cannot assign "1": "CustomlistTrack.customlistid" must be a "Customlist" instance
    #no puedo pasarle como parametro un entero si es una fk, asi que primero creo una instancia y despues le paso como parametro todos los datos con el tipo de dato correspondiente menos la fk que es instance
    def create(self, data):
        cid = Customlist.objects.get(id=data['customlistid'])
        try:
            cancionenlista = CustomlistTrack.objects.get(customlistid=data['customlistid'],title=data['title'],artist=data['artist'])
        except:
            nueva = CustomlistTrack.objects.create(customlistid=cid,title=data['title'],artist=data['artist'],lookupkey=data['lookupkey'],includedon=data['includedon'])
            return nueva
        raise forms.ValidationError(u'CustomlistTrack "%s" ya se encuentra agregada a favoritos' % cancionenlista)


       