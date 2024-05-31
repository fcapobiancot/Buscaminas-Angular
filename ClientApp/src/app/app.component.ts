import { Component } from '@angular/core';
import { Tablero } from './buscamina/tablero';
import { Casilla } from './buscamina/casilla';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'buscaminas';
  tablero: Tablero;
  constructor() {
    this.reset();
  }

  checkCasilla(casilla: Casilla) {
    const resultado = this.tablero.checkCasilla(casilla);
    if (resultado === 'gameover') {
      alert('Perdistes');
    } else if (resultado == 'ganastes') {
      alert('Ganastes');
    }
  }

  bandera(event: MouseEvent, casilla: Casilla) {
    event.preventDefault();
    if (casilla.status === 'banderada') {
      casilla.status = 'abierta';
    } else {
      casilla.status = 'banderada';
    }
  }

  reset() {
    this.tablero = new Tablero(10, 10);
  }
}
