from rest_framework import mixins, status, viewsets
from rest_framework.response import Response

from rest_framework.permissions import IsAuthenticated
from users.permissions import IsStandardUser

from followedartists.serializers import (FollowedArtistModelSerializer, FollowedArtistSerializer)

from followedartists.models import FollowedArtist

class FollowedArtistViewSet(mixins.ListModelMixin,
                        mixins.CreateModelMixin,
                        mixins.UpdateModelMixin,
                        mixins.DestroyModelMixin,
                        viewsets.GenericViewSet):

    serializer_class = FollowedArtistModelSerializer

    def get_permissions(self):
        permission_classes = [IsAuthenticated, IsStandardUser]
        return [permission() for permission in permission_classes]


    def get_queryset(self):
        queryset = FollowedArtist.objects.filter(userid=self.request.user)
        return queryset

        
    def create(self, request, *args, **kwargs):
        serializer = FollowedArtistSerializer(data=request.data, context={"request": self.request})
        serializer.is_valid(raise_exception=True)
        customlist = serializer.save()
        data = FollowedArtistModelSerializer(customlist).data
        return Response(data, status=status.HTTP_201_CREATED)
    