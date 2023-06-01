import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FavTrack } from 'src/app/interfaces/Favtrack';
import { ContexMenu } from 'src/app/services/contextMenu';
import { LuisterApiService } from 'src/app/services/luister-api.service';
import { LuisterCookieManagerService } from 'src/app/services/luister-cookie-manager.service';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css']
})
export class LibraryComponent implements OnInit {
  public imgroot:string = 'http://localhost:8000';
  public customLists:any[] = [];
  public newListImagePreview: string | null = null;
  public customListForm:FormGroup = this.formBuilder.group({
    title: ['', Validators.required],
    description: [''],
    image: [null],
    imageFile: [null]
  });
  public favtracks:FavTrack[] = [];

  constructor(
    private renderer:Renderer2,
    private cookieService: LuisterCookieManagerService,
    private luister:LuisterApiService,
    private formBuilder: FormBuilder,
    private contextMen:ContexMenu
    ){
      this.getLists();
      this.getFavTracks();
    }

  ngOnInit() {
    this.luister.deletedList
    .subscribe((res:any)=>{
      this.customLists = this.customLists.filter((list:any) => list.id != res);
    });
  }

  ngOnDestroy(){
    this.contextMen.getUserLists();
  }

  @ViewChild('newCustomListForm') newCustomListForm!:ElementRef;
  @ViewChild('asMainContainer') asMainContainer!:ElementRef;
  printCustomListForm(){
    this.renderer.setStyle(this.newCustomListForm.nativeElement, 'display', 'flex');
  }
  closeForm(){
    this.renderer.setStyle(this.newCustomListForm.nativeElement, 'display', 'none');
    this.resetForm();
  }
  resetForm(){
    this.customListForm.reset();
    this.newListImagePreview = null;
  }
  getImage(event:any){
    const FE = 0,
    file = event.target.files[FE];
    if(file){
      this.encodeFileAsBase64URL(file)
      .then((result:any) => {
        this.newListImagePreview = result;
        this.customListForm.patchValue({
          imageFile: file
        })
      })
    }
  }
  submitNewCusstomList(){
    const clform = this.customListForm;
    if(clform.valid){
      let data = new FormData();
      data.append('title', clform.value.title);
      data.append('description', clform.value.description);
      data.append('image', clform.value.image);
      data.append('imageFile', clform.value.imageFile);
      data.append('userid', this.cookieService.get('userid'));
      
      this.luister.addCustomList(data)
      .subscribe((response:any)=>{
        if(response.status == 200){
          this.getLists();
        }else alert(response.message);
      });
      this.closeForm();
    }else alert('Ciertos campos contienen valores incorrectos!');
  }
  encodeFileAsBase64URL(file:any) {
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.addEventListener('loadend', () => resolve(reader.result) );
    });
  }
  getLists(){
    const userid = parseInt(this.cookieService.get('userid'));
    this.luister.getUserCustomList(userid)
    .subscribe((response:any) => {
      if(response.status == 200){
        this.customLists = response.data;
      }else console.log(response.message);
    })
  }
  getFavTracks(){
    const userid = parseInt(this.cookieService.get('userid'));
    this.luister.getFavTracks(userid)
    .subscribe((response:any) => {
      this.favtracks = [];
      if(response.status == 200){
        this.favtracks = response.data;
      }else console.log(response.message);
    })
  }

}
