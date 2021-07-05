const miApp = (()=>{//PATRÓN MÓDULO

    'use strict';

    let deck = [];
    
    const letras = ['C','D','H','S'], 
    especiales = ['A','J','K','Q'];    
    
    let puntosJugadores = [];

    const btnPedir = document.querySelector('#btnPedir'),
          btnDetener = document.querySelector('#btnDetener'),
          btnNuevo = document.querySelector('#btnNuevo');
          
    const cartasJugadores = document.querySelectorAll('.divCartas'),
            puntosHTML = document.querySelectorAll('small');              
    
    const iniciarJuego = (numJugadores = 2)=>{
        
        deck = crearDeck();
        puntosJugadores = [];        

        for(let i = 0; i < numJugadores; i++){
            puntosJugadores.push(0);
        }
        
        puntosHTML.forEach( element => element.innerText = 0);
        cartasJugadores.forEach( element => element.innerHTML = '');        
        
        btnPedir.removeAttribute('disabled');
        btnDetener.removeAttribute('disabled');        

    }
    
    const crearDeck = () => {

        deck = [];
    
        for(let i = 2; i <= 10; i++){
            for(let letra of letras){
                deck.push(i+letra);
            }
        }
    
        for(let letra of letras){
    
            for(let esp of especiales){
                deck.push(esp + letra);    
            }
    
        }
    
        return _.shuffle(deck);
    
    }
        
    const pedirCarta = ()=>{
    
        if(deck.length === 0){
            throw 'No hay cartas en el deck';
        }
     
        return deck.pop();
        
    }
    
    const valorCarta = (carta)=>{
        const valor = carta.substring(0,carta.length - 1);
        return (isNaN(valor)) ? (valor === 'A') ? 11 : 10 : valor * 1; // seria el else de isNaN
    }

    const acumularPuntos = (carta,turno) =>{
        puntosJugadores[turno] = puntosJugadores[turno] + valorCarta(carta);
        puntosHTML[turno].innerText = puntosJugadores[turno];
        return puntosJugadores[turno];
    }
    
    const crearCarta = (carta,turno) => {
        let nuevaCarta = document.createElement('img');
            nuevaCarta.src = `assets/cartas/${carta}.png`;
            nuevaCarta.classList.add('carta');
            console.log(cartasJugadores);
            cartasJugadores[turno].append(nuevaCarta);
    }

    const determinarGanador = () => {

        const [puntosMinimos, puntosComputadora] = puntosJugadores;

        setTimeout(() => {                    

            if(puntosMinimos == 21 || puntosComputadora > 21){
                alert("Ganaste!!!");
            }else if(puntosMinimos > puntosComputadora || puntosComputadora == 21){
                alert("Perdiste!!!");
            }else{
                alert("¡Empates!");
            }
    
        },500);

    }

    const turnoMaquina = (puntosMinimos) =>{
    
        let puntosComputadora = 0;

        do {
    
            let carta = pedirCarta();            
            puntosComputadora = acumularPuntos(carta,puntosJugadores.length - 1);
            crearCarta(carta,puntosJugadores.length - 1);
            
            
    
        } while ( (puntosComputadora < puntosMinimos) && (puntosMinimos <= 21) );
    
        determinarGanador();
    
    }
    
    btnPedir.addEventListener('click',()=>{
        
        const carta = pedirCarta();
        const puntosJugador = acumularPuntos(carta,0);

        crearCarta(carta,0);                
    
        if(puntosJugador > 21){
            console.warn('Looser!!!');
            btnPedir.setAttribute('disabled',true);
            btnDetener.setAttribute('disabled',true);
            turnoMaquina(puntosJugador);
        }else if(puntosJugador === 21){
            console.warn('Ganaste!!!');        
            btnPedir.setAttribute('disabled', true);
            btnDetener.setAttribute('disabled', true);
            turnoMaquina(puntosJugador);
        }
    
    });
    
    btnDetener.addEventListener('click',function(){
        this.setAttribute('disabled',true);
        btnPedir.setAttribute('disabled',true);
        turnoMaquina(puntosJugadores[0]);
    });
    
    return {
        nuevoJuego: iniciarJuego
    };

})();