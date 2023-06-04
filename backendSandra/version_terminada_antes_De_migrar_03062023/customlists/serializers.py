

from rest_framework import serializers

from customlists.models import Customlist


class CustomlistModelSerializer(serializers.ModelSerializer):


    class Meta:
     

        model = Customlist
        fields = (
            'pk',
            'title',
            'description',
            'image',
            'creation',
        )

class CustomlistSerializer(serializers.Serializer):

    userid = serializers.HiddenField(default=serializers.CurrentUserDefault())
    title = serializers.CharField(max_length=250)
    description = serializers.CharField(allow_null=True)
    image = serializers.ImageField(max_length=None, use_url=True, allow_null=True, required=False)
    creation = serializers.DateTimeField()

    def create(self, data):

        customlist = Customlist.objects.create(**data)
        return customlist