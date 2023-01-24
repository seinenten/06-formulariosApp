import { ValidationErrors } from '@angular/forms';
import { Injectable } from '@angular/core';
import { AbstractControl, FormControl} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidatorService {

  public  nombreApellidoPattern: string = '([a-zA-Z]+) ([a-zA-Z]+)';
  public  emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";


  
  noPuedeSerStrider(control: FormControl): ValidationErrors | null {
  // Se obtiene el valor del campo
  const valor:string = control.value?.trim().toLowerCase();
  
  if (valor === 'strider'){
    // return error
      return{ 
      //AL REGRESAR UN OBJETO ES CONSIDERADO UN ERROR
      noStrider: true
      }
  }

    // Cuando se regresa un null en una validacion significa que No hay error
    return null;
  }


  camposIguales( campo1:string, campo2:string){
  
    return (formGroup: AbstractControl): ValidationErrors | null => {
    
      const pass1 = formGroup.get(campo1)?.value;
      const pass2 = formGroup.get(campo2)?.value;

      if ( pass1 !== pass2  ){
        
        // el formgroup se nos envia por referencia. Asi que hacemos
        // Desestructurarion para colocarle el error
        formGroup.get(campo2)?.setErrors({ noIguales: true  });
        return {  noIguales: true }
      }

      //Al tenerlos invalido, limpiamos los errores
      formGroup.get(campo2)?.setErrors( null );
      return null;
    }
  }



  constructor() { }
}
