import React, { useEffect } from 'react';
import { Link } from 'react-router-dom'; 
import { FirebaseConf } from './firebase.jsx';
import { getAuth, onAuthStateChanged } from "firebase/auth";

function Navegacion (){
    const [isLogged, setIsLogged] = React.useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FirebaseConf.auth, (user) => {
      if (user) {
        setIsLogged(true);
      } else {
        setIsLogged(false);
      }
    });
    return () => {
      unsubscribe();
    }
  },[])

  const handleLogout = () => {
    FirebaseConf.auth.signOut() 
      .then(() => {
        console.log('Se cerró sesión exitosamente.');
      })
      .catch((error) => {
        console.error('Error al cerrar sesión:', error.message);
      });
  };

    return (
      <nav className="navbar navbar-expand-lg navbar-light fixed-top py-3" id="mainNav">
          <div className="container px-4 px-lg-5">
              <Link className="navbar-brand" to="/">Pokedex</Link>
              <button className="navbar-toggler navbar-toggler-right" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarResponsive">
                  <ul className="navbar-nav ms-auto my-2 my-lg-0">
                      <li className="nav-item"><Link className="nav-link" to="/">Inicio</Link></li>
                      <li className="nav-item"><Link className="nav-link" to="/pokemon">Pokedex</Link></li>
                      {!isLogged ? (
                          <>
                              <li className="nav-item">
                                  <Link className="nav-link " to="/login">Iniciar Sesión</Link>
                              </li>
                              <li className="nav-item">
                                  <Link className="nav-link " to="/register">Registro</Link>
                              </li>
                          </>
                      ) : (
                          <li className="nav-item">
                              <Link className="nav-link " to="/juego">Juego</Link>
                          </li>
                      )}
                  </ul>
                  {isLogged ? (
                      <button className="btn btn-outline" onClick={handleLogout}>Cerrar Sesión</button>
                  ) : null}
              </div>
          </div>
      </nav>
  );
                  }

export default Navegacion