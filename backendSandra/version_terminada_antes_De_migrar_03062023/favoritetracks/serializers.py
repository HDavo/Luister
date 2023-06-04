
from rest_framework import serializers
from django.shortcuts import get_object_or_404
from favoritetracks.models import FavoriteTrack
from django import forms

class FavoriteTrackModelSerializer(serializers.ModelSerializer):


    class Meta:
     

        model = FavoriteTrack
        fields = (
            'pk',
            'nombre',
            'lookupkey',
            'includedon',
        )

class FavoriteTrackSerializer(serializers.Serializer):

    userid = serializers.HiddenField(default=serializers.CurrentUserDefault())
    nombre = serializers.CharField(max_length=250)
    lookupkey = serializers.CharField(allow_null=True)
    includedon = serializers.DateTimeField()

    
    def create(self, data):

        try:
            fav = FavoriteTrack.objects.get(nombre=data['nombre'],userid=data['userid'])
        except:
            favorite = FavoriteTrack.objects.create(**data)
            return favorite
        raise forms.ValidationError(u'FavoriteTrack "%s" ya se encuentra agregada a favoritos' % fav)

      
    
        
    
      
