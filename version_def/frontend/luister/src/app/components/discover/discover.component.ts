import { Component, HostListener } from '@angular/core';
import { Observable } from 'rxjs';
import { ApibindingService } from 'src/app/services/apibinding.service';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.component.html',
  styleUrls: ['./discover.component.css']
})
export class DiscoverComponent {
  public searchLabel!:string;
  public searchResults:any;

  constructor(private fromSpotify:ApibindingService){ }

  searchForData(data:string){
    this.fromSpotify.searchForData(data.trim())
    .then((resolution:Observable<any>)=> {
      resolution.subscribe((data:any)=> {
        this.searchResults = data;
      });
    });
  }

  @HostListener('window:keyup', ['$event'])
  handleKeyUp(event:any){
    if(event.code.includes('Key')){
      if (this.searchLabel) this.searchForData(this.searchLabel);
    }else {
      if(event.code == 'Backspace'){
        if(this.searchLabel != undefined){
          if(this.searchLabel.trim()) this.searchForData(this.searchLabel);
          else this.searchResults = null;
        }else this.searchResults = null;
      }
    }
  }

  @HostListener('click', ['$event.target'])
  onClick(element:any){
    if(element.className == 'search-field-shadow') this.cleanSearchLabel();
  }

  cleanSearchLabel(){
    this.searchLabel = '';
    this.searchResults = null;
  }
}
