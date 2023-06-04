import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { ActivatedRoute } from '@angular/router';
import { LuisterApiService } from 'src/app/services/luister-api.service';
import { LuisterCookieManagerService } from 'src/app/services/luister-cookie-manager.service';
import { environment } from 'src/environments/environments';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})

export class ListComponent implements OnInit{
  
  @ViewChild(MatSort) sort!: MatSort;
  public liked: boolean = false;
  public name!: string;
  public img: string = '/assets/images/default-custom-list.png';
  public description!: string;
  public creationdate!: string;
  public owner!: string;
  public tracks: any[] = [];

  fields: string[] = ['number', 'title', 'album', 'artists', 'includedon', 'liked', 'remove'];
  dataSource!: MatTableDataSource<any>;
  labels: { [key: string]: string } = {
    'number': '#',
    'title': 'Titulo',
    'album': 'Album',
    'artists': 'Artistas',
    'includedon': 'Incluido el',
    'liked': '',
    'remove': '',
  };

  constructor(
    private route: ActivatedRoute,
    private luister: LuisterApiService,
    private cookieService: LuisterCookieManagerService
    ){}
  ngOnInit() {
    this.route.params.subscribe((params:any)=>{
      const id = params.id;
      if(id == 'fav-list'){
        const userid = parseInt(this.cookieService.get('userid'));
        this.name = 'Canciones favoritas';
        this.img = '/assets/images/fav-list.webp';
        this.description = 'Esta es tu lista predefinida de canciones favoritas';
        this.owner = 'Lorenzo';

        this.luister.getFavTracks(userid)
        .subscribe((response:any)=>{
          if(response){
            console.log(response)
            this.tracks = response.data;
            this.dataSource = new MatTableDataSource(this.tracks);
            this.dataSource.sort = this.sort;
          }
        });
      }else{
        this.luister.getCustomList(id)
        .subscribe((response:any)=>{
          this.name = response.data.title;
          this.img = `${environment.altwebapi}images/customlist/${id}/${response.data.image}`;
          this.description = response.data.description;
          this.owner = response.data.owner;
          this.creationdate = response.data.creationdate;
        });

        this.luister.getCustomListTracks(id)
        .subscribe((response:any)=>{
          if(response){
            response.data.forEach((track:any, index:number) => {
              response.data[index].album = JSON.parse(track.album);
              response.data[index].artists = JSON.parse(track.artists);
            });
            this.tracks = response.data;
            this.dataSource = new MatTableDataSource(this.tracks);
            this.dataSource.sort = this.sort;
          }
        });
      }
    });
  }
  ngAfterContentChecked(){
    if(this.sort) this.dataSource.sort = this.sort;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  like(){
    (this.liked)?this.liked = false: this.liked = true;
  }
}
