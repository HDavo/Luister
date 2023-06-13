import { Component, ElementRef, HostListener, QueryList, Renderer2, ViewChild, ViewChildren } from '@angular/core';
import { ApibindingService } from '../../services/apibinding.service'
import { Observable } from 'rxjs';
import { SetData } from 'src/app/interfaces/SetData';

@Component({
  selector: 'app-popular',
  templateUrl: './popular.component.html',
  styleUrls: ['./popular.component.css']
})
export class PopularComponent extends SetData{

  public topTracks:any;
  @ViewChildren('track') track!:QueryList<any>;
  @ViewChild('asMainContainer') asMainContainer!:ElementRef;

  constructor(
    private fromSpotify:ApibindingService, 
    private renderer:Renderer2
    ){
      super();
      this.getTopList();
    }

  getTopList(){
    this.fromSpotify.getTopListPlayList()
    .then((response:Observable<any>) => {
      response.subscribe((result:any)=>{
        this.topTracks = [];
        const dta = result.tracks.items;
        dta.forEach((track:any) => {
          this.topTracks.push(this.setTrack(track.track));
        });
      })
    })
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event:any){
    this.showHomePageElements();
  }

  ngAfterContentChecked(){
    this.showHomePageElements();
  }

  showHomePageElements():void{
    let elementTop, elementHeight,
        windowHeigth = window.innerHeight,
        pageTotalScroll = document.documentElement.scrollHeight - windowHeigth;
    this.track?.forEach(element =>{
      elementTop = element.nativeElement.offsetTop;
      elementHeight = element.nativeElement.offsetHeight;
      if(elementTop <= (window.scrollY + windowHeigth * 0.8) || window.scrollY >= pageTotalScroll){
        this.renderer.removeClass(element.nativeElement, 'track-hide');
        this.renderer.addClass(element.nativeElement, 'track-show');
      }else{
        this.renderer.removeClass(element.nativeElement, 'track-show');
        this.renderer.addClass(element.nativeElement, 'track-hide');
      }
    });
  }

}
