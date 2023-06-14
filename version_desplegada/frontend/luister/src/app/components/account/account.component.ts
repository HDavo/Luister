import { Component, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LuisterApiService } from 'src/app/services/luister-api.service';
import { LuisterCookieManagerService } from 'src/app/services/luister-cookie-manager.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
})
export class AccountComponent {
  public location!: string;
  public followedArtists: any;
  public username: string = '';
  public email: string = '';
  public defaultsettings: boolean = true;

  constructor(
    private renderer: Renderer2,
    route: ActivatedRoute,
    Router: Router,
    private cookieService: LuisterCookieManagerService,
    private luister: LuisterApiService
  ) {
    this.username = this.cookieService.get('username');
    this.email = this.cookieService.get('useremail');
    route.params.subscribe((params: any) => {
      if (
        params.section == 'profile' ||
        params.section == 'following' ||
        params.section == 'settings'
      ) {
        this.location = params.section;
      } else {
        Router.navigate(['/not-found']);
      }
      this.getFollowedArtists()
    });
    this.defaultsettings = this.cookieService.check('defaultsettings');
  }

  ngAfterViewInit() {}

  enableDisable(element: any) {
    if (element.classList.contains('enabled')) {
      this.renderer.addClass(element, 'disabled');
      this.renderer.removeClass(element, 'enabled');
    } else {
      this.renderer.addClass(element, 'enabled');
      this.renderer.removeClass(element, 'disabled');
    }
  }

  updateUserData(element: any) {
    const target = element.parentNode.getElementsByClassName(
      'userdata-input-field'
    )[0];
    if (target.getAttribute('disabled') != null) {
      target.removeAttribute('disabled');
      element.innerHTML = 'Guardar';
    } else {
      alert('Guardado');
      target.setAttribute('disabled', '');
      element.innerHTML = 'Editar';
    }
    target.focus();
  }

  toggleChange() {
    (this.defaultsettings)
    ?this.defaultsettings = false
    :this.defaultsettings = true;
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
  getFollowedArtists(){
    const userid: number = parseInt(this.cookieService.get('userid'));
    this.luister.getFollowedArtists(userid)
    .subscribe((response:any)=>{
      if(response.data){
        this.followedArtists = response.data;
      }else console.log('Sin usuarios seguidos');
    })
  }
  unfollow(artistid:number){
    const userid: number= parseInt(this.cookieService.get('userid'));
    const data: any = {
      userid: userid,
      artistid: artistid
    }
    this.luister.unfollow(data)
    .subscribe((response:any)=>{
      if(response.status == 200){
        this.followedArtists = this.followedArtists.filter((element:any) => element.id != artistid);
      }else alert('Hubo un error en la ejecución');
    })
  }
  setdefault(){
    (!this.cookieService.check('defaultsettings'))
    ?this.cookieService.set('defaultsettings','true')
    :this.cookieService.delete('defaultsettings');
  }

}
