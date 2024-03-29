import { Component } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ValidationsService } from 'src/app/services/validations.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.pattern(this.val.namePattern)]],
    email: ['', [Validators.required, Validators.pattern(this.val.emailPattern)]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    password2 : ['', [Validators.required]],
    consent: [false, [Validators.requiredTrue]]
  },{
    validators: [
      this.val.EqualFields('password', 'password2')
    ]
    
  });

  constructor(
    private fb: FormBuilder,
    private val: ValidationsService
    ){}

  isValid( field: string ) {
    return this.val.validField( this.myForm, field );
  }

  register(){
    const { name, email, password, password2, consent} = this.myForm.value;

    console.log(name, email, password, password2, consent);

    this.myForm.markAllAsTouched();

  }  
}
