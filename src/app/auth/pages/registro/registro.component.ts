import { EmailValidatorService } from './../../../shared/validators/email-validator.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ValidatorService } from 'src/app/shared/validators/validator.service';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html'
})
export class RegistroComponent implements OnInit {

  miFormulario: FormGroup = this.fb.group({
    nombre: ['', [ Validators.required, Validators.pattern( this.vS.nombreApellidoPattern )] ],
    email: ['', [ Validators.required, Validators.pattern( this.vS.emailPattern ) ], [ this.emailValidator ] ],
    username: ['', [ Validators.required, this.vS.noPuedeSerStrider ]   ],
    pass: ['', [ Validators.required, Validators.minLength(6) ]   ],
    pass2: ['', [ Validators.required ]   ],
  }, {
    //Para realizar estas validaciones
    //Se necesita leer a tiempo real los campos a utilizar
    validators: [   this.vS.camposIguales('pass', 'pass2') ]
  })

  constructor(
    private fb: FormBuilder,
    //validatorService
    private vS: ValidatorService,
    private emailValidator: EmailValidatorService
  ) { }

  ngOnInit(): void {

    //COLOCARLE VALORES YA INICIADOS EN EL FORMULARIO
    this.miFormulario.reset({
      nombre: 'Jorge Luis',
      email: 'test1@test.com',
      username: 'Seinen',
      pass: '123456',
      pass2: '123456'
    })


  }


  get emailErrorMsg(): string {
    
    const errors = this.miFormulario.get('email')?.errors;
    if( errors?.['required']  ){
      return 'Email es obligatorio';
    }else if( errors?.['pattern'] ){
      return 'El valor no tiene formato de correo';
    }else if( errors?.['emailTomado'] ){
      return 'El correo electronico ya existe';
    }

    return '';
  
  }


  campoNoValido(  campo: string ){
    return this.miFormulario.get(campo)?.invalid
            && this.miFormulario.get(campo)?.touched;
  }

  // CODIGOS QUE RESUME EL emailErrorMsg

  // emailRequired(){
  //   return this.miFormulario.get('email')?.errors?.['required']
  //           && this.miFormulario.get('email')?.touched;
  // }

  // emailFormato(){
  //   return this.miFormulario.get('email')?.errors?.['pattern']
  //           && this.miFormulario.get('email')?.touched;
  // }

  // emailTomado(){
  //   return this.miFormulario.get('email')?.errors?.['emailTomado']
  //           && this.miFormulario.get('email')?.touched;
  // }




  submitFormulario(){
  
    console.log(this.miFormulario);

    this.miFormulario.markAllAsTouched();
  }

}
