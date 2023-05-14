import {  Component, OnInit, HostListener, Renderer2, ElementRef, ViewChild } from "@angular/core";

@Component({
    selector: 'navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})

export class NavbarComponent{
    public title = 'Luister';
    @ViewChild('asMenu') homeSelector!:ElementRef;
    @ViewChild('asMobileGridMenu') asMmobileMenu!:ElementRef;
    @ViewChild('asGridMenuContainer') asGridMenuContainer!:ElementRef;

    constructor(private renderer:Renderer2){
    }

    @HostListener('click',['$event.target'])
    onCLick(element:any):void{
        if(element.localName === 'a'){
            if (element.href.replace(element.baseURI, '') != ''){
                this.renderer.removeClass(this.homeSelector.nativeElement, 'logo-selected');
            }else{
                this.renderer.addClass(this.homeSelector.nativeElement, 'logo-selected');
            }
        }

        if(element.parentNode.localName == 'a' || element.localName == 'a'){
            this.hideMobileMenu();
        }

    }
    
    @HostListener('window:load',['$event.target'])
    onPageLoad(element:any) {
        if (element.URL.replace(element.baseURI, '') != ''){
            this.renderer.removeClass(this.homeSelector.nativeElement, 'logo-selected');
        }else{
            this.renderer.addClass(this.homeSelector.nativeElement, 'logo-selected');
        }

        this.renderer.listen(this.asMmobileMenu.nativeElement, 'click',()=>{
           if(this.asGridMenuContainer.nativeElement.classList.contains('element-hidden')){
                this.showMobileMenu();
            }else{
                this.hideMobileMenu();
           } 
        })

        this.hideMobileMenu();
    }

    showMobileMenu(){
        this.renderer.addClass(this.asGridMenuContainer.nativeElement, 'element-visible');
        this.renderer.removeClass(this.asGridMenuContainer.nativeElement, 'element-hidden');
    }
    hideMobileMenu(){
        this.renderer.addClass(this.asGridMenuContainer.nativeElement, 'element-hidden');
        this.renderer.removeClass(this.asGridMenuContainer.nativeElement, 'element-visible');
    }
}