import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import PokemonComponent from './pokemon.jsx'
import Navegacion from './navegacion.jsx'
import Login from './Login.jsx'
import Juego from './juego.jsx'
import DetallePokemon from './detallePokemon.jsx';
import Auth from './auth.jsx';
import Register from './register.jsx'



import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element:<>
    <Navegacion></Navegacion>
    <App></App>
    </>,
    errorElement:<h1>Ruta no valida</h1>
  },
  {
    path: "/pokemon",
    element: <>
    <Navegacion></Navegacion>
    <PokemonComponent></PokemonComponent>
    </>,
  },
  {
    path: "/register",
    element: <>
    <Navegacion></Navegacion>
    <Register></Register>
    </>
  },
  {
    path: "/login",
    element: <>
    <Navegacion></Navegacion>
    <Login></Login>
    </>,
  },
  {
    path: "/juego",
    element: <>
      <Navegacion></Navegacion>
      <Auth componente={Juego}/>
    </>
  },
  {
    path: "/pokemon/:id",
    element: <>
    <Navegacion></Navegacion>
    <DetallePokemon></DetallePokemon>
    </>,
  }

]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
