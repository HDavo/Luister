import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { SetData } from 'src/app/interfaces/SetData';
import { MainResult } from 'src/app/interfaces/mainresult';
import { ApibindingService } from 'src/app/services/apibinding.service';
import { DeezerService } from 'src/app/services/deezer.service';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.component.html',
  styleUrls: ['./discover.component.css']
})
export class DiscoverComponent extends SetData{
  public searchLabel!:string;
  public platform:string = 'sfy';
  public elements:string = 'all';
  public searchFullResults:any;
  public mainResult:MainResult = new MainResult();
  public captions:any = {
    track: 'Canción',
    album: 'Álbum',
    artist: 'Artista'
  }
  @ViewChild('asArtistsCarrusel') asArtistsCarrusel!: ElementRef;
  private tapescrollX:number = 0;

  constructor(
    private fromSpotify: ApibindingService,
    private fromDeezer: DeezerService
    ){
    super();
  }
  getData(event:any){
    const data = this.searchLabel;
      if(data) this.searchForData(this.searchLabel);
  }
  searchForData(data:string){
    const platform:any = {
      sfy: ()=> {
        this.fromSpotify.searchForData(data.trim())
        .then((resolution:Observable<any>)=> {
          resolution.subscribe((data:any)=> {
            if(data){
              this.searchFullResults = data;
              this.artists = this.setArtists(data.artists.items);
              this.albums = this.setAlbums(data.albums.items);
              this.tracks = this.setTracks(data.tracks.items);
              if(data.artists.items.length > 0){
                this.mainResult = this.getPopular(data.tracks.items, data.artists.items);
              }
            }
          });
        });
      },
      dzr: ()=> {
        const first:number = 0;
        this.fromDeezer.searchForData(data)
        .then((response:any)=>{
          if(response){
            this.searchFullResults = response;
            if(response.artists.data){
              this.artists = this.setDzArtists(response.artists.data);
            }
            if(response.artists.data){
              this.albums = this.setDzAlbums(response.albums.data);
            }
            if(response.tracks.data){
              this.tracks = this.setDzTracks(response.tracks.data);
              if(this.tracks.length > first){
                this.mainResult = {
                  id: this.tracks[first].id,
                  name: this.tracks[first].name,
                  type: this.tracks[first].type,
                  img: this.tracks[first].album.img,
                  extra: ''
                }
              }
            }
          }
        });
      }
    }

    platform[this.platform]();

  }
  getPopular(track:any, artist:any){
    const first:number = 0;
      if(track[first].popularity > artist[first].popularity){
        if(artist[first].name.toLowerCase() != this.searchLabel.toLowerCase()){
          return {
            id: `sfy:${track[first].id}`,
            name: track[first].name,
            type: track[first].type,
            img: track[first].album?.images[first].url,
            extra: track[first].artists[first].name
          };
        }
      }
      return {
        id: `sfy:${artist[first].id}`,
        name: artist[first].name,
        type: artist[first].type,
        img: artist[first].images[first].url,
        extra: ''
      };
  }
  @HostListener('click', ['$event.target'])
  onClick(element:any){
    if(element.className == 'search-field-shadow') this.cleanSearchLabel();
  }
  cleanSearchLabel(){
    this.searchLabel = '';
    this.searchFullResults = null;
  }
  setTapeScroolX(scroll:number){
    this.asArtistsCarrusel.nativeElement.scrollTo({left: scroll, behavior: 'smooth'});
  }
  scrollToRight(){
    this.tapescrollX += this.asArtistsCarrusel.nativeElement.clientWidth;
    this.setTapeScroolX(this.tapescrollX);
  }
}
