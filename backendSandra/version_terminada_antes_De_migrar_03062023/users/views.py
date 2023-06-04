from rest_framework.decorators import api_view

from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from datetime import datetime, timezone, timedelta
from django.contrib.auth import logout
from django.shortcuts import get_object_or_404
from users.serializers import UserLoginSerializer, UserModelSerializer, UserSignUpSerializer

from users.models import User

from django.dispatch import receiver
from django_rest_passwordreset.signals import reset_password_token_created



class UserViewSet(viewsets.GenericViewSet):

    queryset = User.objects.filter(is_active=True)
    serializer_class = UserModelSerializer
    lookup_field = 'username'

  
   
    @action(detail=False, methods=['post'])
    def login(self, request):
        serializer = UserLoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user, token = serializer.save()
        data = {
            'user': UserModelSerializer(user).data,
            'access_token': token
        }
       
        return Response(data, status=status.HTTP_201_CREATED)
    
    
    @action(detail=False, methods=['post'])
    def signup(self, request):
        serializer = UserSignUpSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        data = UserModelSerializer(user).data
        return Response(data, status=status.HTTP_201_CREATED)
    
    @action(detail=False, methods=['post'])
    def logout(self, request):
          
            try:
                request.access_token.delete()
            except (AttributeError, User.DoesNotExist):
                pass

            logout(request)
            return Response(
                request.user.username,
                status=status.HTTP_200_OK)
    
    @receiver(reset_password_token_created)
    def password_reset_token_created(sender, instance, reset_password_token, *args, **kwargs):
        print(
            f"\nRecupera la contraseña del correo '{reset_password_token.user.email}' usando el token '{reset_password_token.key}' desde la API http://localhost:8000/api/auth/reset/confirm/.\n\n"

            f"También puedes hacerlo directamente desde el cliente web en http://localhost:3000/new-password/?token={reset_password_token.key}.\n")
        
   

    