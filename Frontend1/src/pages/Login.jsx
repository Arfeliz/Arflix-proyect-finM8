import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/auth.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth(); //
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(username, password); //
            navigate('/');
        } catch (err) {
            setError('Credenciales incorrectas');
        }
    };

    return (
        <div className="auth-container">
            <form onSubmit={handleSubmit} className="auth-form">
                <h1>Iniciar sesión</h1>
                {error && <p className="error-msg">{error}</p>}
                <input 
                    type="text" placeholder="Usuario" className="auth-input"
                    value={username} onChange={(e) => setUsername(e.target.value)} required
                />
                <input 
                    type="password" placeholder="Contraseña" className="auth-input"
                    value={password} onChange={(e) => setPassword(e.target.value)} required
                />
                <button type="submit" className="auth-button">Iniciar Sesión</button>
                <p className="auth-footer">
                    ¿Nuevo en Netflix? <Link to="/register">Suscríbete ya.</Link>
                </p>
            </form>
        </div>
    );
};

export default Login;