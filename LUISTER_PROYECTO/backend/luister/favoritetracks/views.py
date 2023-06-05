from rest_framework.permissions import IsAuthenticated
from users.permissions import IsStandardUser
from favoritetracks.serializers import (FavoriteTrackModelSerializer, FavoriteTrackSerializer)
from favoritetracks.models import FavoriteTracks
from rest_framework import mixins, status, viewsets
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from users.permissions import IsStandardUser

class FavoriteTrackViewSet(mixins.ListModelMixin,
                        mixins.CreateModelMixin,
                        mixins.UpdateModelMixin,
                        mixins.DestroyModelMixin,
                        viewsets.GenericViewSet):

    serializer_class = FavoriteTrackModelSerializer

    def get_permissions(self):
        permission_classes = [IsAuthenticated, IsStandardUser]
        return [permission() for permission in permission_classes]

    def get_queryset(self):
        queryset = FavoriteTracks.objects.filter(userid=self.request.user)
        return queryset

    def create(self, request, *args, **kwargs):
        serializer = FavoriteTrackSerializer(data=request.data, context={"request": self.request})
        serializer.is_valid(raise_exception=True)
        customlist = serializer.save()
        data = FavoriteTrackModelSerializer(customlist).data
        return Response(data, status=status.HTTP_201_CREATED)