import { Component, ElementRef, HostListener, ViewChild, Renderer2 } from '@angular/core';
import { Observable } from 'rxjs';
import { SetData } from 'src/app/interfaces/SetData';
import { ApibindingService } from 'src/app/services/apibinding.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent extends SetData{
  public executing:boolean = false;
  @ViewChild('releasescontainer') releases!:ElementRef;
  @ViewChild('asMainContainer') asMainContainer!:ElementRef;

  constructor(
    private fromSpotify:ApibindingService, 
    private renderer:Renderer2
    ){
      super();
      this.getAlbums();
      this.showAlbums();
    }

  @HostListener('window:scroll', ['$event'])
  onScroll(e:any) {
    this.showAlbums()
  }

  showAlbums(){
    let elemBottom = this.releases?.nativeElement.getBoundingClientRect().bottom,
        windowHeigth = window.innerHeight,
        pageTotalScroll = document.documentElement.scrollHeight - windowHeigth;
    if(elemBottom <= windowHeigth * 0.7 || window.scrollY >= pageTotalScroll * 0.95){
      this.getMoreAlbums();
    }
  }
  
  getAlbums(){
    return this.fromSpotify.getAlbumsRelease()
    .then((res:Observable<any>)=>{
      res.subscribe((data:any)=>{
        this.popAlbums = this.setPopAlbum(data.albums);
      });
    });
   }

  getMoreAlbums(){
    if(!this.albums){
      this.getAlbums()
      .then((res:any) =>{
        this.showMoreAlbums();
      })
    }else{
      this.showMoreAlbums();
    }
    
  }

  showMoreAlbums(){
    let url = this.popAlbums.next;
    if(url && !this.executing){
      this.executing = true;
      this.fromSpotify.getAlbumsRelease(url)
      .then((res:Observable<any>)=>{
        res.subscribe((data:any)=>{
          for(let album of data.albums.items) {
            this.popAlbums.data.push(this._setAlbum(album));
          }
          this.popAlbums.href = data.albums.href;
          this.popAlbums.next = data.albums.next;
          this.popAlbums.prev = data.albums.previous;
          this.popAlbums.limit = data.albums.limit;
          this.popAlbums.offset = data.albums.offset;

          this.executing = false;
        });
      });
    }
  }
}
