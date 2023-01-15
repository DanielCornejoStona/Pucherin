let arrayjug = [];
let arraycasi = [];


class Jugador{
    constructor(id,numFichas){
        this.id = id;
        this.numFichas = numFichas;
    }

    getId(){
        return this.id;
    }

     crearJugadores(a){
        for(var i = 1; i<=a; i++){
            let fichas = Math.floor(50/a);
            let jugador = new Jugador(i,fichas);
            arrayjug.push(jugador);
        }
    }
}

class Casilla{

    constructor(numFichas, maxFichas){
        this.numFichas = numFichas;
        this.maxFichas = maxFichas;
    }    

    rellenarCasilla(){

    }
}

const dos = new Casilla(0,2);
const tres = new Casilla(0,3);
const cuatro = new Casilla(0,4);
const cinco = new Casilla(0,5);
const seis = new Casilla(0,6);
const siete = new Casilla(0,4);
const ocho = new Casilla(0,8);
const nueve = new Casilla(0,9);
const diez = new Casilla(0,10);
const once = new Casilla(0,11);
arraycasi.push(dos,tres,cuatro,cinco,seis,siete,ocho,nueve,diez,once);

const jug = new Jugador(0,0);
let num = 0;
function jugar(){
    if(num==0){
     num = prompt("¿Cuantos jugadores van a jugar?");
    jug.crearJugadores(num);
    }
    cambiarTurno(num);
    tirarDados();
    
}

function victoria(){
    return false;
}

let turno = 1;

function cambiarTurno(b){
    
    console.log("Turno del jugador " + turno);
    console.log(arrayjug[turno - 1]);
    turno++;
    if(turno>b){
        turno=1;
    }
    tirarDados();
}



function tirarDados(){
    let dado1 = Math.round(Math.random()* (5)+1);
    let dado2 = Math.round(Math.random() * (5)+1);
    let suma = dado1+dado2;
    console.log("Has sacado " + dado1 + " y " + dado2 + " que suman " + suma);
    comprobarCasilla(suma);
}

function restarFicha(){
            arrayjug[turno-1].numFichas-=1;
            console.log("Se te ha restado una ficha para introducirla en la casilla");
            jugar();
}

function comprobarCasilla(c){
    if(c==12){
        if(arrayjug[turno-1].numFichas=!0){
        arrayjug[turno-1].numFichas+=arraycasi[5].numFichas;
        arraycasi[5].numFichas=0;
        }else{ 
            let cont = 0;
            for(var i = 0; i<arraycasi.length; i++){
                
                cont += arraycasi[i].numFichas;
                arraycasi[i].numFichas=0;
            }
            arrayjug[turno-1].numFichas + cont;
        }
    }
    for(var i = 0; i<arraycasi.length; i++){
        if(c==7){
            arraycasi[5].numFichas++;
            if(arraycasi[5].numFichas==4){
                console.log("Has completado la casilla " + c + " ! Te llevas las " + 4 + " fichas!");
                    arraycasi[5].numFichas=0;
                    arrayjug[turno-1].numFichas+=arraycasi[5].maxFichas;
                    restarFicha();
            }else{
                restarFicha();
            }
        }
        if(arraycasi[i].maxFichas==c){
            arraycasi[i].numFichas++;
                if(arraycasi[i].numFichas==arraycasi[i].maxFichas){
                    console.log("Has completado la casilla " + c + " ! Te llevas las " + c + " fichas!");
                    arraycasi[i].numFichas=0;
                    arrayjug[turno-1].numFichas+=arraycasi[i].maxFichas;
                    restarFicha();
            }   else{
                restarFicha();
            }
        }
    }
}

jugar();