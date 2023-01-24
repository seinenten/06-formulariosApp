import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-basicos',
  templateUrl: './basicos.component.html'
})
export class BasicosComponent implements OnInit {

  //con el ng On init se establecen valores en el formulario
  ngOnInit() {
    this.miFormulario.reset({
      nombre: 'pepe',
      precio: 332
    })
  }

  miFormulario: FormGroup = this.fb.group({
    nombre:      ['', [Validators.required, Validators.minLength(3)   ] ],
    precio:      [ , [Validators.required  ,Validators.min(0)] ],
    existencias: [ , [Validators.required  ,Validators.min(0)] ],
  })


  constructor(
    private fb: FormBuilder
  ) { }




  campoNoEsValido(campo: string){
    return this.miFormulario.controls[campo].errors 
    && this.miFormulario.controls[campo].touched 
  }

  guardar(){
    if (this.miFormulario.invalid){
      this.miFormulario.markAllAsTouched();
      return
    }
    console.log(this.miFormulario.value)
    this.miFormulario.reset();
  }


}
