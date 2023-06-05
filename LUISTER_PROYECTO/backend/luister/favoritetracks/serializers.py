
from rest_framework import serializers
from django.shortcuts import get_object_or_404
from favoritetracks.models import FavoriteTracks
from django import forms

class FavoriteTrackModelSerializer(serializers.ModelSerializer):

    class Meta:
        model = FavoriteTracks
        fields = (
            'id',
            'title',
            'artists',
            'album',
            'userid',
            'lookupkey',
            'includedon',
        )

class FavoriteTrackSerializer(serializers.Serializer):

    userid = serializers.HiddenField(default=serializers.CurrentUserDefault())
    title = serializers.CharField(max_length=250)
    artists = serializers.CharField(max_length=250)
    album = serializers.CharField(max_length=250)
    lookupkey = serializers.CharField(allow_null=True)
    includedon = serializers.DateTimeField()
    
    def create(self, data):

        try:
            fav = FavoriteTracks.objects.get(nombre=data['nombre'],userid=data['userid'])
        except:
            favorite = FavoriteTracks.objects.create(**data)
            return favorite
        raise forms.ValidationError(u'FavoriteTrack "%s" ya se encuentra agregada a favoritos' % fav)

      
    
        
    
      
