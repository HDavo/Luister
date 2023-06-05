from django.contrib.auth import password_validation, authenticate
from django.core.validators import RegexValidator, FileExtensionValidator
from rest_framework import serializers
from rest_framework.authtoken.models import Token
from rest_framework.validators import UniqueValidator
from users.models import Users

class UserModelSerializer(serializers.ModelSerializer):

    class Meta:
        model = Users
        fields = (
            'id',
            'name',
            'email',
            'creationdate',
        )

    def update(self, instance, validated_data):
        validated_data.pop('email', None)               
        return super().update(instance, validated_data)  
    
class UserLoginSerializer(serializers.Serializer):

    email = serializers.EmailField()
    password = serializers.CharField(min_length=6, max_length=64)

    def validate(self, data):

        user = authenticate(email=data['email'], password=data['password'])
        if not user:
            raise serializers.ValidationError('Las credenciales no son válidas')

        self.context['user'] = user
        return data

    def create(self, data):
        
        token, created = Token.objects.get_or_create(user=self.context['user'])
        return self.context['user'], token.key

class UserSignUpSerializer(serializers.Serializer):

    email = serializers.EmailField(
        validators=[UniqueValidator(queryset=Users.objects.all())]
    )
    name = serializers.CharField(
        min_length=4,
        max_length=20,
        validators=[UniqueValidator(queryset=Users.objects.all())]
    )
    password = serializers.CharField(min_length=8, max_length=64)
    password_confirmation = serializers.CharField(min_length=8, max_length=64)

    def validate(self, data):
        passwd = data['password']
        passwd_conf = data['password_confirmation']
        if passwd != passwd_conf:
            raise serializers.ValidationError("Las contraseñas no coinciden")
        password_validation.validate_password(passwd)
        
        return data

    def create(self, data):
        data.pop('password_confirmation')
        user = Users.objects.create_user(**data)
        return user
