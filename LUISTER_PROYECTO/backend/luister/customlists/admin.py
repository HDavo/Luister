from django.contrib import admin

from customlists.models import Customlist

class CustomlistAdmin(admin.ModelAdmin):
    list_display = ('id', 'token', 'userid',)

admin.site.register(Customlist)

