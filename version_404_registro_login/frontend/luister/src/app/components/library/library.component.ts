import { Component, ElementRef, HostListener, Renderer2, ViewChild } from '@angular/core';
@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css']
})
export class LibraryComponent {

  public customUserList:any = [
    {
      id: 1,
      name: 'Trekking',
      totalTracks: 10,
      owner: 'Luke SkyWalker',
      type: 'Custom List',
      img: 'https://media.istockphoto.com/id/1369171053/es/foto/grupo-de-deportistas-camina-por-monta%C3%B1as-al-atardecer-con-mochilas.jpg?s=612x612&w=0&k=20&c=UpuYyh2nNmi-gaJPGnoh2AGDe0-rAMEk1TMFVOepcBo='
    },
    {
      id: 2,
      name: 'Mientras cocino',
      totalTracks: 5,
      owner: 'Luke SkyWalker',
      type: 'Custom List',
      img: 'https://s2.ppllstatics.com/elcorreo/www/multimedia/201901/10/media/cortadas/aplicaciones-aprender-cocinar-2019-U601036856160UwB-U70203477799ehH-624x385@El%20Correo-ElCorreo.jpg'
    },
    {
      id: 3,
      name: 'Wprk Out',
      totalTracks: 22,
      owner: 'Luke SkyWalker',
      type: 'Custom List',
      img: 'https://images.everydayhealth.com/images/everything-you-need-know-about-fitness-1440x810.jpg'
    }
  ];

  public newListName!:string;
  public newListDescription!:string;
  public newListImage:any;
  public newListImagePreview!:string;
  private contexMenu:any;

  constructor(private renderer:Renderer2){ }

  @ViewChild('newCustomListForm') newCustomListForm!:ElementRef;
  @ViewChild('asMainContainer') asMainContainer!:ElementRef;
  printCustomListForm(){
    this.renderer.setStyle(this.newCustomListForm.nativeElement, 'display', 'flex');
  }

  @HostListener('click',['$event.target.className'])
  onClick(className:any){
    if(!className.includes('customContextMenu') && !className.includes('ccm-option')){
      this.removeContexMenu();
    }
  }

  @HostListener('window:scroll',['$event'])
  onScroll(){
    this.removeContexMenu();
  }

  closeForm(){
    this.renderer.setStyle(this.newCustomListForm.nativeElement, 'display', 'none');
    this.resetForm();
  }

  resetForm(){
    this.newListName = '';
    this.newListDescription = '';
    this.newListImage = null;
    this.newListImagePreview = '';

  }

  getImageData(e:any){
    const FIRSELEMENT = 0;
    this.newListImage = e.target.files[FIRSELEMENT];
    this.encodeFileAsBase64URL(e.target.files[FIRSELEMENT])
    .then((result:any) => this.newListImagePreview = result)
  }

  submitNewCusstomList(){
    this.customUserList.push({
      name: this.newListName,
      totalTracks: 0,
      owner: 'Luke SkyWalker',
      type: 'Custom List',
      img: this.newListImagePreview
    })
    this.closeForm()
  }
  /* contextualmenu */
  insertContexMenu(event:any){
    let contextMenu = this.renderer.createElement('div'),
        options = ['Detalles','Editar','Eliminar'],
        option,
        parentNode = this.asMainContainer.nativeElement;
    
    this.removeContexMenu();
    
    this.renderer.addClass(contextMenu, 'customContextMenu');

    options.forEach(element =>{
      option = this.renderer.createElement('div');
      this.renderer.addClass(option, 'ccm-option');
      this.renderer.appendChild(option, this.renderer.createText(element));
      this.renderer.appendChild(contextMenu, option);
    });

    this.renderer.appendChild(parentNode, contextMenu);
    this.renderer.setStyle(contextMenu, 'left', event.clientX+'px');
    this.renderer.setStyle(contextMenu, 'top', event.clientY+'px');

    this.contexMenu = contextMenu;

    return false;
  }

  removeContexMenu(){
    let parentNode = this.asMainContainer.nativeElement;
    if(this.contexMenu){
      this.renderer.removeChild(parentNode, this.contexMenu);
      this.contexMenu = null;
    }
  }

  /* */

  encodeFileAsBase64URL(file:any) {
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.addEventListener('loadend', () => resolve(reader.result) );
    });
};

}
