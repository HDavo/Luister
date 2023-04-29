import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ApibindingService } from 'src/app/services/apibinding.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent {
  public albums:any;

  constructor(private fromSpotify:ApibindingService){
    this.getAlbums();
  }
   getAlbums(){
    this.fromSpotify.getNewReleaseAlbums()
    .then((res:Observable<any>)=>{
      res.subscribe((data:any)=>{
        this.albums = data.albums;
      });
    });
   }

  getPage(url:string){
    this.fromSpotify.getNewReleaseAlbums(url)
    .then((res:Observable<any>)=>{
      res.subscribe((data:any)=>{
        this.albums = data.albums;
      });
    });
  }
}
