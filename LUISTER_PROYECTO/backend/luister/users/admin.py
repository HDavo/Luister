from django.contrib.auth.models import BaseUserManager
from django.contrib.auth.hashers import make_password

class UserAdmin(BaseUserManager):

    list_display = ('id', 'name', 'email',)
    list_display_links = ('id', 'name', 'email',)

    search_fields = ('email', 'name',)

    fieldsets = (
        ('Credenciales', {'fields': ('username', 'password')}),
    )

    def get_by_natural_key(self, email):
        return self.get(email=email)
    def create_user(self, email, name, password=None):
        name = name
        email = self.normalize_email(email)
        user = self.model(email=email, name=name)
        user.set_password(password)
        user.save(using=self._db)
        return user