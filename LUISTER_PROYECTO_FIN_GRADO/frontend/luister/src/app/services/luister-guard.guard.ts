import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { LuisterSweetAlert } from './luisterSweetAlert';

@Injectable({
  providedIn: 'root'
})
export class LuisterGuardGuard implements CanActivate {

  constructor(private CookieService:CookieService, private router:Router){ }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    const VALIDATION = this.isValidSession();
    if(!VALIDATION){
      this.router.navigate(['/', 'signin']);
    }
    return VALIDATION;
  }

  isValidSession():boolean{
    const RESULT = this.CookieService.check('auth-token');
    if(!RESULT) {
      LuisterSweetAlert.denie(
        'Debes iniciar sesión para acceder a este recurso',
        'No autorizado',
        '#',
        '¿Iniciar sesión?'
        );
    }
    return RESULT;
  }
  
}
