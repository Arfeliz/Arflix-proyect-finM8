import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/navbar.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, logout } = useAuth(); //
  const navigate = useNavigate();

  // Cambia el color del fondo al bajar la página
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout(); //
    navigate('/login');
  };

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <Link to="/" className="nav-logo">NETFLIX</Link>

      <div className="nav-links">
        {user ? (
          <>
            <Link to="/" className="nav-item hide-mobile">Inicio</Link>
            <Link to="/upload" className="nav-item">Subir Película</Link>
            <button onClick={handleLogout} className="logout-btn">
              Cerrar Sesión
            </button>
          </>
        ) : (
          <Link to="/login" className="logout-btn">Iniciar Sesión</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;