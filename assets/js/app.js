let deck = [];
const letras = ['C','D','H','S'];
const especiales = ['A','J','K','Q'];
let btnPedir = document.querySelector('#btnPedir');
let btnDetener = document.querySelector('#btnDetener');
let btnNuevo = document.querySelector('#btnNuevo');

let sumaHumano = 0, sumaMaquina = 0;
// let small = document.body.children[2].firstElementChild.firstElementChild.firstElementChild;
let small = document.querySelectorAll('small');
let cartasJugador = document.querySelector("#jugador-cartas");
let cartasMaquina = document.querySelector("#maquina-cartas");

const crearDeck = () => {

    for(let i = 2; i <= 10; i++){

        for(let letra in letras){
            deck.push(i+letras[letra]);
        }
        
    }

    for(let letra in letras){

        for(let esp in especiales){

            deck.push(especiales[esp]+letras[letra]);

        }

    }

    // console.log(deck);

    deck = _.shuffle(deck);    

    return deck;

}

crearDeck();

const pedirCarta = ()=>{    
    
    // let newDeck = [...deck];
    // let totalCartas = newDeck.length;
    // let random = Math.trunc(Math.random() * (totalCartas - 0) + 0 );
    // let carta = newDeck[random];    
    // newDeck.splice(random,1);
    // console.log(newDeck);

    if(deck.length === 0){
        throw 'No hay cartas en el deck';
    }

    const carta = deck.pop();
    // console.log(deck);
    // console.log(carta);
    return carta;
    
}

// pedirCarta();

const valorCarta = (carta)=>{
    const valor = carta.substring(0,carta.length - 1);
    return (isNaN(valor)) ?
        valor === 'A' ? 11 : 10 
        : valor * 1; // seria el else de isNaN


    // let puntos = 0;
    // if(isNaN(valor)){
    //     puntos = valor === 'A' ? 11 : 10;
    // }else{        
    //     puntos = valor * 1;//convierte a numero de lo contrario es string
    // }

    // let res = (isNaN(valor)) ? puntos = valor === 'A' ? 11 : 10 : puntos = valor * 1;

}

const valor = valorCarta(pedirCarta());
// console.log({valor});
const turnoMaquina = (puntosMinimo) =>{

    do {

        let carta = pedirCarta();
        
        sumaMaquina += valorCarta(carta);
        small[1].textContent = sumaMaquina;
    
        // cartasJugador.innerHTML += `<img src="assets/cartas/${carta}.png" class="carta">`;
        let nuevaCarta = document.createElement('img');
        nuevaCarta.src = `assets/cartas/${carta}.png`;
        nuevaCarta.classList.add('carta');
        cartasMaquina.append(nuevaCarta);

        if(puntosMinimo > 21){
            break;
        }

    } while ( (sumaMaquina < puntosMinimo) && (puntosMinimo <= 21) );

    setTimeout(() => {
        
        if(puntosMinimo == 21 || puntosMinimo < sumaMaquina){
            alert("Ganaste!!!");
        }else if(puntosMinimo > sumaMaquina){
            alert("Perdiste!!!");
        }else{
            alert("¡Empates!");
        }

    },500);



}

btnPedir.addEventListener('click',(ev)=>{

    // let carta = valorCarta(pedirCarta());
    let carta = pedirCarta();
    
    sumaHumano += valorCarta(carta);
    small[0].textContent = sumaHumano;

    // cartasJugador.innerHTML += `<img src="assets/cartas/${carta}.png" class="carta">`;
    let nuevaCarta = document.createElement('img');
    nuevaCarta.src = `assets/cartas/${carta}.png`;
    nuevaCarta.classList.add('carta');
    cartasJugador.append(nuevaCarta);

    if(sumaHumano > 21){
        console.warn('Looser!!!');
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoMaquina(sumaHumano);
    }else if(sumaHumano === 21){
        console.warn('Ganaste!!!');
        // btnPedir.disabled = false;
        btnPedir.setAttribute('disabled', true);
        btnDetener.disabled = true;
        turnoMaquina(sumaHumano);
    }

});

btnDetener.addEventListener('click',function(){
    this.disabled = true;
    btnPedir.setAttribute('disabled',true);
    turnoMaquina(sumaHumano);
})

btnNuevo.addEventListener('click',()=>{

    deck = [];
    deck = crearDeck();
    
    sumaHumano = 0;
    sumaMaquina = 0;
    cartasJugador.innerHTML = "";
    cartasMaquina.innerHTML = "";
    btnPedir.removeAttribute('disabled');
    btnDetener.removeAttribute('disabled');
    small[0].textContent = '0';
    small[1].textContent = '0';
    
});