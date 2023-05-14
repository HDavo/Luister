import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ApibindingService } from 'src/app/services/apibinding.service';
import { LastFmService } from 'src/app/services/last-fm.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent {
  public id!:string;
  public elementType!:string;
  public track:any = {
    data: [],
    artists: [],
    album: []
  };
  public album:any= {
    data: [],
    artists: []
  };
  public artist:any= {
    data: [],
    albums: [],
    topTracks: [],
    bio: []
  };


  constructor(
    private route:ActivatedRoute,
    private router:Router,
    private fromSpotify:ApibindingService,
    private lastFm: LastFmService
  ){
    this.route.params.subscribe((res:any)=>{
      this.id = res.id;
      this.elementType = res.element;

      switch (this.elementType) {
        case 'album':
          this.getAlbum(this.id);
          break;
        case 'artist':
          this.getArtist(this.id);
          break;
        case 'track':
            this.getTrack(this.id);
            break;
        default:
          this.router.navigate(['/not-found']);
          break;
      }
    })
  }

  getAlbum(id:string){
    this.fromSpotify.getAlbum(id)
    .then((response:Observable<any>)=>{
      response.subscribe((res:any)=>{
        console.log(res);
        this.album.data = res;

        res.artists.forEach((artist:any, index:number) => {
          this.fromSpotify.getArtist(artist.id)
          .then((response:Observable<any>)=>{
            response.subscribe((res:any)=>{
              this.album.artists[index]=(res);
            })
          })
        });

      },
      (error:any)=>{
        if(error.status == 400 || error.status == 404){
          this.router.navigate(['/not-found']);
        }
      })
    })
  }

  getArtist(id:string){
    this.fromSpotify.getArtist(id)
    .then((response:Observable<any>)=>{
      response.subscribe((res:any)=>{
        this.artist.data = res;

        this.fromSpotify.getArtistTopTracks(id)
        .then((response:Observable<any>)=>{
          response.subscribe((res:any)=>{
            this.artist.topTracks = res.tracks.filter((element:any) => element != null);
          })
        })

       this.lastFm.getArtistInfo(this.artist.data.name)
        .subscribe(
          (res:any) => {
            
            this.artist.bio = res.artist.bio.summary; 
            console.log(this.artist.bio);
          }
        )
      },
      (error:any)=>{
        if(error.status == 400 || error.status == 404){
          this.router.navigate(['/not-found']);
        }
      })
    })
  }

  getTrack(id:string){
    this.fromSpotify.getTrack(id)
    .then((response:Observable<any>)=>{
      response.subscribe((res:any)=>{
        this.track.data = res;

        this.fromSpotify.getAlbum(res.album.id)
        .then((response:Observable<any>)=>{
          response.subscribe((res:any)=>{
            this.track.album = res;
          })
        })

        res.artists.forEach((artist:any, index:number) => {
          this.fromSpotify.getArtist(artist.id)
          .then((response:Observable<any>)=>{
            response.subscribe((res:any)=>{
              this.track.artists[index]=(res);
              console.log(this.track)
            })
          })
        });
      })
    })
  }
}
