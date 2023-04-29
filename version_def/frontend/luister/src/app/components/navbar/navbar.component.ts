import {  Component, OnInit, HostListener, Renderer2, ElementRef, ViewChild } from "@angular/core";

@Component({
    selector: 'navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit{
    public title = 'Luister';
    @ViewChild('asMenu') homeSelector!:ElementRef;

    constructor(private renderer:Renderer2){}

    ngOnInit(){}

    @HostListener('click',['$event.target'])
    onCLick(element:any):void{
        
        if(element.localName === 'a'){
            if (element.href.replace(element.baseURI, '') != ''){
                this.renderer.removeClass(this.homeSelector.nativeElement, 'logo-selected');
            }else{
                this.renderer.addClass(this.homeSelector.nativeElement, 'logo-selected');
            }
        }
    }
    
    @HostListener('window:load',['$event.target'])
    onPageLoad(element:any) {
        if (element.URL.replace(element.baseURI, '') != ''){
            this.renderer.removeClass(this.homeSelector.nativeElement, 'logo-selected');
        }else{
            this.renderer.addClass(this.homeSelector.nativeElement, 'logo-selected');
        }
    }
}