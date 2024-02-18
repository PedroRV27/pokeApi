import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './DetallePokemon.css';

function DetallePokemon() {
  const { id } = useParams(); 

  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then(response => response.json())
      .then(data => {
        setPokemon(data);
        setLoading(false);
      })
      .catch(error => console.log('Error fetching data', error));
  }, [id]);

  const primerMayuscula = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <main className='container main-pokemon'>
      {loading ? (
        <p>Cargando...</p>
      ) : (
        <>
          <div className='header-main-pokemon'>
            <span className='number-pokemon'>#{pokemon.id}</span>
            <div className='container-img-pokemon'>
              <img
                src={pokemon.sprites.front_default} alt={pokemon.name}
              />
            </div>
            <div className='container-info-pokemon'>
              <h1>{primerMayuscula(pokemon.name)}</h1>
              <div className='card-types info-pokemon-type'>
                {pokemon.types.map(type => (
                  <span key={type.type.name} className={`${type.type.name}`}>
                    {type.type.name}
                  </span>
                ))}
              </div>
              <div className='info-pokemon'>
                <div className='group-info'>
                  <p>Altura</p>
                  <span>{pokemon.height}</span>
                </div>
                <div className='group-info'>
                  <p>Peso</p>
                  <span>{pokemon.weight}KG</span>
                </div>
              </div>
            </div>
          </div>

          <div className='container-stats'>
            <h1>Estadísticas</h1>
            <div className='stats'>
              {pokemon.stats.map((stat, index) => (
                <div className='stat-group' key={index}>
                  <span>{stat.stat.name}</span>
                  <div className='progress-bar'></div>
                  <span className='counter-stat'>{stat.base_stat}</span>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </main>
  );
}

export default DetallePokemon;
