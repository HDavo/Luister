import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ApibindingService } from 'src/app/services/apibinding.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent {
  public id!:string;
  public elementType!:string;
  public static audio:any;
  public playing:boolean = false;
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
    topTracks: []
  };


  constructor(private route:ActivatedRoute, private router:Router, private fromSpotify:ApibindingService){
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
            this.track.album.tracks.items = res.tracks.items.filter((track:any) => track.id !=id );
          })
        })

        res.artists.forEach((artist:any, index:number) => {
          this.fromSpotify.getArtist(artist.id)
          .then((response:Observable<any>)=>{
            response.subscribe((res:any)=>{
              this.track.artists[index]=(res);
            })
          })
        });
      })
    })
    console.log(this.track)
  }

  playSong(uri:string){
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
      alert('Previsualizacion no admitida');
    }
  }
}
