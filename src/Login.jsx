import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword, signOut, GoogleAuthProvider, GithubAuthProvider, signInWithPopup } from 'firebase/auth';
import { Navigate, useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const authInstance = getAuth(); 
  const navigate = useNavigate();
  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();

  const handleSignInWithEmailAndPassword = () => {
    signInWithEmailAndPassword(authInstance, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        navigate('/pokemon');
      })
      .catch((error) => {
        console.error('Error iniciando sesión:', error.message);
      });
  };

  const handleSignOut = () => {
    signOut(authInstance)
      .then(() => {
        console.log('Usuario desconectado');
      })
      .catch((error) => {
        console.error('Error cerrando sesión:', error.message);
      });
  };

  const handleSignInWithGoogle = () => {
    signInWithPopup(authInstance, googleProvider)
      .then((result) => {
        navigate('/pokemon');
      })
      .catch((error) => {
        console.error('Error iniciando sesión con Google:', error.message);
      });
  };

  const handleSignInWithGithub = () => {
    signInWithPopup(authInstance, githubProvider)
      .then((result) => {
        navigate('/pokemon');
      })
      .catch((error) => {
        console.error('Error iniciando sesión con GitHub:', error.message);
      });
  };

  return (
    <div className="container mt-30">
      <div className="row justify-content-center">
        <div className="col-md-40">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title text-center">Inicio de Sesión</h2>
              {user ? (
                <button className="btn btn-danger d-block mx-auto" onClick={handleSignOut}>
                  Cerrar sesión
                </button>
              ) : (
                <div>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">Correo Electrónico:</label>
                    <input 
                      type="email" 
                      id="email" 
                      className="form-control" 
                      value={email} 
                      onChange={(e) => setEmail(e.target.value)} 
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">Contraseña:</label>
                    <input 
                      type="password" 
                      id="password" 
                      className="form-control" 
                      value={password} 
                      onChange={(e) => setPassword(e.target.value)} 
                    />
                  </div>
                  <button className="btn btn-primary d-block mx-auto mb-3" onClick={handleSignInWithEmailAndPassword}>
                    Iniciar sesión con correo y contraseña
                  </button>
                  <button className="btn btn-danger d-block mx-auto mb-3" onClick={handleSignInWithGoogle}>
                    Iniciar sesión con Google
                  </button>
                  <button className="btn btn-dark d-block mx-auto" onClick={handleSignInWithGithub}>
                    Iniciar sesión con GitHub
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
