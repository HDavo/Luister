import { Component } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ValidationsService} from '../../services/validations.service'
import { LuisterApiService } from 'src/app/services/luister-api.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  public errors!:string;
  public signInForm: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.pattern(this.validator.emailPattern)]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  constructor(
    private formBuilder: FormBuilder,
    private validator: ValidationsService,
    private lusiter:LuisterApiService,
    private cookiService:CookieService
  ){}

  isValid(field: string){
    return this.validator.validField(this.signInForm, field);
  }

  login(){
    if(this.signInForm.valid){
      this.lusiter.signIn(this.signInForm.value)
      .subscribe((response:any)=> {
        if(response){
          this.cookiService.set('auth-token', response['auth-token']);
          this.cookiService.set('username', response.data.name);
          this.cookiService.set('useremail', response.data.email);
          this.cookiService.set('userid', response.data.id);
          window.location.reload();// Revisar este workaround
        }else {
          this.errors = 'Credenciales incorrectas';
        }
      })
    }
    this.signInForm.markAllAsTouched();
  }
}
