import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

interface Persona {
  nombre: string;
  favoritos: Favorito[];

}

interface Favorito {
  id: number;
  nombre: string;
}

@Component({
  selector: 'app-dinamicos',
  templateUrl: './dinamicos.component.html'
})

export class DinamicosComponent {

  nuevoJuego: string = '';

  persona: Persona = {
    nombre: 'Jorge',
    favoritos: [
      { id: 1, nombre: 'Kirby' },
      { id: 2, nombre: 'Sonic' }
    
    ]
  
  }


  @ViewChild('miFormulario') miFormulario!: NgForm;

  constructor() { }

  ngOnInit(): void {
  }

  

  nombreValido():boolean {
    return this.miFormulario?.controls['nombre']?.invalid
          && this.miFormulario?.controls['nombre']?.touched

  }

  agregarJuego(){
    const nuevoFavorito: Favorito = {
      id: this.persona.favoritos.length + 1,
      nombre:  this.nuevoJuego
    }

    this.persona.favoritos.push({ ...nuevoFavorito});
    this.nuevoJuego = '';
  }

  guardar(){
    console.log( this.miFormulario.controls );
  }

  eliminar(index: number){
    this.persona.favoritos.splice(index, 1);
  }

}
