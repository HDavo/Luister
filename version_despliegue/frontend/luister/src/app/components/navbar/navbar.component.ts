import {  Component, HostListener, Renderer2, ElementRef, ViewChild, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { LuisterApiService } from "src/app/services/luister-api.service";
import { LuisterCookieManagerService } from "src/app/services/luister-cookie-manager.service";

@Component({
    selector: 'navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})

export class NavbarComponent{
    public title: string = 'Luister';
    public username: string | null = null;
    @ViewChild('asMenu') homeSelector!:ElementRef;
    @ViewChild('asGridMenuContainer') asGridMenuContainer!:ElementRef;

    constructor(
        private renderer:Renderer2, 
        private cookieService:LuisterCookieManagerService,
        private luister:LuisterApiService,
        private router: Router,
        private route: ActivatedRoute

        ){
            this.username = this.cookieService.get('username');
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

        if(element.innerText != 'apps' && !element.classList.contains('mobile-menu-container')){
            this.hideMobileMenu();
        }

    }   
    ngAfterViewInit(): void {

        this.hideMobileMenu();
    }
    mobileGridManager(){
        const element = this.asGridMenuContainer.nativeElement;
        (!element.classList.contains('element-hidden'))
        ?this.hideMobileMenu()
        :this.showMobileMenu();
    }
    showMobileMenu(){
        this.renderer.addClass(this.asGridMenuContainer.nativeElement, 'element-visible');
        this.renderer.removeClass(this.asGridMenuContainer.nativeElement, 'element-hidden');
    }
    hideMobileMenu(){
        this.renderer.addClass(this.asGridMenuContainer.nativeElement, 'element-hidden');
        this.renderer.removeClass(this.asGridMenuContainer.nativeElement, 'element-visible');
    }
    logOut(){
        const session = this.cookieService.get('auth-token');
        this.luister.logOut(session)
        .subscribe((response:any)=> {
            if (response.status = 200) {
                this.deleteSessionCookies();
                window.location.reload();
            }else alert(response.message); 
        })
    }
    deleteSessionCookies(){
        this.cookieService.delete('auth-token');
        this.cookieService.delete('userid');
        this.cookieService.delete('username');
        this.cookieService.delete('useremail');
    }
    mobileBackHome(){
        this.router.navigate(["/"]);
        document.documentElement.scrollTo({top: 0, behavior: 'smooth'})
        this.hideMobileMenu();
    }
    mobileGoToUserProfile(){
        this.router.navigate(["/user/profile"]);
        document.documentElement.scrollTo({top: 0, behavior: 'smooth'})
        this.hideMobileMenu();
    }
}