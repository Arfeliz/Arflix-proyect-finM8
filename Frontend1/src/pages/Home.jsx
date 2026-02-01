import { Link } from 'react-router-dom';
import { useMovies } from '../hooks/useMovies'; //
import Navbar from '../components/Navbar';
import '../styles/home.css';

const Home = () => {
    const { allMovies, loading, error } = useMovies(); //

    if (loading) return <div className="status-msg">Cargando catálogo de Netflix...</div>;
    if (error) return <div className="status-msg error">{error}</div>;

    return (
        <div className="home-container">
            <Navbar />
            <header className="home-hero">
                <h1>Películas Ilimitadas y mucho más.</h1>
            </header>
            <main className="movie-grid">
                {allMovies.map(movie => (
                    <Link to={`/movie/${movie.id}`} key={movie.id} className="movie-card">
                        <img src={movie.coverImage} alt={movie.title} />
                        <div className="movie-overlay">
                            <span className="play-icon">▶</span>
                        </div>
                        <h4>{movie.title}</h4>
                    </Link>
                ))}
            </main>
        </div>
    );
};

export default Home;