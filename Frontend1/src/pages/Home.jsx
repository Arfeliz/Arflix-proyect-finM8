import { useEffect, useState } from 'react';
import api from '../api/axios';

const Home = () => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        api.get('/movies').then(res => setMovies(res.data.data));
    }, []);

    return (
        <div style={{ backgroundColor: '#141414', color: 'white', minHeight: '100vh' }}>
            <nav style={{ padding: '20px', fontSize: '24px', color: '#E50914', fontWeight: 'bold' }}>NETFLIX-CLONE</nav>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '10px', padding: '20px' }}>
                {movies.map(movie => (
                    <div key={movie.id} className="movie-card">
                        <img 
                            src={`http://localhost:3000${movie.coverImage}`} 
                            alt={movie.title} 
                            style={{ width: '100%', borderRadius: '4px', transition: 'transform .2s' }}
                        />
                        <h4>{movie.title}</h4>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;