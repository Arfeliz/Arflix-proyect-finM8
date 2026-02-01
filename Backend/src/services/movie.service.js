import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const filePath = path.join(__dirname, '..', 'data', 'movie.json');

const readData = async () => {
    try {
        const data = await fs.readFile(filePath, 'utf-8');
        const json = JSON.parse(data);
        
        // Verificamos si json es un objeto y tiene la propiedad movies
        if (json && Array.isArray(json.movies)) {
            return json.movies;
        }
        
        // Si el JSON es solo un array directo, lo retornamos
        if (Array.isArray(json)) return json;

        return [];
    } catch (error) {
        // Si el archivo no existe, creamos la estructura base
        await writeData([]); 
        return [];
    }
};

const writeData = async (moviesArray) => {
    await fs.writeFile(filePath, JSON.stringify({ movies: moviesArray }, null, 2)); //
};

export const getAllMovies = async () => await readData();

export const createMovie = async (movieData) => {
    const movies = await readData();
    const newMovie = { 
        id: Date.now().toString(), 
        ...movieData,
        createdAt: new Date().toISOString() 
    };
    movies.push(newMovie);
    await writeData(movies);
    return newMovie;
};

export const updateMovie = async (id, movieData) => {
    const movies = await readData();
    const index = movies.findIndex(m => m.id === id);
    if (index === -1) return null;

    movies[index] = { ...movies[index], ...movieData };
    await writeData(movies);
    return movies[index];
};

export const deleteMovie = async (id) => {
    const movies = await readData();
    const filteredMovies = movies.filter(m => m.id !== id);
    if (movies.length === filteredMovies.length) return false;
    await writeData(filteredMovies);
    return true;
};