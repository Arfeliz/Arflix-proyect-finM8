import { useState, useEffect } from 'react';
import axios from 'axios';

export const useMovies = () => {
    const [allMovies, setAllMovies] = useState([]);
    const [trending, setTrending] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchMovies = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem('token'); // Recuperamos el JWT

            const response = await axios.get('http://localhost:3000/api/movies', {
                headers: {
                    Authorization: `Bearer ${token}` // Autenticación requerida
                }
            });

            // Los datos vienen estructurados por el DTO del backend
            const moviesFromApi = response.data.data;

            // Adaptamos los datos para los componentes (Home, Row, MovieDetail)
            const formattedMovies = moviesFromApi.map(movie => ({
                ...movie,
                // Aseguramos que el ID sea compatible con la búsqueda en MovieDetail
                id: movie.id.toString(), 
                // La URL de la imagen ya viene transformada por el DTO del backend
                backdrop: movie.coverImage,
                poster: movie.coverImage,
                // El backend envía un string, el frontend espera un array para los Tags
                genres: movie.genre ? [movie.genre] : ["All"]
            }));

            setAllMovies(formattedMovies);
            // Simulamos tendencias con las últimas 4 películas agregadas
            setTrending(formattedMovies.slice(-4)); 
            
            setError(null);
        } catch (err) {
            console.error("Error fetching movies:", err);
            setError("No se pudo cargar el catálogo. Verifica tu conexión o autenticación.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMovies();
    }, []);

    // Exponemos la función refresh para permitir recargar el catálogo manualmente
    return { allMovies, trending, loading, error, refresh: fetchMovies };
};