let arrayjug = [];
let arraycasi = [];


class Jugador{
    constructor(id,fichasganadas,numFichas){
        this.id=id;
        this.fichasganadas = fichasganadas;
        this.numFichas = numFichas;
    }

     crearJugadores(a){
        for(var i = 1; i<=a; i++){
            let fichas = Math.floor(50/a);
            let jugador = new Jugador(i,0,fichas);
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
const siete = new Casilla(0,300);
const ocho = new Casilla(0,8);
const nueve = new Casilla(0,9);
const diez = new Casilla(0,10);
const once = new Casilla(0,11);
arraycasi.push(dos,tres,cuatro,cinco,seis,siete,ocho,nueve,diez,once);

const jug = new Jugador(0,0);
let num = 0;
let rondaFinal= false;
function jugar(){
    if(num==0){
        do{
            num = prompt("¿Cuantos jugadores van a jugar?");
        }while(num<2||num>5);
        jug.crearJugadores(num);
    }
    cambiarTurno(num);
    comprobarFichas();
    tirarDados();
    
}

function rondafinal(){
    if(rondaFinal==false){
    console.log("Ya no te quedan fichas, tirar dado y recoger fichas hasta vaciar tablero");
    rondaFinal=true;
    }
}

let turno = -1;

function cambiarTurno(b){
    turno++;
    if(turno>=b){
        turno=0;
    }
    let contador = 0;
    for(var i = 0; i<arraycasi.length; i++){ 
        contador += arraycasi[i].numFichas;
    }
    if(contador==0&&arrayjug[turno].numFichas==0){
        fin();
        return false;
    }
    console.log("Tablero");
    for(let i=0; i<arraycasi.length; i++){
        console.log("Casilla "+ (i+2) + " : " + arraycasi[i].numFichas);
    }
    console.log("Turno del jugador " + (turno +1));
    console.log(arrayjug[turno]);

}



function tirarDados(){
    if(final==false){
        let dado1 = Math.round(Math.random()* (5)+1);
        let dado2 = Math.round(Math.random() * (5)+1);
        let suma = dado1+dado2;
        console.log("Has sacado " + dado1 + " y " + dado2 + " que suman " + suma);
        comprobarCasilla(suma);
    }
}

function restarFicha(){
        arrayjug[turno].numFichas-=1;
        console.log("Se te ha restado una ficha para introducirla en la casilla");
}

function comprobarFichas(){
    if(arrayjug[turno].numFichas==0){
        rondafinal();
        return false;
    }else{
        return true;
    }
}

function comprobarCasilla(c){
    if(rondaFinal==true){
        if(c==12){
            let cont = 0;
            for(var i = 0; i<arraycasi.length; i++){ 
                cont += arraycasi[i].numFichas;
                arraycasi[i].numFichas=0;
            }
            console.log("Te has llevado todas las fichas");
            arrayjug[turno].fichasganadas += cont;
            fin();
            
        }else{
            if(final==false){
                if(arraycasi[c-2].numFichas!=0){
                console.log("Te has llevado las " + arraycasi[c-2].numFichas + " fichas de la casilla " + c);
                arrayjug[turno].fichasganadas+=arraycasi[c-2].numFichas;
                arraycasi[c-2].numFichas=0;
                }else{
                    console.log("Ya no hay fichas en la casilla " + c);
                }
                jugar();
            }
        }
        
    }else{ 
        if(c==12){
            arrayjug[turno].fichasganadas+=arraycasi[5].numFichas;
            arraycasi[5].numFichas=0;
            console.log("Te has llevado las fichas del puchero");
            jugar();
        }else{
        arraycasi[c-2].numFichas++;
        }
        for(let i = 0; i<arraycasi.length; i++){
            if(c==7&&final==false){
                restarFicha();
                
                jugar();
            }
            if(arraycasi[i].maxFichas==c&&final==false){
                    if(arraycasi[i].numFichas==arraycasi[i].maxFichas){
                        restarFicha();
                        console.log("Has completado la casilla " + c + " ! Te llevas las " + c + " fichas!");
                        arrayjug[turno].fichasganadas+=arraycasi[i].maxFichas;
                        arraycasi[i].numFichas=0;
                        jugar();
                        return false;

                }   else{
                    restarFicha();
                    jugar();
                    return false;
                }
            }
            
        }
    }
}
let ganador=0;
let final=false;
function fin(){
    let fich = 0;
    for(var i=0;i<arrayjug.length;i++){
        if(arrayjug[i].fichasganadas>fich){
            fich=arrayjug[i].fichasganadas;
            ganador=i;
        }
    }
    console.log("Ha ganado el jugador " + arrayjug[ganador].id + " con " + arrayjug[ganador].fichasganadas + " fichas");
    final=true;
    return false;
}

if(final==false){
jugar();
}