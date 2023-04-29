import { Component, ElementRef, HostListener, Renderer2, ViewChild, ViewChildren } from '@angular/core';
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

  constructor(private fromSpotify: ApibindingService, private renderer:Renderer2){
    this.fromSpotify.getArtists().then((data:Observable<any>)=>{
      data.subscribe((result:any)=> {
        this.artists = result.artists.items;
      });
    })
    
    this.fromSpotify.getAlbums().then((data:Observable<any>)=>{
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

  @HostListener('window:load', ['$event'])
  onLoad(event:any){
    
  }

  // Build unknown user home page
  buildHomePage():void{

  }
  // Build known user home page
  buildMyHomePage():void{

  }
}