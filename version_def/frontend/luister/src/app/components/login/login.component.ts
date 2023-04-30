import { Component } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  myForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]], //TODO: poner la validación del curso de Angular para asegurarse del funcionamiento
    password: ['', [Validators.required, Validators.minLength(6)]], //TODO: decidir que patrón queremos poner dentro del campo de contraseñas
  });

  constructor( private fb: FormBuilder){}

  login(){
    const {email, password} = this.myForm.value;

    console.log(email, password);

  }
}
