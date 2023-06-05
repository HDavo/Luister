from django.contrib import admin
from django.contrib.auth.models import BaseUserManager
from users.models import Users

admin.site.register(Users)

class UserAdmin(admin.ModelAdmin):

    list_display = ('id', 'name', 'email',)
    list_display_links = ('id', 'name', 'email',)

    search_fields = ('email', 'name',)

    def get_by_natural_key(self, name):
        return self.get(name=name)

    # list_filter = (
    #     'is_active',
    #     'is_staff',
    #     'date_joined',
    #     'modified',
    # )

    #readonly_fields = ('date_joined', 'modified',)
