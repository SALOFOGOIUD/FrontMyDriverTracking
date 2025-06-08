import { useNavigate } from 'react-router-dom';
import logo from '../utils/logo.png'; // Ajusta la ruta según tu proyecto
import { logout } from '../services/authService';
import '../styles/Navbar.css';

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo" onClick={() => navigate('/dashboard')}>
        <img src={logo} alt="Logo" />
      </div>

      <div className="navbar2">
        <button className="navbar-button dashboard-button" onClick={() => navigate('/dashboard')}>
          Home
        </button>

        <button className="navbar-button logout-button" onClick={handleLogout}>
          Cerrar sesión
        </button>
      </div>
    </nav>
  );
}

export default Navbar;

