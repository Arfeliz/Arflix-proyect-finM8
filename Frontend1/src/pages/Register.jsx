import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { styles } from '../style/style.js';
import api from '../api/axios';

const Register = () => {
    const [formData, setFormData] = useState({ username: '', email: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/auth/register', formData);
            navigate('/login'); // Redirigir al login tras éxito
        } catch (err) {
            setError(err.response?.data?.message || 'Error al registrarse');
        }
    };

    return (
        <div style={styles.container}>
            <form onSubmit={handleSubmit} style={styles.form}>
                <h1 style={{ marginBottom: '20px' }}>Registrarse</h1>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <input 
                    type="text" placeholder="Usuario" style={styles.input}
                    onChange={(e) => setFormData({...formData, username: e.target.value})} 
                />
                <input 
                    type="email" placeholder="Email" style={styles.input}
                    onChange={(e) => setFormData({...formData, email: e.target.value})} 
                />
                <input 
                    type="password" placeholder="Contraseña" style={styles.input}
                    onChange={(e) => setFormData({...formData, password: e.target.value})} 
                />
                <button type="submit" style={styles.button}>Unirse ahora</button>
                <p style={{ marginTop: '15px', color: '#737373' }}>
                    ¿Ya tienes cuenta? <Link to="/login" style={{ color: '#fff', textDecoration: 'none' }}>Inicia sesión aquí.</Link>
                </p>
            </form>
        </div>
    );
};

;

export default Register;