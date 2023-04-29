import { Component } from '@angular/core';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css']
})
export class LibraryComponent {

  public customUserList:any = [
    {
      name: 'Trekking',
      totalTracks: 10,
      owner: 'Luke SkyWalker',
      type: 'Custom List',
      img: 'https://media.istockphoto.com/id/1369171053/es/foto/grupo-de-deportistas-camina-por-monta%C3%B1as-al-atardecer-con-mochilas.jpg?s=612x612&w=0&k=20&c=UpuYyh2nNmi-gaJPGnoh2AGDe0-rAMEk1TMFVOepcBo='
    },
    {
      name: 'Mientras cocino',
      totalTracks: 5,
      owner: 'Luke SkyWalker',
      type: 'Custom List',
      img: 'https://s2.ppllstatics.com/elcorreo/www/multimedia/201901/10/media/cortadas/aplicaciones-aprender-cocinar-2019-U601036856160UwB-U70203477799ehH-624x385@El%20Correo-ElCorreo.jpg'
    },
    {
      name: 'Wprk Out',
      totalTracks: 22,
      owner: 'Luke SkyWalker',
      type: 'Custom List',
      img: 'https://images.everydayhealth.com/images/everything-you-need-know-about-fitness-1440x810.jpg'
    }
  ];

}
