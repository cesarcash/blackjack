let deck = [];
const letras = ['C','D','H','S'];
const especiales = ['A','J','K','Q'];

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

    // console.log(deck);

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
    console.log(carta);
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
console.log({valor});

