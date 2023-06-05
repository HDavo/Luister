from django.contrib import admin


from favoritetracks.models import FavoriteTracks

class FavoriteTrackAdmin(admin.ModelAdmin):
    list_display = ('id', 'token', 'userid',)

admin.site.register(FavoriteTracks)
