
from rest_framework import mixins, status, viewsets
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from users.permissions import IsStandardUser
from customlistTrack.serializers import (CustomlistTrackModelSerializer, CustomlistTrackSerializer)

from customlistTrack.models import CustomlistTracks

class CustomlistTrackViewSet(mixins.ListModelMixin,
                        mixins.CreateModelMixin,
                        mixins.UpdateModelMixin,
                        mixins.DestroyModelMixin,
                        viewsets.GenericViewSet):

    serializer_class = CustomlistTrackModelSerializer

    def get_permissions(self):
        permission_classes = [IsAuthenticated, IsStandardUser]
        return [permission() for permission in permission_classes]

    def get_queryset(self):
        queryset = CustomlistTracks.objects.filter(customlistid=self.request.user)
        return queryset

    def create(self, request, *args, **kwargs):
        serializer = CustomlistTrackSerializer(data=request.data, context={"request": self.request})
        serializer.is_valid(raise_exception=True)
        customlisttrack = serializer.save()
        data = CustomlistTrackModelSerializer(customlisttrack).data
        return Response(data, status=status.HTTP_201_CREATED)
    