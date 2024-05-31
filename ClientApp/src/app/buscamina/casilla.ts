export class Casilla {
    status: 'abierta' | 'despejada' | 'banderada' = 'abierta' ;
    mina = false;
    adyacentes = 0;

    constructor(public fila: number, public columna: number){

    }
}