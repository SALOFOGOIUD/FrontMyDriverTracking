import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Auth/Login';
import Dashboard from './pages/vehiculos/Dashboard';
import Vehicles from './pages/vehiculos/Vehicles';
import { getToken } from './services/authService';
import './App.css';

// Componente que protege rutas privadas
function PrivateRoute({ children }) {
  const token = getToken();
  return token ? children : <Navigate to="/login" replace />;
}

function App() {
  const isLoggedIn = Boolean(getToken());

  return (
    <Router>
      {isLoggedIn && <Navbar />}
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={isLoggedIn ? <Navigate to="/dashboard" /> : <Login />}/>
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/vehicles/:plate" element={<PrivateRoute><Vehicles /></PrivateRoute>}/>
      </Routes>
    </Router>
  );
}

export default App;
