import { Component, ElementRef, HostListener, ViewChild, Renderer2 } from '@angular/core';
import { ContexMenu } from './services/contextMenu';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})

export class AppComponent {
    title = 'Luister';
    cookieBannerState !:string;
    contexMenu:any;

    @ViewChild('asBannerContainer') asBannerContainer !:ElementRef;
    @ViewChild('asBannerButton') asBannerButton !:ElementRef;
    @ViewChild('routerOutlet') routerOutlet !:ElementRef;

    constructor(private renderer:Renderer2, private contextMenu:ContexMenu){
        this.cookieBannerState = localStorage.getItem('cookie-banner') || '';
    }

    @HostListener('contextmenu',['$event'])
    void(){
        this.contextMenu.insertContextMenu(event, this.routerOutlet.nativeElement);
        return false;
    }

    @HostListener('window:scroll',['$event'])
    onScroll(){
        this.contextMenu.removeContexMenu();
    }

    @HostListener('click',['$event.target'])
    onCLick(element:any):void{

        if(element.localName === 'a' ){
            document.documentElement.scrollTo({top: 0, behavior: 'smooth'});
        }

        if(!element.className.includes('customContextMenu') && !element.className.includes('ccm-option')){
            this.contextMenu.removeContexMenu();
          }
    }
    ngAfterViewInit(){

        if(!this.cookieBannerState || this.cookieBannerState != 'hidden'){
            this.changeBannerVisibility('visible');
        }

        this.renderer.listen(this.asBannerButton.nativeElement, 'click', (e)=>{
            localStorage.setItem('cookie-banner', 'hidden');
            this.hideBannerInfo(e);
        })
    }
    changeBannerVisibility(value:string){
        this.renderer.setStyle(this.asBannerContainer.nativeElement, 'visibility', value);
    }
    hideBannerInfo(event:any){
        const TRANSITION = 600;
        this.renderer.setStyle(event.target.parentNode, 'animation-name', 'hidding-bottom');
        setTimeout(() => {
            this.changeBannerVisibility('hidden');
        }, TRANSITION);
    }
}
