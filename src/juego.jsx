import React, { useState, useEffect } from 'react';

const App = () => {
  const [pokemon, setPokemon] = useState(null);
  const [tipoSeleccionado, setTipoSeleccionado] = useState('');
  const [resultado, setResultado] = useState('');
  const [contadorAciertos, setContadorAciertos] = useState(0);
  const [intentos, setIntentos] = useState(3); 

  useEffect(() => {
    obtenerPokemon();
  }, []);

  const obtenerPokemon = async () => {
    try {
      const respuesta = await fetch('https://pokeapi.co/api/v2/pokemon?limit=9');
      const data = await respuesta.json();
      const listaPokemon = data.results;
      const indiceAleatorio = Math.floor(Math.random() * listaPokemon.length);
      const respuestaPokemon = await fetch(listaPokemon[indiceAleatorio].url);
      const infoPokemon = await respuestaPokemon.json();
      setPokemon(infoPokemon);
    } catch (error) {
      console.error('Error al obtener el Pokémon:', error);
    }
  };

  const manejarSeleccionTipo = (tipo) => {
    if (tipo === obtenerTipoEfectivo()) {
      setResultado('¡Has ganado!');
      setContadorAciertos(contadorAciertos + 1);
    } else {
      setResultado('¡Has perdido! Inténtalo de nuevo.');
      setIntentos(intentos - 1);
      if (intentos === 0) {
        setResultado('¡Has perdido! No quedan intentos. Reinicia el juego.');
      }
    }
    if (intentos > 0) {
      obtenerPokemon();
    }
  };

  const obtenerTipoEfectivo = () => {
    if (pokemon && pokemon.types && pokemon.types.length > 0) {
      switch (pokemon.types[0].type.name) {
        case 'fire':
          return 'water';
        case 'water':
          return 'grass';
        case 'grass':
          return 'fire';
        default:
          return '';
      }
    }
    return '';
  };

  const reiniciarJuego = () => {
    setIntentos(3);
    setContadorAciertos(0);
    setResultado('');
    obtenerPokemon();
  };

  return (
    <div className="App">
      {pokemon && (
        <div>
          <h1>ATACA A SU DEBILIDAD</h1>
          <h2>{pokemon.name}</h2>
          <img
            src={pokemon.sprites.front_default}
            alt={pokemon.name}
          />
          <div>
            <button onClick={() => manejarSeleccionTipo('fire')} disabled={intentos === 0}  style={{
              backgroundColor: '#EE8130',
              color: 'white',
              borderRadius: '5px',
              marginRight: '5px',
              textShadow: '2px 2px 4px #000000',
              padding: '5px'
            }} >Fuego</button>
            <button onClick={() => manejarSeleccionTipo('water')} disabled={intentos === 0} style={{
              backgroundColor: '#6390F0',
              color: 'white',
              borderRadius: '5px',
              marginRight: '5px',
              textShadow: '2px 2px 4px #000000',
              padding: '5px'
            }}>Agua</button>
            <button onClick={() => manejarSeleccionTipo('grass')} disabled={intentos === 0}style={{
              backgroundColor: '#7AC74C',
              color: 'white',
              borderRadius: '5px',
              marginRight: '5px',
              textShadow: '2px 2px 4px #000000',
              padding: '5px'
            }}>Planta</button>
          </div>
          <div id="resultado">{resultado}</div>
          <div>Intentos restantes: {intentos}</div>
          <div>Aciertos: {contadorAciertos}</div>
          <button onClick={reiniciarJuego}>Reiniciar Juego</button>
        </div>
      )}
    </div>
  );
};

export default App;


