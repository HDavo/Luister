import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';




@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]], //TODO: poner la validación del curso de Angular para asegurarse del funcionamiento
    password: ['', [Validators.required, Validators.minLength(6)]], //TODO: decidir que patrón queremos poner dentro del campo de contraseñas
    consent: [false, [Validators.requiredTrue]]
  });

  constructor( private fb: FormBuilder){}

  register(){
    const { name, email, password, consent} = this.myForm.value;

    console.log(name, email, password, consent);

  }
}
