import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './pokemon.css';



function PokemonComponent() {
  const [pokemonList, setPokemonList] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [nextUrl, setNextUrl] = useState('');

  useEffect(() => {
    const fetchPokemonList = async () => {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=9');
        if (!response.ok) {
          throw new Error('Error al obtener los datos');
        }
        const data = await response.json();
        setPokemonList(data.results);
        setNextUrl(data.next);
        setIsLoading(false);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchPokemonList();
  }, []);

  const fetchMorePokemon = async () => {
    if (nextUrl) {
      try {
        const response = await fetch(nextUrl);
        if (!response.ok) {
          throw new Error('Error al obtener más Pokémones');
        }
        const data = await response.json();
        setPokemonList(prevPokemonList => [...prevPokemonList, ...data.results]);
        setNextUrl(data.next);
      } catch (error) {
        setError(error.message);
      }
    }
  };

  const fetchPokemonDetails = async (url) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Error al obtener los detalles del Pokémon');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="pokemon-container">
      <h1>Lista de Pokemons</h1>
      <ul className="pokemon-list">
        {pokemonList.map((pokemon, index) => {
          const pokemonDetailsPromise = fetchPokemonDetails(pokemon.url);
          return (
            <PokemonListItem key={index} pokemon={pokemon} pokemonDetailsPromise={pokemonDetailsPromise} />
          );
        })}
      </ul>
      <button className="load-more-button" onClick={fetchMorePokemon}>Ver más</button>
    </div>
  );
}

function PokemonListItem({ pokemon, pokemonDetailsPromise }) {
  const [pokemonDetails, setPokemonDetails] = useState(null);
  const [types, setTypes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const details = await pokemonDetailsPromise;
      setPokemonDetails(details);

      const typesData = details.types.map(async typeObj => {
        const typeResponse = await fetch(typeObj.type.url);
        const typeData = await typeResponse.json();
        return { name: capitalizeFirstLetter(typeData.name) }; 
      });

      Promise.all(typesData)
        .then(types => setTypes(types))
        .catch(error => console.error('Error fetching types:', error));
    };
    fetchData();
  }, [pokemonDetailsPromise]);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  if (!pokemonDetails) {
    return <div>Cargando...</div>;
  }

  return (

      <li className="pokemon-item">
        <span>{`${pokemonDetails.id}. ${pokemonDetails.name}`}</span>
        <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonDetails.id}.png`} alt={pokemonDetails.name} />
        <div>
          {types.map((type, index) => (
            <span key={index} className={`pokemon-type ${type.name.toLowerCase()}`}>{type.name} </span>
          ))}
        </div>
        <Link to={`/pokemon/${pokemonDetails.id}`} style={{ marginTop: '20px', display: 'inline-block' }}>
        <button style={{ fontSize: '14px', padding: '5px 10px' }}>Ver mas</button>
        </Link>
      </li>
    
  );
}

export default PokemonComponent;

