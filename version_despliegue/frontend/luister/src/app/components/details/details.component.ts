import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ApibindingService } from 'src/app/services/apibinding.service';
import { LastFmService } from 'src/app/services/last-fm.service';
import { LuisterSweetAlert } from 'src/app/services/luisterSweetAlert';
import { registerLocaleData } from '@angular/common';

//necesario para poder mostrar el formato de números de forma que se ajuste al formato usado en España
import localeEs from '@angular/common/locales/es';
import { LuisterCookieManagerService } from 'src/app/services/luister-cookie-manager.service';
import { LuisterApiService } from 'src/app/services/luister-api.service';
import { SetData } from 'src/app/interfaces/SetData';
import { DeezerService } from 'src/app/services/deezer.service';

registerLocaleData(localeEs, 'es');

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})

export class DetailsComponent extends SetData implements OnInit{
  public id!:string;
  public likedFollowed: boolean = false;
  public platform!:string;
  public elementType!:string;
  public static audio:any;
  public playing:boolean = false;
  public track:any = {
    data: {},
    artists: [],
    album: {}
  };
  public album:any= {
    data: {},
    artists: []
  };
  public artist:any= {
    data: {},
    topTracks: [],
    bio: ''
  };

  constructor(
    private route:ActivatedRoute,
    private router:Router,
    private fromSpotify:ApibindingService,
    private fromDeezer: DeezerService,
    private lastFm: LastFmService,
    private luister: LuisterApiService,
    private cookieService: LuisterCookieManagerService
  ){
    super();
    this.route.params.subscribe((res:any)=>{
      const lkey = res.id.split(':');
      this.platform = lkey.shift();
      this.id = lkey;
      this.elementType = res.element;

      switch (this.elementType) {
        case 'album':
          this.getThatAlbum(this.id);
          break;
        case 'artist':
          this.getThatArtist(this.id);
          break;
        case 'track':
            this.getThatTrack(this.id);
            break;
        default:
          this.router.navigate(['/','not-found']);
          break;
      }
    })
  }
  ngOnInit(): void {
    console.log(this.album)
  }
  getThatAlbum(id:string){
    const platform:any = {
      sfy: ()=>{
        this.fromSpotify.getAlbum(id)
        .then((response:Observable<any>)=>{
          response.subscribe((res:any)=>{
            this.album.data = this.setAlbum(res);

            res.artists.forEach((artist:any, index:number) => {
              this.fromSpotify.getArtist(artist.id)
              .then((response:Observable<any>)=>{
                response.subscribe((res:any)=>{
                  this.album.artists[index]=this.setArtist(res);
                })
              })
            });
          },
          (error:any)=>{
            if(error.status == 400 || error.status == 404){
              this.router.navigate(['/','not-found']);
            }
          })
        })
      },
      dzr: ()=>{
        this.fromDeezer.getElement(id, this.elementType)
        .subscribe((res:any)=>{
          this.album.data = this.setDzAlbum(res);

          this.fromDeezer.getElement(res.artist.id, res.artist.type)
          .subscribe((res:any)=>{
            this.album.artists = [this.setDzArtist(res)];
          })
        },
        (error:any)=>{
          if(error.status == 400 || error.status == 404){
            this.router.navigate(['/','not-found']);
          }
        });
      }
    }
    platform[this.platform]();
  }
  getThatArtist(id:string){
    const platform: any = {
      sfy: ()=>{
        this.fromSpotify.getArtist(id)
        .then((response:Observable<any>)=>{
          response.subscribe((res:any)=>{
            this.artist.data = this.setArtist(res);
            this.getLikedFollowed();

            this.fromSpotify.getArtistTopTracks(id)
            .then((response:Observable<any>)=>{
              response.subscribe((res:any)=>{
                const dta = res.tracks.filter((element:any) => element != null);
                this.artist.topTracks = this.setTracks(dta);
              })
            })
            this.lastFm.getArtistInfo(this.artist.data.name)
            .subscribe((res:any) => {
                this.artist.bio = `${res.artist.bio.summary.split('<a href').shift()}`; 
            })
          },
          (error:any)=>{
            if(error.status == 400 || error.status == 404){
              this.router.navigate(['/','not-found']);
            }
          })
        })
      },
      dzr: ()=>{
        this.fromDeezer.getElement(id, this.elementType)
        .subscribe((res:any)=>{
          this.artist.data = this.setDzArtist(res);

          this.fromDeezer.getArtistTopTracks(id)
          .subscribe((response:any)=>{
            this.artist.topTracks = this.setDzTracks(response.data);
          })

          this.lastFm.getArtistInfo(this.artist.data.name)
          .subscribe((res:any) => {
            this.artist.bio = `${res.artist.bio.summary.split('<a href').shift()}`; 
          })
        },
        (error:any)=>{
          if(error.status == 400 || error.status == 404){
            this.router.navigate(['/','not-found']);
          }
        });
      }
    }
    platform[this.platform]();
  }
  getThatTrack(id:string){
    const platform:any = {
      sfy: ()=>{
        this.fromSpotify.getTrack(id)
        .then((response:Observable<any>)=>{
          response.subscribe((res:any)=>{
            this.track.data = this.setTrack(res);
            this.getLikedFollowed();
    
            this.fromSpotify.getAlbum(res.album.id)
            .then((response:Observable<any>)=>{
              response.subscribe((res:any)=> {
                this.track.album = this.setAlbum(res)
              });
            })
    
            res.artists.forEach((artist:any, index:number) => {
              this.track.artists=[];
              this.fromSpotify.getArtist(artist.id)
              .then((response:Observable<any>)=>{
                response.subscribe((res:any)=> this.track.artists[index]=this.setArtist(res))
              })
            })
    
          })
        })
      },

      dzr: ()=>{
                this.fromDeezer.getElement(id, this.elementType)
                .subscribe((response:any)=>{
                  this.track.data = this.setDzTrack(response);

                  this.fromDeezer.getElement(response.album.id, response.album.type)
                  .subscribe((response:any)=>{
                    this.track.album = this.setDzAlbum(response)
                  })
                  this.track.artists = [this.setDzArtist(response.artist)]
                },
                (error:any)=>{
                  if(error.status == 400 || error.status == 404){
                    this.router.navigate(['/','not-found']);
                  }
                });
      }
    }
    platform[this.platform]();
  }
  playSong(uri: string){
    if(uri){
      if(DetailsComponent.audio){
        DetailsComponent.audio.src = '';
  
        DetailsComponent.audio = new Audio(uri);
        DetailsComponent.audio.volume = 0.5;
        DetailsComponent.audio.play();
      }else{
        DetailsComponent.audio = new Audio(uri);
        DetailsComponent.audio.volume = 0.5;
        DetailsComponent.audio.play();
      }
    }else{
      LuisterSweetAlert.info('Previsualizacion no admitida');
    }
  }
  like(event: any){
    const userid = this.cookieService.get('userid');
    let art: any[] = [];
    
    this.track.artists.forEach((track:any, i:number)=>{
      art[i] = {"title": track.name, "lookupkey": track.id};
    })

    const trackElement = {
      title: this.track.data.name,
      lookupkey: this.track.data.id,
      album: {
        "title": this.track.album.name,
        "lookupkey": this.track.album.id
      },
      artists: JSON.stringify(art),
      userid: userid
    }

    this.luister.addFavTracks(trackElement)
    .subscribe((response:any)=>{
      if(response.status == 200){
        alert('Añadido a favoritos')
        this.likedFollowed = true;
      }else alert(response.message)
    })
  }
  dislike(event: any){
    const userid = this.cookieService.get('userid');
    let title, lookupkey;
    event.target.getAttribute('title').split('-').
    forEach((e:string, i:number)=>{
    (i == 0)? lookupkey = e : title = e;
    })
    this.luister.removeFavTracks({
      userid: userid, lookupkey: lookupkey, title: title
    }).subscribe((response:any)=>{
      if(response.status == 200){
        alert('Eliminado de favoritos')
        this.likedFollowed = false;
      }else console.log(response.message)
    })
  }
  getLikedFollowed(){
    let data: any = {}
    if(this.elementType == 'artist'){
      data = {
        name: this.artist.data.name,
        userid: this.cookieService.get('userid'),
        type: this.elementType
      }
    }else if(this.elementType == 'track'){
      data = {
        name: this.track.data.name,
        lookupkey: this.track.data.id,
        userid: this.cookieService.get('userid'),
        type: this.elementType
      }
    }

    this.luister.getFollowedLiked(data)
    .subscribe((response: any)=>{
      this.likedFollowed = response.message;
    })

  }
  followUnfollow(){
    let artist: any = {
      userid: this.cookieService.get('userid'),
      name: this.artist.data.name,
      image: this.artist.data.img,
      lookupkey: this.artist.data.id
    }

    if(artist.userid){
      this.luister.followUnfollow(artist)
      .subscribe((response:any)=> {
        if(response.status == 200){
          alert(response.message);
          (this.likedFollowed)?this.likedFollowed = false: this.likedFollowed = true;
        }
      });
    }else{
      alert('Debe iniciar sesion para poder realizar esta accion')
    }
  }
}
