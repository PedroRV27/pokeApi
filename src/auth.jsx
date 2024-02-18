import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Importa useNavigate
import { FirebaseConf } from './firebase.jsx';
import { getAuth, onAuthStateChanged } from "firebase/auth";

const Logged = ({ componente: Componente }) => { // Usa destructuración para obtener Componente desde los props
  const navigate = useNavigate(); // Usa useNavigate para la navegación
  
  const [isLogged, setIsLogged] = React.useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FirebaseConf.auth, (user) => {
      if (user) {
        setIsLogged(true);
      } else {
        setIsLogged(false);
        // Redirigir al usuario a la página de inicio de sesión
        navigate('/login');
      }
    });
    return () => {
      unsubscribe();
    }
  }, []);

  return isLogged ? <Componente/> : null; // Retorna null si el usuario no está autenticado
};

export default Logged;
