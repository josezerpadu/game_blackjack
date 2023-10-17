// Modulo de partron

    (() => {  
        'use strict'

    let   deck       = [];
    const tipos      = ['C', 'D', 'H', 'S'],
          especiales = ['A', 'J', 'Q', 'K'];
    
    let puntosJugadores = [];
    
    // Referencias HTML
    const btnpedir      = document.querySelector('#btn-pedir');
    let   valorSmall    = document.querySelectorAll('small'),
          btnDetener    = document.querySelector('#btn-detener');
    let      btnNuevoJuego = document.querySelector('#btn-nuevo');
    
    const divCartaJugador     = document.querySelectorAll('.divCartas'),
          divCartaComputadora = document.querySelector('#computadora-cartas');
    
    // Esta funcion inicializa el juego
    const inicializarJuego = ( numJugadores = 2 ) => {
         deck = creaDeck();
        for( let i = 0; i< numJugadores; i++ ) {
            puntosJugadores.push(0);
        }

    }

    // Esta funcion crea una nueva baraja
    const creaDeck = () => {
        
        deck = [];
        for ( let i = 2; i <= 10; i++ ){
           for ( let tipo of tipos ){
                deck.push( i + tipo ); 
           }     
        }
    
        for( let tipo of tipos ){
            for( let esps of especiales ){
                deck.push( esps + tipo ); 
            }
        }
        return _.shuffle( deck ); 
    }
    
    // Esta funcion me permite tomar una carta
    const pedirCarta = () => {
    
        if ( deck.length === 0 ) {
            throw 'No hay mas cartas';
        };
        return deck.pop();  
    }
    
    // Esta funcion sirve para obtener el valode la carta
    const valorCarta = (carta) => {
        const valor = carta.substring(0, carta.length - 1);
          return (isNaN (valor) ) ? 
                    ( valor === 'A' ) ? 11 : 10 
                    : valor * 1;                   
    };
    
    // Imprimira un alert en pantalla de los resultados del juego, esto se ejecuta al final de juego.
  /*  const mensajeFinal = () => {
    
        setTimeout(() =>{
    
            if ( ( puntosComputadora === puntosJugador )) {
                alert( 'Has empatado, nadie gana!' );
        
            }else if ( puntosJugador < puntosComputadora && puntosComputadora <= 21 ){
                alert( 'Has perdido la computadora ha ganado' );
    
            }else if( puntosJugador > puntosComputadora && puntosJugador <= 21 ){
                alert( 'Has ganado coño!!!' );
    
            }else if ( puntosComputadora > 21 ) {
                alert( 'Has ganado coño!!!' );
    
            }else {
                alert( 'Has perdido la computadora ha ganado' );
            }
    
        }, 400);
        
    }*/

// Turno: en la posiccion 0 = Jugador y el ultimo sera la computadora
    const acumularPuntos = ( carta, turno ) => {

        puntosJugadores[turno] = puntosJugadores[turno] + valorCarta( carta );
        valorSmall[turno].innerText = puntosJugadores[turno];
        return puntosJugadores[turno];
    }
     
    // Turno computadora
    const turnoComputadora = (puntosMinimos) => {
    
        do {
            const carta = pedirCarta();

            acumularPuntos( carta, puntosJugadores.length - 1 );

            const imgCarta = document.createElement("img"); 
            // Le asigno la imagen con la ruta src
            imgCarta.src = `assets/cartas/${ carta }.png`;
            // Le asigno la clase que tiene los estilos
            imgCarta.className = 'carta'
            // Aca agrego la carta al navegador 
            divCartaComputadora.appendChild( imgCarta );
    
            if ( puntosMinimos > 21 ){
                break;
            }
    
        } while( (turnoComputadora < puntosMinimos) && (puntosMinimos <= 21) );
    
       // mensajeFinal()
    };
    
    // Eventos turno del jugador
    btnpedir.addEventListener('click', () => {
        // aca al dar click pedir carta, la const carta va a tomar ese valor y luego imprimimos en naveg
        const carta = pedirCarta();
        const puntosJugador = acumularPuntos( carta, 0 );
        

        // Aca imprimimos la carta en el navegador
        // Creo la carta
        const imgCarta = document.createElement("img"); 
        // Le asigno la imagen con la ruta src
        imgCarta.src = `assets/cartas/${ carta }.png`;
        // Le asigno la clase que tiene los estilos
        imgCarta.className = 'carta';
        // Aca agrego la carta al navegador 
        divCartaJugador.appendChild( imgCarta );
    
        // Controlando boton btnpedir
        if ( puntosJugadores > 21 ) {
            console.warn('Lo siento perdiste');
            btnpedir.disabled  = true;
            btnDetener.disabled = true;
            turnoComputadora( puntosJugadores );
    
        }else if ( puntosJugadores === 21 ) {
            console.warn('21, Genial');
            btnpedir.disabled   = true;
            btnDetener.disabled = true;
            turnoComputadora( puntosJugadores );
        }
    
    } );
    
    // Evento btnDetener
    btnDetener.addEventListener('click', () => {
       
        btnpedir.disabled   = true;
        btnDetener.disabled = true
    
        turnoComputadora( puntosJugadores );
    });
    
    // Evento de reinicio de juego bloqueado
    /*btnNuevoJuego.addEventListener('click', () =>{
    
        location.reload();
        
    });*/
    
    // Evento de reinicio de juego activo
    btnNuevoJuego.addEventListener('click', () => {
        
        //deck = [];
        //creaDeck();

        inicializarJuego();
    
        //puntosComputadora = 0;
        //puntosJugador     = 0;
    
        valorSmall[0].textContent  = 0;
        valorSmall[1].textContent  = 0;
    
        divCartaJugador.textContent     = '';
        divCartaComputadora.textContent = '';
    
        btnDetener.disabled = false;
        btnpedir.disabled   = false;
    
    });
    

})();








