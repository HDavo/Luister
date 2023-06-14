import { Album } from "./Album";
export class PopularAlbum{
    data: Album[] = [];
    prev:string = '';
    next:string = '';
    href:string = '';
    limit:number = 0;
    offset:number = 0;
}