import { Component, ElementRef, HostListener, ViewChild, Renderer2 } from '@angular/core';
import { Observable } from 'rxjs';
import { ApibindingService } from 'src/app/services/apibinding.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent {
  public albums:any;
  public executing:boolean = false;
  @ViewChild('releasescontainer') releases!:ElementRef;
  @ViewChild('asMainContainer') asMainContainer!:ElementRef;

  constructor(private fromSpotify:ApibindingService, private renderer:Renderer2){
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
        pageTotalScroll = document.documentElement.offsetHeight - windowHeigth;
    if(elemBottom <= windowHeigth * 0.7 || window.scrollY >= pageTotalScroll){
      this.getMoreAlbums();
    }
  }
  
  getAlbums(){
    return this.fromSpotify.getAlbumsRelease()
    .then((res:Observable<any>)=>{
      res.subscribe((data:any)=>{
        this.albums = data.albums;
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
    let url = this.albums?.next;
    if(url && !this.executing){
      this.executing = true;
      this.fromSpotify.getAlbumsRelease(url)
      .then((res:Observable<any>)=>{
        res.subscribe((data:any)=>{
          for(let album of data.albums.items) {
            this.albums.items.push(album);
          }
          this.albums.href = data.albums.href;
          this.albums.next = data.albums.next;
          this.albums.previous = data.albums.previous;
          this.albums.limit = data.albums.limit;
          this.albums.offset = data.albums.offset;

          this.executing = false;
        });
      });
    }
  }
}
