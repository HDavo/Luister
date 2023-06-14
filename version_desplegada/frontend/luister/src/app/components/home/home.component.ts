import { Component, ElementRef, HostListener, OnInit, QueryList, Renderer2, ViewChild, ViewChildren } from '@angular/core';
import { ApibindingService } from '../../services/apibinding.service';
import { Observable } from 'rxjs';
import { LuisterCookieManagerService } from 'src/app/services/luister-cookie-manager.service';
import { SetData } from 'src/app/interfaces/SetData';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent extends SetData implements OnInit{
  public slice:number = 6;
  public welcomText:string = 'Bienvenido a Luister';
  public categories:any;
  public usersession:any;
  public defaultsettings: boolean = true;
  @ViewChild('asHomePage') homeContainer!:ElementRef;
  @ViewChildren('pagesectionelement') psecElement!:QueryList<any>;

  constructor(
    private fromSpotify: ApibindingService,
    private renderer: Renderer2,
    private cookieService: LuisterCookieManagerService
    ){
      super();
      this.usersession = this.cookieService.get('username');
    }
  @HostListener('window:resize',['$target'])
  setSlice(){
    const slice = Math.round(window.innerWidth / 177)
    this.slice = (slice > 6)?6:slice;
  }
  ngOnInit(): void {
    this.renderHomePage();
    this.setSlice();
    this.defaultsettings = this.cookieService.check('defaultsettings')
  }

  renderHomePage(){
    this.fromSpotify.getRandomElements('artist').then((data:Observable<any>)=>{
      data.subscribe((result:any)=> {
        this.artists = this.setArtists(result.artists.items);
      });
    })
    
    this.fromSpotify.getRandomElements('album').then((data:Observable<any>)=>{
      data.subscribe((result:any)=> {
        this.albums = this.setAlbums(result.albums.items);
      });
    })

    this.fromSpotify.getCategories().then((data:Observable<any>)=>{
      data.subscribe((result:any)=> {
        this.categories = result.categories.items;
      });
    })

    this.fromSpotify.getRecomArtists('64tJ2EAv1R6UaZqc4iOCyj,2YZyLoL8N0Wb9xBt1NhZWg').then((data:Observable<any>)=>{
      data.subscribe((result:any)=> {
        this.relatedTracks = this.setTracks(result.tracks);
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