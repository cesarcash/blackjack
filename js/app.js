import { shuffle } from './shuffle.js'

// const miModulo = (() => {
(() => {

    'use strict'

    let deck = []
    const tipo = ['C','D','H','S'], especiales = ['A','J','Q','K']
    
    let puntosJugadores = []
    
    const btnPedir = document.querySelector('#btnPedir'), btnDetener = document.querySelector('#btnDetener'), btnNuevo = document.querySelector('#btnNuevo'), divCartasJugadores = document.querySelectorAll('.divCartas'), puntosHTML = document.querySelectorAll('small')

    const inicializarJuego = (numJugadores = 2) => {
        deck = crearDeck()

        puntosJugadores = []
        for(let i = 0; i < numJugadores; i++){
            puntosJugadores.push(0)
        }

        puntosHTML.forEach(item => item.textContent = 0 )
        divCartasJugadores.forEach(item => item.innerHTML = '')

        btnPedir.disabled = false
        btnDetener.disabled = false

    }

    const crearDeck = () => {

        deck = [];
    
        for( let i = 2; i <= 10; i++ ){
            tipo.forEach((item,index) => {
                deck.push(i + item)
            })
        }

        tipo.forEach( itemTipo =>  {
            especiales.forEach( itemEspeciales => {
                deck.push(itemEspeciales + itemTipo)
            })
        })
        
        return shuffle(deck)

    }
    
    const pedirCarta = () => {
    
        if(deck.length === 0){
            throw 'No hay mas cartas disponibles'
        }
    
        return deck.pop();        
    
    }

    const valorCarta = (carta) => {
    
        const valor = carta.substring(0, carta.length - 1)
        return isNaN(valor) ? (valor === 'A' ? 11 : 10 ) : +valor;
    
    }

    const acumularPuntos = (carta,turno) => {

        puntosJugadores[turno] += valorCarta(carta)
        puntosHTML[turno].textContent = puntosJugadores[turno]
        return puntosJugadores[turno]

    }

    const crearCarta = (carta, turno) => {

        const imgCarta = document.createElement('img')
        imgCarta.src = `./images/${carta}.png`
        imgCarta.classList.add('carta')
        divCartasJugadores[turno].append(imgCarta)

    }

    const determinarGanador = () => {

        const [puntosMinimos, puntosComputadora] = puntosJugadores;

        setTimeout(() => {
    
            if(puntosComputadora === puntosMinimos){
                alert('Nadie gana')
            }else if( puntosMinimos > 21 ){
                alert('Computadora gana')
            }else if(puntosComputadora > 21){
                alert('Ganaste')
            }else {
                alert('Computadora gana')
            }
    
        }, 40 );
    }
    
    const turnoComputadora = (puntosMinimos) => {

        let puntosComputadora = 0

        do {
            
            const carta = pedirCarta()
            puntosComputadora = acumularPuntos(carta,puntosJugadores.length - 1)
            crearCarta(carta, puntosJugadores.length - 1)
            
        }while( (puntosComputadora < puntosMinimos) && (puntosMinimos <= 21 ) )

        determinarGanador()
    
    }
    
    btnPedir.addEventListener('click', (e) => {
    
        const carta = pedirCarta()
        const puntosJugador = acumularPuntos(carta, 0)

        crearCarta(carta, 0)
    
        if(puntosJugador > 21) {
            e.target.disabled = true
            btnDetener.disabled = true
            turnoComputadora(puntosJugador)
        }else if(puntosJugador === 21){
            e.target.disabled = true
            btnDetener.disabled = true
            turnoComputadora(puntosJugador)
        }
    
    })
    
    btnDetener.addEventListener('click', (e) => {
        btnPedir.disabled = true
        e.target.disabled = true
        turnoComputadora(puntosJugadores[0])
    })
    
    btnNuevo.addEventListener('click', e => {
        inicializarJuego();
    })

    // return {
    //     nuevoJuego: inicializarJuego
    // };
    
})();
