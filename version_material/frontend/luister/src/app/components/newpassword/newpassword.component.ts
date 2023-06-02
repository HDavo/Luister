import { Component, Renderer2} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LuisterApiService } from 'src/app/services/luister-api.service';
import { ValidationsService } from 'src/app/services/validations.service';

@Component({
  selector: 'app-newpassword',
  templateUrl: './newpassword.component.html',
  styleUrls: ['./newpassword.component.css']
})
export class NewpasswordComponent {

  private token!:string;
  public setPasswordForm: FormGroup = this.formBuilder.group({
    password: ['',[Validators.required]],
    passwordrepeat: ['',[Validators.required]]
  })

  constructor(
    route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private renderer: Renderer2,
    private luister: LuisterApiService,
    private router: Router,
    private validator: ValidationsService
  ){
    route.params
    .subscribe((res:any)=>{
      this.token = res.token;
    })
  }
  updatePassword(){
    const data = {
      token: this.token,
      password: this.setPasswordForm.value.password,
      passwordrepeat: this.setPasswordForm.value.passwordrepeat
    }

    this.luister.setNewPassword(data)
    .subscribe((response:any)=>{
      if(response.status == 200){
        alert('Cuenta de usuario lista!');
        this.router.navigate(['/','signin']);
      }else console.log(response.message);
    })
  }
  showHidePassword(event:any){
    const clicked = event.target,
          target = event.target.parentNode.getElementsByTagName('input')[0],
          type = target.getAttribute('type');
    if(type == 'password'){
      this.renderer.removeClass(clicked,'show-hide-pass');
      this.renderer.addClass(clicked,'show-hide-pass2');
      this.renderer.setProperty(target,'type','text');
    }else {
      this.renderer.removeClass(clicked,'show-hide-pass2');
      this.renderer.addClass(clicked,'show-hide-pass');
      this.renderer.setProperty(target,'type','password');
    }
  }
  isValid( field: string ) {
    return this.validator.validField( this.setPasswordForm, field );
  }
}
