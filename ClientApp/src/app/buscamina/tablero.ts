import { Casilla } from './casilla';

const adyacencias = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, -1],
  [0, 1],
  [1, -1],
  [1, 0],
  [1, 1],
];

export class Tablero {
  casillas: Casilla[][] = [];
  private casillasRestantes = 0;
  private numeroMinas = 0;

  constructor(tamano: number, minas: number) {
    // Crea las casillas necesarias en base al tamano del tablero
    for (let fila = 0; fila < tamano; fila++) {
      this.casillas[fila] = [];
      for (let columna = 0; columna < tamano; columna++) {
        this.casillas[fila][columna] = new Casilla(fila, columna);
      }
    }

    // Crear las minas
    for (let i = 0; i < minas; i++) {
      this.getCasillaRandom().mina = true;
    }

    // Algoritmo de Coteo de minas adyacentes
    for (let fila = 0; fila < tamano; fila++) {
      for (let columna = 0; columna < tamano; columna++) {
        let minas = 0;
        for (let adyacencia of adyacencias) {
          // verfifca si existe la casilla y si hay una mina en esa casilla
          if (
            this.casillas[fila + adyacencia[0]] &&
            this.casillas[fila + adyacencia[0]][columna + adyacencia[1]] &&
            this.casillas[fila + adyacencia[0]][columna + adyacencia[1]].mina
          ) {
            minas++;
          }
        }
        this.casillas[fila][columna].adyacentes = minas;

        if (this.casillas[fila][columna]) {
          this.numeroMinas++;
        }
      }
    }
    this.casillasRestantes = tamano * tamano - minas;
  }

  // Agarra un casilla alazar y le asigna una mina
  getCasillaRandom(): Casilla {
    const fila = Math.floor(Math.random() * this.casillas.length);
    const columna = Math.floor(Math.random() * this.casillas[fila].length);
    return this.casillas[fila][columna];
  }

  checkCasilla(casilla: Casilla): 'gameover' | 'ganastes' | null {
    if (casilla.status !== 'abierta') {
      return null;
    } else if (casilla.mina) {
      this.mostrarMinas();
      return 'gameover';
    } else {
      casilla.status = 'despejada';
      this.casillasRestantes--;
      console.log(this.casillasRestantes);
      if (this.casillasRestantes <= 0) {
        return 'ganastes';
      }

      // abre las casillas proximas que no tengan minas automaticamente
      if (casilla.adyacentes === 0) {
        for (let adyacente of adyacencias) {
          if (
            this.casillas[casilla.fila + adyacente[0]] &&
            this.casillas[casilla.fila + adyacente[0]][
              casilla.columna + adyacente[1]
            ]
          ) {
            this.checkCasilla(
              this.casillas[casilla.fila + adyacente[0]][
                casilla.columna + adyacente[1]
              ]
            );
          }
        }
      }

      return null;
    }
  }

  mostrarMinas() {
    for (let fila = 0; fila < this.casillas.length; fila++) {
      for (let columna = 0; columna < this.casillas[fila].length; columna++) {
        if (this.casillas[fila][columna].status === 'abierta') {
          this.casillas[fila][columna].status = 'despejada';
        }
      }
    }
  }
}
