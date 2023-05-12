import { Injectable } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidationsService {

    public namePattern: string = '([a-zA-Z]+) ([a-zA-Z]+)';
    public emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";

    constructor() { }

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
      return form.controls[field].errors && form.controls[field].touched;
  }


  public equalInputs(field1: string, field2: string){

      return ( formGroup: AbstractControl): ValidationErrors | null => {
          const valorfield1 = formGroup.get(field1)?.value;
          const valorfield2 = formGroup.get(field2)?.value;

          if( valorfield1 !== valorfield2 ){
              formGroup.get(field2)?.setErrors({ notEquals: true });
              console.log('Entro ewe');
              return { notEquals: true}

          }

          console.log('Entro aqui2');
          formGroup.get(field2)?.setErrors(null);
          return null;


      }
  }
}





