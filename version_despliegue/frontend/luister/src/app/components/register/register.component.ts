import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LuisterApiService } from 'src/app/services/luister-api.service';
import { ValidationsService } from 'src/app/services/validations.service';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  signUpForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.pattern(this.validator.namePattern)]],
    email: ['', [Validators.required, Validators.pattern(this.validator.emailPattern)]],
    consent: [false, [Validators.requiredTrue]]
  },{
    validators: [
      this.validator.EqualFields('password', 'password2')
    ]
    
  });

  constructor(
    private fb: FormBuilder,
    private validator: ValidationsService,
    private luister: LuisterApiService
    ){}

  isValid( field: string ) {
    return this.validator.validField( this.signUpForm, field );
  }
  register(){
    const newUser = {
      name: this.signUpForm.value.name,
      email: this.signUpForm.value.email,
      consent: this.signUpForm.value.consent
    };
    this.luister.signUp(newUser)
    .subscribe((response:any)=> {
      if(response.status == 200){
        alert('Registro efectuado de forma correcta');
        this.signUpForm.reset();
      }else alert(response.message);
    })
    
    this.signUpForm.markAllAsTouched();
  }  
}
