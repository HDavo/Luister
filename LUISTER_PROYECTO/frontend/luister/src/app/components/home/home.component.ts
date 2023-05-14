import { Component, ElementRef, HostListener, QueryList, Renderer2, ViewChild, ViewChildren } from '@angular/core';
import { ApibindingService } from '../../services/apibinding.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  
  public welcomText:string = 'Bienvenido a Luister';
  public artists:any;
  public albums:any;
  public categories:any;
  @ViewChild('asHomePage') homeContainer!:ElementRef;
  @ViewChildren('pagesectionelement') psecElement!:QueryList<any>;

  constructor(private fromSpotify: ApibindingService, private renderer:Renderer2){
    this.renderHomePage();
  }

  renderHomePage(){
    this.fromSpotify.getRandomElements('artist').then((data:Observable<any>)=>{
      data.subscribe((result:any)=> {
        this.artists = result.artists.items;
      });
    })
    
    this.fromSpotify.getRandomElements('album').then((data:Observable<any>)=>{
      data.subscribe((result:any)=> {
        this.albums = result.albums.items;
      });
    })

    this.fromSpotify.getCategories().then((data:Observable<any>)=>{
      data.subscribe((result:any)=> {
        this.categories = result.categories.items;
      });
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
    let elementTop;
    console.log;
    this.psecElement?.forEach(element =>{
      elementTop = element.nativeElement.getBoundingClientRect().top;
      if(elementTop <= window.innerHeight * 0.85){
        this.renderer.removeClass(element.nativeElement, 'hidden');
        this.renderer.addClass(element.nativeElement, 'show');
      }else{
        this.renderer.removeClass(element.nativeElement, 'show');
        this.renderer.addClass(element.nativeElement, 'hidden');
      }
    });
  }
}