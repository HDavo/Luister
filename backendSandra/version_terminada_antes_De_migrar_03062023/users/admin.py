"""User admin classes."""

from django.contrib import admin

from users.models import User


"""
@admin.register(Sessions)
class SessionsAdmin(admin.ModelAdmin):
    list_display = ('id', 'token', 'userid',)
"""

@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    """User admin."""

    list_display = ('pk', 'username', 'email',)
    list_display_links = ('pk', 'username', 'email',)

    search_fields = (
        'email',
        'username',
        'first_name',
        'last_name',
    )

    list_filter = (
        'is_active',
        'is_staff',
        'date_joined',
        'modified',
    )

    readonly_fields = ('date_joined', 'modified',)