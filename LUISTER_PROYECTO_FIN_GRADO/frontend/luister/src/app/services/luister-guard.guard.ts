import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

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
    const RESULT = this.CookieService.check('cookie-token');
    if(!RESULT) {
      Swal.fire(
          'No autorizado',
          'Debes iniciar sesión para acceder a este recurso',
          'error'
        );
    }
    return RESULT;
  }
  
}
