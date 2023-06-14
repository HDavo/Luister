from django.contrib import admin


from favoritetracks.models import FavoriteTrack

class FavoriteTrackAdmin(admin.ModelAdmin):
    list_display = ('id', 'userid',)

admin.site.register(FavoriteTrack)
