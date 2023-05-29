import { Component, OnInit, ViewChild } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

interface Song {
  title: string;
  artist: string;
  album: string;
  added: string;
  duration: string;
}

const jsonData = {
  user: 'pepe',
  listName: 'Favoritas de Pepe',
  creationDate: '12/05/2023',
  modified: '24/05/2023',
  listImage:
    'https://s3.pixers.pics/pixers/700/FO/50/11/98/35/700_FO50119835_66be2c1df4d46c274d84ebd00d51569f.jpg',
  songs: {
    '0': {
      title: 'In the End',
      artist: 'Linkin Park',
      album: 'Hybrid Theory',
      added: '12/05/2023',
      duration: '224',
      valido: true,
    },
    '1': {
      title: 'My December',
      artist: 'Linkin Park',
      album: 'Hybrid Theory',
      added: '12/05/2023',
      duration: '442',
      valido: true,
    },
    '2': {
      title: 'Papercut',
      artist: 'Linkin Park',
      album: 'Hybrid Theory',
      added: '12/05/2023',
      duration: '555',
      valido: true,
    },
    '3': {
      title: 'Crawling',
      artist: 'Linkin Park',
      album: 'Hybrid Theory',
      added: '12/05/2023',
      duration: '300',
      valido: true,
    },
    '4': {
      title: 'With You',
      artist: 'Linkin Park',
      album: 'Hybrid Theory',
      added: '12/05/2023',
      duration: '524',
      valido: true,
    },
    '5': {
      title: 'One Step Closer',
      artist: 'Linkin Park',
      album: 'Hybrid Theory',
      added: '12/05/2023',
      duration: '284',
      valido: true,
    },
    '6': {
      title: 'Points of Authority',
      artist: 'Linkin Park',
      album: 'Hybrid Theory',
      added: '12/05/2023',
      duration: '434',
      valido: true,
    },
    '7': {
      title: 'Whispers in the Dark',
      artist: 'Skillet',
      album: 'Comatose',
      added: '12/05/2023',
      duration: '564',
      valido: true,
    },
  },
};

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})

export class ListComponent implements OnInit{
  
  @ViewChild(MatSort) sort!: MatSort;

  //variables para la cabecera
  public imgList!: string;
  public userName!: string;
  public modifyDate!: string;
  public listName!: string;

  displayedColumns: string[] = ['number', 'title', 'album', 'artist', 'date', 'duration'];
  dataSource = new MatTableDataSource(Object.values(jsonData.songs));
  element: Song = {} as Song;

  getColumnLabel(column: string): string {
    const columnLabels: { [key: string]: string } = {
      'number': '#',
      'title': 'Titulo',
      'album': 'Album',
      'artist': 'Artista',
      'date': 'Fecha',
      'duration': 'Duración'
    };
  
    return columnLabels[column];
  }
  
  
  

  ngOnInit() {

    


    this.dataSource.sort = this.sort;
    this.imgList = jsonData.listImage;
    this.listName = jsonData.listName;
    this.userName = jsonData.user;
    this.modifyDate = jsonData.modified;
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
