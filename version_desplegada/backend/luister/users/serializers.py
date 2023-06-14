from django.contrib.auth import password_validation, authenticate

import random
from rest_framework import serializers
from rest_framework.authtoken.models import Token
from rest_framework.validators import UniqueValidator
from users.models import User


class UserModelSerializer(serializers.ModelSerializer):

    class Meta:

        model = User
        fields = (
            'id',
            'email',
            'name',
        )

    # def update(self, instance, validated_data):
    #     validated_data.pop('email', None)               
    #     return super().update(instance, validated_data)  
    
class UserLoginSerializer(serializers.Serializer):

    email = serializers.EmailField()
    password = serializers.CharField(min_length=8, max_length=64)

    
    def validate(self, data):

        user = authenticate(username=data['email'], password=data['password'])
        if not user:
            raise serializers.ValidationError('Invalid credentials')

        self.context['user'] = user
        return data

    def create(self, data):
        
        token, created = Token.objects.get_or_create(user=self.context['user'])
        return self.context['user'], token.key


class UserSignUpSerializer(serializers.Serializer):
    
    name=serializers.CharField(
        min_length=3,
        max_length=10)
    
    email = serializers.EmailField(
        validators=[UniqueValidator(queryset=User.objects.all())]
    )

    password = serializers.CharField(min_length=8, max_length=64)

    password_2 = serializers.CharField(min_length=8, max_length=64)

   
    
    def validate(self, data):
        password1 = data['password']
        password2 = data['password_2']
        if password1 != password2:
            raise serializers.ValidationError("password and password_2 don't match")
        password_validation.validate_password(password1)
        return data

    def create(self, data):
        data.pop('password_2')
        user = User.objects.create_user(**data,username=f'{random.randrange(10000000)}')
        return user
