from django.contrib import admin

from users.models import Users

admin.site.register(Users)

"""
class UserAdmin(admin.ModelAdmin):

    list_display = ('pk', 'username', 'email',)
    list_display_links = ('pk', 'username', 'email',)

    search_fields = (
        'email',
        'name',
    )

    list_filter = (
        'is_active',
        'is_staff',
        'date_joined',
        'modified',
    )

    readonly_fields = ('date_joined', 'modified',)

"""
