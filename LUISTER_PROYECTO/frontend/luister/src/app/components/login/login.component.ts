import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
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
  public resetPassForm:FormGroup = this.formBuilder.group({
    resetpassemail: ['', [Validators.required, Validators.pattern(this.validator.emailPattern)]]
  });
  @ViewChild('asPassResetCont') passresetcont !:ElementRef;
  
  constructor(
    private formBuilder: FormBuilder,
    private validator: ValidationsService,
    private lusiter:LuisterApiService,
    private cookiService:CookieService,
    private renderer: Renderer2
  ){}

  isValid(field: string, form:FormGroup){
    return this.validator.validField(form, field);
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
  passwordResetRequest(){
    const form = this.resetPassForm;
   if(this.resetPassForm.valid){
    this.lusiter.passwordResetRequest(form.value.resetpassemail)
    .subscribe((res:any)=>{
      if(res == true){
        alert('Peticion procesada correctamente!');
        this.hidePassResetCont();
      }else{
        alert('Este correo no esta asociado a ninguna cuenta');
      }
    })
   }
  }
  showPassResetCont(){
    const target = this.passresetcont.nativeElement;
     this.renderer.setStyle(target, 'display', 'flex');
     document.documentElement.scrollTo({top:0, behavior: 'smooth'});
  }
  hidePassResetCont(){
    const target = this.passresetcont.nativeElement;
    this.renderer.setStyle(target, 'display', 'none');
    this.resetPassForm.reset();
  }
}
