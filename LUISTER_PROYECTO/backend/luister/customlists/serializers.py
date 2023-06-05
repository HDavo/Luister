from rest_framework import serializers
from customlists.models import Customlists

class CustomlistModelSerializer(serializers.ModelSerializer):
    class Meta: 
        model = Customlists
        fields = (
            'id',
            'title',
            'description',
            'image',
            'userid',
            'creationdate',
        )

class CustomlistSerializer(serializers.Serializer):
    userid = serializers.HiddenField(default=serializers.CurrentUserDefault())
    title = serializers.CharField(max_length=255)
    description = serializers.CharField(allow_null=True)
    image = serializers.ImageField(max_length=None, use_url=True, allow_null=True, required=False)
    creationdate = serializers.DateTimeField()

    def create(self, data):
        customlist = Customlists.objects.create(**data)
        return customlist
