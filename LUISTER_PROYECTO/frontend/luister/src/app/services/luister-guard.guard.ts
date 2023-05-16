import { inject } from "@angular/core"
import { Router, CanActivateFn} from "@angular/router"
import { CookieService } from "ngx-cookie-service"

export const noAuthGuard: CanActivateFn = () => {
  const cookieService =  inject(CookieService);
  const router =  inject(Router);

  const VALIDATION = cookieService.check('auth-token');
  if(!VALIDATION){
    router.navigate(['/', 'signin']);
  }
  return VALIDATION;
}

export const authGuard: CanActivateFn = () => {
  const cookieService =  inject(CookieService);
  const router =  inject(Router);

  const VALIDATION = cookieService.check('auth-token');

  if(VALIDATION){
    router.navigate(['/']);
  }
  
  return (!VALIDATION);
}