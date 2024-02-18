import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import PokemonComponent from './pokemon';
import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import {
  Link
}from "react-router-dom"

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <header class="masthead">
            <div class="container px-4 px-lg-5 h-100 ">
                <div class="row gx-4 gx-lg-5 h-100 align-items-center justify-content-center text-center">
                    <div class="col-lg-8 align-self-end">
                        <h1 class=" font-weight-bold bg-info">Pokedex PokeApi</h1>
                        <hr class="divider" />
                    </div>
                    <div class="col-lg-8 align-self-baseline">
                        <p class="75 mb-5 bg-info">Aplicacion de pokemon realizado con PokeaApi utilizando react</p>
                        
                        <Link to="/pokemon">  <a class="btn btn-primary btn-xl" >Pokemons</a> </Link>
                    </div>
                </div>
            </div>
        </header>
    </>
  )
}

export default App
