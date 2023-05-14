import { Component } from '@angular/core';
import { DeezerService } from '../../services/deezer.service';
import { LastFmService } from 'src/app/services/last-fm.service';

@Component({
  selector: 'app-notfound',
  templateUrl: './notfound.component.html',
  styleUrls: ['./notfound.component.css']
})
export class NotfoundComponent {

  constructor(
    private deez: DeezerService,
    private bio: LastFmService
  ){}

  /* pruebaInfo(){
    const cosa = this.deez.getTrack('3135556');
    console.log(cosa);

  } */

  pruebaInfo(name: string){
    const info = this.bio.getArtistInfo(name);
    console.log(info)
  }
}
