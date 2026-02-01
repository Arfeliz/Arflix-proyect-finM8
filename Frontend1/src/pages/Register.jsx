import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/axios';
import '../styles/auth.css';

const Register = () => {
    const [formData, setFormData] = useState({ username: '', email: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/auth/register', formData); //
            navigate('/login');
        } catch (err) {
            setError(err.response?.data?.message || 'Error al registrarse');
        }
    };

    return (
        <div className="auth-container">
            <form onSubmit={handleSubmit} className="auth-form">
                <h1>Registrarse</h1>
                {error && <p className="error-msg">{error}</p>}
                <input 
                    type="text" placeholder="Usuario" className="auth-input"
                    onChange={(e) => setFormData({...formData, username: e.target.value})} required
                />
                <input 
                    type="email" placeholder="Email" className="auth-input"
                    onChange={(e) => setFormData({...formData, email: e.target.value})} required
                />
                <input 
                    type="password" placeholder="Contraseña" className="auth-input"
                    onChange={(e) => setFormData({...formData, password: e.target.value})} required
                />
                <button type="submit" className="auth-button">Unirse ahora</button>
                <p className="auth-footer">
                    ¿Ya tienes cuenta? <Link to="/login">Inicia sesión aquí.</Link>
                </p>
            </form>
        </div>
    );
};

export default Register;