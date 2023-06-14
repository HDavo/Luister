import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-more-info',
  templateUrl: './more-info.component.html',
  styleUrls: ['./more-info.component.css']
})

export class MoreInfoComponent {

    page !:string;

    constructor(route:ActivatedRoute){
      route.params.subscribe((res:any) =>{
        this.page = res.section;
      })
    }
}
