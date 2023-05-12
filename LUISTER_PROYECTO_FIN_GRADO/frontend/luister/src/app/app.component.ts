import { Component, ElementRef, HostListener, ViewChild, Renderer2 } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})

export class AppComponent {
    title = 'Luister';
    cookieBannerState !:string;
    @ViewChild('asBannerContainer') asBannerContainer !:ElementRef;
    @ViewChild('asBannerButton') asBannerButton !:ElementRef;

    constructor(private renderer:Renderer2){
        this.cookieBannerState = localStorage.getItem('cookie-banner') || '';
    }

    @HostListener('contextmenu',['$event'])
    void(){ return false; }

    @HostListener('click',['$event.target'])
    onCLick(element:any):void{
        
        if(element.localName === 'a' || element.parentNode.localName === 'a'){
            document.documentElement.scrollTop = 0;
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
