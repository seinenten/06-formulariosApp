import { Component} from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';

@Component({
  selector: 'app-dinamicos',
  templateUrl: './dinamicos.component.html'
})
export class DinamicosComponent {

  miFormulario: FormGroup = this.fb.group({
    nombre:      ['', [Validators.required, Validators.minLength(3)   ] ],
    favoritos: this.fb.array(  [
      [  'Metal Gear', Validators.required  ],
      [  'Kirby', Validators.required  ],
    ], Validators.required  )
  })


  nuevoFavorito: FormControl = this.fb.control('', Validators.required);

  //Transformo el objeto en un arreglo y lo mando al html
  get favoritosArr(){
    return this.miFormulario.get('favoritos') as FormArray;
  }

  constructor(
    private fb: FormBuilder
    ) { }


    campoNoEsValido(campo: string){
      return this.miFormulario.controls[campo].errors 
      && this.miFormulario.controls[campo].touched 
    }

    agregarFavorito(){
      if(this.nuevoFavorito.invalid) { return; }

      this.favoritosArr.push( this.fb.control( this.nuevoFavorito.value, Validators.required ) );
    
      this.nuevoFavorito.reset();
    }

    borrar(index: number){
    
      this.favoritosArr.removeAt(index);
    }


    guardar(){
      if (this.miFormulario.invalid){
        this.miFormulario.markAllAsTouched();
        return
      }
      console.log(this.miFormulario)
      this.miFormulario.reset();
    }

}
