from django.contrib import admin

from followedartists.models import FollowedArtist

class FollowedArtistAdmin(admin.ModelAdmin):
    list_display = ('id', 'userid',)
    
admin.site.register(FollowedArtist)

