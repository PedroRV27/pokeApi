import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { Navigate, useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUpWithEmailAndPassword = () => {
    const authInstance = getAuth();
    createUserWithEmailAndPassword(authInstance, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        navigate('/pokemon');
      })
      .catch((error) => {
        console.error('Error al registrar la cuenta:', error.message);
      });
  };

  return (
    <div className="container mt-30">
      <div className="row justify-content-center">
        <div className="col-md-40">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">Registro</h2>
              <form>
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
                <div className="d-grid gap-2">
                  <button type="button" className="btn btn-primary" onClick={handleSignUpWithEmailAndPassword}>
                    Registrarse con correo y contraseña
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
