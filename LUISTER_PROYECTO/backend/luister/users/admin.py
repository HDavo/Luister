#from django.contrib import admin
from django.contrib.auth.models import BaseUserManager
from django.contrib.auth import get_user_model
#from users.models import Users

#admin.site.register(Users)

class UserAdmin(BaseUserManager):

    list_display = ('id', 'name', 'email',)
    list_display_links = ('id', 'name', 'email',)

    search_fields = ('email', 'name',)

    fieldsets = (
        ('Credenciales', {'fields': ('username', 'password')}),
    )

    def get_by_natural_key(self, name):
        user = get_user_model()
        return self.get(**{user.name: name})
