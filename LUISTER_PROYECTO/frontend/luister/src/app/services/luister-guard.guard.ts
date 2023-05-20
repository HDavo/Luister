import { inject } from "@angular/core"
import { Router, CanActivateFn} from "@angular/router"
import { LuisterCookieManagerService } from "./luister-cookie-manager.service";

export const noAuthGuard: CanActivateFn = () => {
  const cookieService =  inject(LuisterCookieManagerService);
  const router =  inject(Router);

  const VALIDATION = cookieService.check('auth-token');

  if(!VALIDATION){
    router.navigate(['/', 'signin']);
  }
  return VALIDATION;
}

export const authGuard: CanActivateFn = () => {
  const cookieService =  inject(LuisterCookieManagerService);
  const router =  inject(Router);

  const VALIDATION = cookieService.check('auth-token');

  if(VALIDATION){
    router.navigate(['/']);
  }
  return (!VALIDATION);
}