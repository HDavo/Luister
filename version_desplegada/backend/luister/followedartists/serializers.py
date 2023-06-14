from rest_framework import serializers

from followedartists.models import FollowedArtist
from django import forms

class FollowedArtistModelSerializer(serializers.ModelSerializer):


    class Meta:
     

        model = FollowedArtist
        fields = (
            'id',
            'nombre',
            'follower',
            'lookupkey',
            'followedon',
            'image'
        )

class FollowedArtistSerializer(serializers.Serializer):

    userid = serializers.HiddenField(default=serializers.CurrentUserDefault())
    nombre = serializers.CharField(max_length=250)
    follower = serializers.IntegerField(allow_null=True)
    lookupkey = serializers.CharField(allow_null=True)
    image = serializers.ImageField(max_length=None, use_url=True, allow_null=True, required=False)
    followedon = serializers.DateTimeField()

    def create(self, data):

        try:
            followed = FollowedArtist.objects.get(nombre=data['nombre'],userid=data['userid'])
        except:
            f = FollowedArtist.objects.create(**data)
            return f
        raise forms.ValidationError(u'FollowedArtist "%s" already following' % followed)