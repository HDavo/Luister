export class ListToSort {
    album: string = '';
    artists: string = '';
    customlistid: number = 0;
    id: number = 0;
    includedon: string = '';
    lookupkey: string = '';
    title: string = '';

    constructor({
        album = {
            title:'',
            lookupkey : ''
        },
        artists = [{
            name:'',
            lookupkey : ''
        }],
        customlistid = 0,
        id = 0,
        includedon = '',
        lookupkey = '',
        title = ''
      }){
        this.album = album.title;
        artists.forEach((artist:any, i:number)=>{
          this.artists += ((i !=0 )?', '+artist.name:artist.name);
        })
        this.customlistid = customlistid;
        this.id = id;
        this.includedon = includedon;
        this.lookupkey = lookupkey;
        this.title = title;
      }
}