from django.contrib.auth.models import Group  
from django.contrib import admin
from users.models import User

admin.site.unregister(Group) 

@admin.register(User)
class UserAdmin(admin.ModelAdmin):

    list_display = ('id', 'name', 'email','creationdate',)
    list_display_links = ('id', 'name', 'email',)

    search_fields = (
        'email',
        'name',

    )

    list_filter = (
        'is_superuser',
        'creationdate',
        'is_active'
    )

    fieldsets = (
        ('Credentials', {'fields': ('name', 'password','is_superuser', 'email','username','is_active')}),
    )

    readonly_fields = ('creationdate', )