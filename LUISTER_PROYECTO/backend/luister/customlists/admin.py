from django.contrib import admin

from customlists.models import Customlists

class CustomlistAdmin(admin.ModelAdmin):
    list_display = ('id', 'token', 'userid',)

admin.site.register(Customlists)

