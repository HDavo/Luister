import { Injectable } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidationsService {

  constructor() { }

  public firstNameAndLastnamePattern: string = '([a-zA-Z]+) ([a-zA-Z]+)';
  public emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";

  //TODO: poner el servicio en funcionamiento dentro de las páginas de reactive (hasta ahora con las validaciones en el propio fichero)

  public noAceptado = ( control: FormControl ): ValidationErrors | null => { //esto debe devolver un objeto con el error

      const valor: string = control.value.trim().toLowerCase();

      if(valor === 'pepe'){
          return { //return para el caso de que exista un error
              noValido: true,
          }
      }

      return null;
  }

  public campoValido( formulario: FormGroup, campo: string): boolean | null {
      return formulario.controls[campo].errors && formulario.controls[campo].touched;
  }


  public camposIguales(campo1: string, campo2: string){

      return ( formGroup: AbstractControl): ValidationErrors | null => {
          const valorCampo1 = formGroup.get(campo1)?.value;
          const valorCampo2 = formGroup.get(campo2)?.value;

          if( valorCampo1 !== valorCampo2 ){
              formGroup.get(campo2)?.setErrors({ noIguales: true });
              console.log('Entro ewe');
              return { noIguales: true}

          }

          console.log('Entro aqui2');
          formGroup.get(campo2)?.setErrors(null);
          return null;


      }
  }
}





