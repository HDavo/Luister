from django.contrib.auth.models import BaseUserManager
from django.contrib.auth import get_user_model

class UserAdmin(BaseUserManager):

    list_display = ('id', 'name', 'email',)
    list_display_links = ('id', 'name', 'email',)

    search_fields = ('email', 'name',)

    fieldsets = (
        ('Credenciales', {'fields': ('username', 'password')}),
    )

    def get_by_natural_key(self, email):
        return self.get(email=email)
