// 1. IMPORTACIÓN CORRECTA (Soluciona el ReferenceError)
import { useParams, useNavigate } from 'react-router-dom';
import { useMovies } from '../hooks/useMovies';
import Navbar from '../components/Navbar';
import api from '../api/axios';
import '../styles/movie-detail.css';

export default function MovieDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    
    // Extraemos 'loading' para manejar el estado de espera
    const { allMovies, loading } = useMovies(); 

    // Buscamos la película en el catálogo
    const movie = allMovies.find(m => String(m.id) === String(id));

    const handleDelete = async () => {
        if (!window.confirm("¿Estás seguro de que deseas eliminar esta película?")) return;
        try {
            await api.delete(`/movies/${id}`); 
            alert("Película eliminada correctamente");
            navigate('/'); 
        } catch (error) {
            alert("Error al eliminar la película.");
        }
    };

    // 2. MANEJO DE CARGA (Evita que el componente falle mientras busca la data)
    if (loading) return <div className="status-msg">Cargando detalles de la película...</div>;

    // 3. VALIDACIÓN DE EXISTENCIA
    if (!movie) return <div className="status-msg">Película no encontrada</div>;

    return (
        <div className="movie-detail-page">
            <Navbar />
            <div className="video-section">
                {/* 4. OPERADOR OPCIONAL (Soluciona el TypeError) */}
                <iframe
                    src={movie.trailerUrl?.replace("watch?v=", "embed/") || ""} 
                    title={movie.title}
                    allowFullScreen
                ></iframe>
            </div>
            <div className="movie-content">
                <div className="header-detail">
                    <h1>{movie.title}</h1>
                    <button onClick={handleDelete} className="btn-delete">
                        Eliminar Película
                    </button>
                </div>
                <div className="meta">
                    <span className="genre-tag">{movie.genre}</span>
                    <span className="year">{movie.year}</span>
                </div>
                <p className="description">{movie.description}</p>
            </div>
        </div>
    );
}