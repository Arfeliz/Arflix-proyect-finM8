import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { styles } from '../style/style.js';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(username, password);
            navigate('/'); // Ir al catálogo
        } catch (err) {
            setError('Credenciales incorrectas');
        }
    };

    return (
        <div style={styles.container}>
            <form onSubmit={handleSubmit} style={styles.form}>
                <h1 style={{ marginBottom: '20px' }}>Iniciar sesión</h1>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <input 
                    type="text" placeholder="Usuario o email" style={styles.input}
                    value={username} onChange={(e) => setUsername(e.target.value)} 
                />
                <input 
                    type="password" placeholder="Contraseña" style={styles.input}
                    value={password} onChange={(e) => setPassword(e.target.value)} 
                />
                <button type="submit" style={styles.button}>Iniciar Sesión</button>
                <p style={{ marginTop: '15px', color: '#737373' }}>
                    ¿Primera vez en Netflix? <Link to="/register" style={{ color: '#fff', textDecoration: 'none' }}>Suscríbete ya.</Link>
                </p>
            </form>
        </div>
    );
};



export default Login;