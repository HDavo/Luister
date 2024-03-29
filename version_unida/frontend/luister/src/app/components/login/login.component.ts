import { Component } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ValidationsService} from 'src/app/services/validations.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  myForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.pattern(this.val.emailPattern)]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  constructor(
    private fb: FormBuilder,
    private val: ValidationsService
  ){}

  isValid(field: string){
    return this.val.validField(this.myForm, field);
  }

  login(){
    const {email, password} = this.myForm.value;

    console.log(email, password);

    this.myForm.markAllAsTouched();

  }
}
