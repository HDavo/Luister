"""Users views."""
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
"""
def authenticated (request):
    if request.user.is_authenticated:
        print("User is logged in :)")
        print(f"Username --> {request.user.username}")
    else:
        print("User is not logged in :(")
"""


class UserViewSet(viewsets.GenericViewSet):

    queryset = User.objects.filter(is_active=True)
    serializer_class = UserModelSerializer
    lookup_field = 'username'

    """
    @action(detail=False, methods=['post'])
    def comprueba(self, request):
        if request.user.is_authenticated:
            print("User is logged in :)")
            print(f"Username --> {request.user.username}")
        else:
            print("User is not logged in :(")
        
    """
    @action(detail=False, methods=['post'])
    def login(self, request):
        """User sign in."""
        serializer = UserLoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user, token = serializer.save()
        data = {
            'user': UserModelSerializer(user).data,
            'access_token': token
        }
        """
        usuario=User.objects.get(id = data['user']['id'])
        session = Sessions(userid=usuario.id, token=token)
        session.save()
        
        """

        """
                noticia=get_object_or_404(Noticias,pk=id)

        user=User.objects.create(id=data['user']['id'],email=data['user']['email'])
        session = Sessions.objects.create(userid=user.id, token=user.data['access_token'])
        #session = Sessions(userid=data['user']['id'], token=data['access_token'])
        
        session.save()
        """
        
        return Response(data, status=status.HTTP_201_CREATED)
    
    
    @action(detail=False, methods=['post'])
    def signup(self, request):
        """User sign up."""
        serializer = UserSignUpSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        data = UserModelSerializer(user).data
        return Response(data, status=status.HTTP_201_CREATED)
    
    @action(detail=False, methods=['post'])
    def logout(self, request):
            #user= User.get_or...(id)
            #access_token = request.data.get('access_token', None)
            """
            data = {
            'user': UserModelSerializer(user).data,
            'access_token': token
            }
            """
            """
            session=get_object_or_404(Sessions,userid=request.user.id)
            session.delete()
            """ 


            try:
                #user.access_token.delete
                request.access_token.delete()
                #he probado tambien con auth_token, y con .user.delete
            except (AttributeError, User.DoesNotExist):
                pass

            logout(request)
            return Response(
                request.user.username,
                status=status.HTTP_200_OK)
    
    @receiver(reset_password_token_created)
    def password_reset_token_created(sender, instance, reset_password_token, *args, **kwargs):
    # Aquí para mandar email al user
        print(
            f"\nRecupera la contraseña del correo '{reset_password_token.user.email}' usando el token '{reset_password_token.key}' desde la API http://localhost:8000/api/auth/reset/confirm/.\n\n"

            f"También puedes hacerlo directamente desde el cliente web en http://localhost:3000/new-password/?token={reset_password_token.key}.\n")
        
    """   
    def post(self, request):
        # Recuperamos las credenciales y autenticamos al usuario
        email = request.data.get('email', None)
        password = request.data.get('password', None)
        user = authenticate(email=email, password=password)

        # Si es correcto añadimos a la request la información de sesión
        if user:
            login(request, user)
            return Response(
                UserSerializer(user).data,
                status=status.HTTP_200_OK)
    """


    