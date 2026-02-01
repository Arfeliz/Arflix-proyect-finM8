import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import Navbar from '../components/Navbar';
import '../styles/auth.css'; // Reutilizamos estilos de formulario

const UploadMovie = () => {
    const [formData, setFormData] = useState({ title: '', genre: 'Action', year: '', description: '', trailerUrl: '' });
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const data = new FormData(); // Requisito para Multer
        Object.keys(formData).forEach(key => data.append(key, formData[key]));
        data.append('coverImage', file);

        try {
            await api.post('/movies', data); //
            navigate('/');
        } catch (error) {
            alert('Error al subir: ' + (error.response?.data?.message || 'Error de servidor'));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <Navbar />
            <form onSubmit={handleSubmit} className="auth-form">
                <h2>Subir Película</h2>
                <input type="text" placeholder="Título" className="auth-input" onChange={e => setFormData({...formData, title: e.target.value})} required />
                <input type="number" placeholder="Año" className="auth-input" onChange={e => setFormData({...formData, year: e.target.value})} required />
                <input type="url" placeholder="URL Tráiler (YouTube)" className="auth-input" onChange={e => setFormData({...formData, trailerUrl: e.target.value})} required />
                <textarea className="auth-input" placeholder="Descripción" onChange={e => setFormData({...formData, description: e.target.value})} required />
                <input type="file" className="auth-input" onChange={e => setFile(e.target.files[0])} required />
                <button type="submit" className="auth-button" disabled={loading}>{loading ? 'Subiendo...' : 'Publicar'}</button>
            </form>
        </div>
    );
};

export default UploadMovie;