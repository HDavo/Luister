from rest_framework import serializers
from favoritetracks.models import FavoriteTrack
from django import forms

class FavoriteTrackModelSerializer(serializers.ModelSerializer):


    class Meta:
     

        model = FavoriteTrack
        fields = (
            'id',
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
        raise forms.ValidationError(u'FavoriteTrack "%s" is already added' % fav)

      
    
        