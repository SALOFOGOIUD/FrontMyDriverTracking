import axios from 'axios';


const API_URL = 'http://localhost:4000/api/auth';

// Guardar en localStorage
const saveAuthData = (data) => {
  if (data.token && data.usuario) {
    localStorage.setItem('token', data.token);
    localStorage.setItem('usuario', JSON.stringify(data.usuario));
  }
};

// Login con email y clave (password)
export const login = async (email, password) => {
  const response = await axios.post(`${API_URL}/login`, { email, clave: password });
  saveAuthData(response.data);
  return response.data;
};

// Registro de usuario (espera { email, nombre, clave })
export const register = async ({ email, nombre, password }) => {
  const response = await axios.post(`${API_URL}/registro`, { email, nombre, clave: password });
  saveAuthData(response.data);
  return response.data;
};

// Login con Google (espera { idToken })
export const loginWithGoogle = async (idToken) => {
  const response = await axios.post(`${API_URL}/google`, { idToken });
  saveAuthData(response.data);
  return response.data;
};

// Logout: para limpiar localStorage si quieres
export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('usuario');
    window.location.reload();
};

// Obtener token guardado
export const getToken = () => localStorage.getItem('token');

// Obtener usuario guardado
export const getUsuario = () => {
  const user = localStorage.getItem('usuario');
  return user ? JSON.parse(user) : null;
};
