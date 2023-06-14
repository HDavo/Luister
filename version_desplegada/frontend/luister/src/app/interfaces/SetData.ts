import { Album } from 'src/app/interfaces/Album';
import { Artist } from 'src/app/interfaces/Artist';
import { Track } from 'src/app/interfaces/Track';
import { AlbumExtended } from './AlbumExtended';
import { PopularAlbum } from './PopularAlbum';

export class SetData {
    public artists:Artist[] = [];
    public albums:Album[] = [];
    public popAlbums:PopularAlbum = new PopularAlbum() ;
    public tracks:Track[] = [];

    public relatedArtists:Artist[] = [];
    public relatedAlbums:Album[] = [];
    public relatedTracks:Track[] = [];

    public relFavArtists:string ='';
    private first:number = 0;

    constructor(){}

    setAlbums(albums:any){
        let result:Album[] = [];
        albums.forEach((element:any) => {
          result.push({
            id: `sfy:${element.id}`,
            name: element.name,
            img:element.images[this.first].url,
            release: element.release_date,
            type: element.type,
            a_type: element.album_type,
            artists: this._setArtists(element.artists),
          })
        });
        return result;
    }
    setArtists(artists:any){
        let result:Artist[] = [];
        artists.forEach((element:any) => {
          result.push({
            id: `sfy:${element.id}`,
            name: element.name,
            img: element?.images[this.first]?.url,
            genres: element.genres,
            type: element.type
          })
        });
        return result;
    }
    _setArtists(artists:any){
        let result:any[] = [];
        artists.forEach((element:any) => {
          result.push({
            id: `sfy:${element.id}`,
            name: element.name,
            genres: element.genres,
            type: element.type
          })
        });
      return result;
    }
    setTracks(tracks:any){
        let result:Track[] = [];
        tracks.forEach((element:any) => {
          result.push({
            id: `sfy:${element.id}`,
            name: element.name,
            preview_url: element.preview_url,
            type: element.type,
            artists: this._setArtists(element.artists),
            album: {
                id:  `sfy:${element.album?.id}`,
                name: element.album?.name,
                img: element.album?.images[this.first].url,
                release: element.album?.release_date
            }
          })
        });
        return result;
    }
    setAlbum(album:any){
      let result:AlbumExtended;
      result = {
        id: `sfy:${album.id}`,
        name: album.name,
        img: album.images[this.first].url,
        release: album.release_date,
        type: album.type,
        a_type: album.album_type,
        artists: this._setArtists(album.artists),
        tracks: this.setTracks(album.tracks.items)
      };
      return result;
    }
    _setAlbum(album:any){
      let result:Album;
      result = {
        id: `sfy:${album.id}`,
        name: album.name,
        img: album.images[this.first].url,
        release: album.release_date,
        type: album.type,
        a_type: album.album_type,
        artists: this._setArtists(album.artists)
      };
      return result;
    }
    setPopAlbum(popalbums:any){
      let result:PopularAlbum;
      result = {
        data: this.setAlbums(popalbums.items),
        prev: popalbums.previous,
        next: popalbums.next,
        href: popalbums.href,
        limit: popalbums.limit,
        offset: popalbums.offset
        
      };
      return result;
    }
    setArtist(artist:any){
        let result:Artist;
          result = {
            id: `sfy:${artist.id}`,
            name: artist.name,
            img: artist.images[this.first]?.url,
            genres: artist.genres,
            type: artist.type
        };
        return result;
    }
    setTrack(track:any){
        let result:Track;
          result = {
            id: `sfy:${track.id}`,
            name: track.name,
            preview_url: track.preview_url,
            type: track.type,
            artists: this._setArtists(track.artists),
            album: {
                id: `sfy:${track.album?.id}`,
                name: track.album?.name,
                img: track.album?.images[this.first].url,
                release: track.album?.release_date
            }
        };
        return result;
    }

    // setDzData setters

  setDzAlbums(albums:any){
      let result:Album[] = [];
      albums.forEach((element:any) => {
        result.push({
          id: `dzr:${element.id}`,
          name: element.title,
          img:element.cover_big,
          release: '',
          type: element.type,
          a_type: element.record_type,
          artists: [{
            id: `dzr:${element.artist.id}`,
            name: element.artist.name,
            genres: '',
            type: element.artist.type
          }],
        })
      });
    return result;
  }
  setDzArtists(artists:any){
      let result:Artist[] = [];
      artists.forEach((element:any) => {
        result.push({
          id: `dzr:${element.id}`,
          name: element.name,
          img: element.picture_big,
          genres: [],
          type: element.type
        })
      });
      return result;
  }
  setDzTracks(tracks:any){
      let result:Track[] = [];
      tracks.forEach((element:any) => {
        result.push({
          id: `dzr:${element.id}`,
          name: element.title,
          preview_url: element.preview,
          type: element.type,
          artists: [{
            id: `dzr:${element.artist.id}`,
            name: element.artist.name,
            img: element.artist.picture_big,
            type: element.artist.type
          }],
          album: {
              id: `dzr:${element.album?.id}`,
              name: element.album?.title,
              img: element.album?.cover_big,
              release: ''
          }
        })
      });
    return result;
  }
  setDzAlbum(album:any){
    let result:AlbumExtended;
    result = {
      id: `dzr:${album.id}`,
      name: album.title,
      img: album.cover_big,
      release: album.release_date,
      type: album.type,
      a_type: album.record_type,
      artists: [{
        id: `dzr:${album.artist.id}`,
        name: album.artist.name,
        genres:[],
        type: album.artist.type
      }],
      tracks: this.setDzTracks(album.tracks.data)
    };
    return result;
  }
  setDzArtist(artist:any){
      let result:Artist;
      result = {
          id: `dzr:${artist.id}`,
          name: artist.name,
          img: artist.picture_big,
          genres: artist.genres,
          type: artist.type
      };
      return result;
  }
  setDzTrack(track:any){
    let result:Track;
        result = {
          id: `dzr:${track.id}`,
          name: track.title,
          preview_url: track.preview,
          type: track.type,
          artists: [this.setDzArtist(track.artist)],
          album: {
              id: `dzr:${track.album?.id}`,
              name: track.album?.title,
              img: track.album?.cover_big,
              release: track.album?.release_date
          }
      };
      return result;
  }
}