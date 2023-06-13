import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LuisterApiService } from 'src/app/services/luister-api.service';
import { ValidationsService } from 'src/app/services/validations.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent{

  public contactForm: FormGroup = this.FormBuilder.group({
    name: ['', [Validators.required, Validators.pattern(this.validations.namePattern)]],
    email: ['', [Validators.required, Validators.pattern(this.validations.emailPattern)]],
    subject: ['', [Validators.required, Validators.minLength(4)]],
    description: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(500)]]
  });

  constructor(
    private FormBuilder: FormBuilder,
    private validations: ValidationsService,
    private luister: LuisterApiService
  ){}

  isValid( field: string ) {
    return this.validations.validField( this.contactForm, field );
  }


  onSubmit(){

    if(this.contactForm.valid){
      const formValue = this.contactForm.value;
      this.contactus(formValue);
    }else alert('Algunos campos contienen valores incorrectos!')

  }

  contactus(value: {[key: string]:string}){
    this.luister.contactus(value)
    .subscribe((response:any)=>{
      if(response){
        alert('Petición enviada exitosamente');
        this.contactForm.reset();
      }else alert('Hubo un error inesperado al enviar la petición')
    })
  }
}
