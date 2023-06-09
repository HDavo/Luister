import { Injectable } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidationsService {

  constructor() { }

  // public namePattern: string = '([a-zA-Z0-9_- ]{12}'; 
  public namePattern: string = "^[a-zA-Z0-9_-\w ]{4,25}$"; 
  public emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";

  //TODO: poner el servicio en funcionamiento dentro de las páginas de reactive (hasta ahora con las validaciones en el propio fichero)

  public validForm = ( control: FormControl ): ValidationErrors | null => { //esto debe devolver un objeto con el error

      const valor: string = control.value.trim().toLowerCase();

      if(valor === 'pepe'){
          return { //return para el caso de que exista un error
              noValido: true,
          }
      }

      return null;
  }

  public validField( form: FormGroup, field: string): boolean | null {
    const control = form.controls[field];
    return control.errors && (control.touched || control.dirty);
  }


  public EqualFields( field1: string, field2: string ) {

    return ( formGroup: AbstractControl ): ValidationErrors | null => {

      const fieldValue1 = formGroup.get(field1)?.value;
      const fieldValue2 = formGroup.get(field2)?.value;

      if ( fieldValue1 !== fieldValue2 ) {
        formGroup.get(field2)?.setErrors({ notEqual: true });
        return { notEqual: true }
      }

      formGroup.get(field2)?.setErrors(null);
      return null;
    }

  }
  
}





