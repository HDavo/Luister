export class Track {
    id!: string;
    name!: string;
    preview_url!: string;
    type!: string;
    artists:any[] = [];
    album:any = {
        id: '',
        name: '',
        img: '',
        release: ''
    };
}