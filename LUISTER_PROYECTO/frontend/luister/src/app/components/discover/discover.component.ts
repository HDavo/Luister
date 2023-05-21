import { Component, HostListener } from '@angular/core';
import { Observable } from 'rxjs';
import { Album } from 'src/app/interfaces/Album';
import { Artist } from 'src/app/interfaces/Artist';
import { Track } from 'src/app/interfaces/Track';
import { MainResult } from 'src/app/interfaces/mainresult';
import { ApibindingService } from 'src/app/services/apibinding.service';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.component.html',
  styleUrls: ['./discover.component.css']
})
export class DiscoverComponent {
  public searchLabel!:string;
  public searchFullResults:any;
  public mainResult:MainResult = new MainResult();
  public artists:Artist[] = [];
  public albums:Album[] = [];
  public tracks:Track[] = [];
  public captions:any = {
    track: 'Canción',
    album: 'Álbum',
    artist: 'Artista'
  }

  constructor(private fromSpotify:ApibindingService){ }

  searchForData(data:string){
    this.fromSpotify.searchForData(data.trim())
    .then((resolution:Observable<any>)=> {
      resolution.subscribe((data:any)=> {
        console.log(data)
        this.searchFullResults = data;
        this.artists = this.setArtist(data.artists.items);
        this.albums = this.setAlbum(data.albums.items);
        this.tracks = this.setTracks(data.tracks.items);
        this.mainResult = this.getPopular(data.tracks.items, data.artists.items);
      });
    });
  }
  getPopular(track:any, artist:any){
    const first = 0;
    if(track[first].popularity > artist[first].popularity){
      if(artist[first].name.toLowerCase() != this.searchLabel.toLowerCase()){
        return {
          id: track[first].id,
          name: track[first].name,
          type: track[first].type,
          img: track[first].album?.images[first].url,
          extra: track[first].artists[first].name
        };
      }
    }
    return {
      id: artist[first].id,
      name: artist[first].name,
      type: artist[first].type,
      img: artist[first].images[first].url,
      extra: ''
    };
  }
  setAlbum(albums:any){
    let result:Album[] = [];
    const first = 0;
    albums.forEach((element:any) => {
      result.push({
        id: element.id,
        name: element.name,
        img:element.images[first].url,
        release: element.release_date,
        type: element.type,
        a_type: element.album_type,
        artists:  element.artists,
      })
    });
    return result;
  }
  setArtist(artists:any){
    let result:Artist[] = [];
    const first = 0;
    artists.forEach((element:any) => {
      result.push({
        id: element.id,
        name: element.name,
        img: element.images[first]?.url,
        genres: element.genres,
        type: element.type
      })
    });
    return result;
  }
  setTracks(tracks:any){
    let result:Track[] = [];
    const first = 0;
    tracks.forEach((element:any) => {
      result.push({
        id: element.id,
        name: element.name,
        preview_url: element.preview_url,
        type: element.type,
        artists: element.artists,
        album: {
            id: element.album.id,
            name: element.album.name,
            img: element.album.images[first].url,
            release: element.album.release_date
        }
      })
    });
    return result;
  }

  @HostListener('window:keyup', ['$event'])
  handleKeyUp(event:any){
    if(event.code.includes('Key')){
      if(this.searchLabel) this.searchForData(this.searchLabel);
    }else {
      if(event.code == 'Backspace'){
        if(this.searchLabel != undefined){
          if(this.searchLabel.trim()) this.searchForData(this.searchLabel);
          else this.searchFullResults = null;
        }else this.searchFullResults = null;
      }
    }
  }

  @HostListener('click', ['$event.target'])
  onClick(element:any){
    if(element.className == 'search-field-shadow') this.cleanSearchLabel();
  }
  cleanSearchLabel(){
    this.searchLabel = '';
    this.searchFullResults = null;
  }
}
