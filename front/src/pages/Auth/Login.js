import { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import '../../styles/Login.css';
import logo from '../../utils/logo.png';
import { login, loginWithGoogle, register } from '../../services/authService';

function Login() {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nombre, setNombre] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!validateEmail(email)) {
      setError('Por favor, ingresa un correo válido.');
      return;
    }
    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres.');
      return;
    }
    if (isRegister && nombre.trim().length < 2) {
      setError('Por favor, ingresa un nombre válido.');
      return;
    }

    setLoading(true);

    try {
      if (isRegister) {
        await register({ email, clave: password, nombre });
      } else {
        await login(email, password); // ✅ Aquí se corrigió
      }
      window.location.reload();
    } catch (err) {
      const msg = err.response?.data?.message || 'Error de autenticación';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLoginSuccess = async (credentialResponse) => {
    setLoading(true);
    setError('');
    try {
      await loginWithGoogle(credentialResponse.credential);
      window.location.reload();
    } catch (err) {
      setError('Error al iniciar sesión con Google.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLoginError = () => {
    setError('Fallo al iniciar sesión con Google.');
  };

  const isFormValid =
    validateEmail(email) &&
    password.length >= 6 &&
    (isRegister ? nombre.trim().length >= 2 : true);

  return (
    <>
      <div className="login-container2">
        <img src={logo} alt="Logo" className="login-logo" />
      </div>

      <div className="login-container2">
        <div className="login-container">
          <h2 className="login-title">{isRegister ? 'Crear cuenta' : 'Iniciar sesión'}</h2>

          <form onSubmit={handleSubmit} className="login-form">
            {isRegister && (
              <input
                type="text"
                placeholder="Nombre completo"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
                className="login-input"
                disabled={loading}
              />
            )}

            <input
              type="email"
              placeholder="Correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="login-input"
              disabled={loading}
            />

            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="login-input"
              disabled={loading}
            />

            {error && <div className="login-error">{error}</div>}

            <button
              type="submit"
              disabled={!isFormValid || loading}
              className={`login-button ${isFormValid && !loading ? 'active' : 'disabled'}`}
            >
              {loading ? 'Cargando...' : isRegister ? 'Registrarse' : 'Iniciar sesión'}
            </button>
          </form>

          <div className="login-divider">o</div>

          <GoogleLogin onSuccess={handleGoogleLoginSuccess} onError={handleGoogleLoginError} />

          <p className="login-toggle">
            {isRegister ? '¿Ya tienes cuenta?' : '¿No tienes cuenta?'}{' '}
            <span onClick={() => setIsRegister(!isRegister)} className="login-link">
              {isRegister ? 'Inicia sesión' : 'Regístrate'}
            </span>
          </p>
        </div>
      </div>
    </>
  );
}

export default Login;
