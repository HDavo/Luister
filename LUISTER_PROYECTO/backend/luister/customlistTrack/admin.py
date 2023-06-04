
from django.contrib import admin

from customlistTrack.models import CustomlistTrack
class CustomlistTrackAdmin(admin.ModelAdmin):
    list_display = ('id', 'token', 'userid',)

admin.site.register(CustomlistTrack)

