import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ValidationsService} from '../../services/validations.service'
import { LuisterApiService } from 'src/app/services/luister-api.service';
import { LuisterCookieManagerService } from 'src/app/services/luister-cookie-manager.service';

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
    private luister:LuisterApiService,
    private cookiService:LuisterCookieManagerService,
    private renderer: Renderer2
  ){}
  isValid(field: string, form:FormGroup){
    return this.validator.validField(form, field);
  }
  login(){
    if(this.signInForm.valid){
      this.luister.signIn(this.signInForm.value)
      .subscribe((response:any)=> {
        if(response.status == 200){
          this.setSessionCookies(response.data);
          window.location.reload();
        }else this.errors = response.message;
      });
    }
    this.signInForm.markAllAsTouched();
  }

  setSessionCookies(data:any) {
    this.cookiService.set('auth-token', data['auth-token']);
    this.cookiService.set('username', data.userdata.name);
    this.cookiService.set('useremail', data.userdata.email);
    this.cookiService.set('userid', data.userdata.id);
  }

  passwordResetRequest(){
    const form = this.resetPassForm;
   if(this.resetPassForm.valid){
    this.luister.passwordResetRequest(form.value.resetpassemail)
    .subscribe((response:any)=>{
      if(response.status == 200){
        alert('Peticion procesada correctamente!');
        this.hidePassResetCont();
      }else{
        alert(response.message);
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
