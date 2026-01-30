import * as movieService from '../services/movie.service.js';
import { MovieOutDTO,CreateMovieDTO,MovieResponseDTO } from '../dtos/movie.dto.js';

export const getMovies = async (req, res) => {
    try {
        const movies = await movieService.getAllMovies();
        const validatedMovies = MovieResponseDTO.array().parse(movies);
        res.status(200).json({ 
            status: 'success', 
            data: validatedMovies 
        });
        
    } catch (error) {
        res.status(500).json({ status: 'error', message: "Error al formatear los datos" });
    }
};

export const postMovie = async (req, res) => {
    try {
        // 1. Validar datos de entrada con DTO
        const validatedInput = CreateMovieDTO.parse(req.body);

        if (!req.file) {
            return res.status(400).json({ status: 'error', message: 'La carátula es obligatoria' });
        }

        const movieData = {
            ...validatedInput,
            coverImage: `/uploads/${req.file.filename}`
        };

        const savedMovie = await movieService.createMovie(movieData);
        const validatedOutput = MovieResponseDTO.parse(savedMovie);

        res.status(201).json({ status: 'success', data: validatedOutput });
    } catch (error) {
        // Captura errores de validación de Zod
        res.status(400).json({ status: 'error', errors: error.errors || error.message });
    }
};

export const putMovie = async (req, res) => {
    try {
        const updated = await movieService.updateMovie(req.params.id, req.body);
        if (!updated) return res.status(404).json({ status: 'fail', message: 'Película no encontrada' });
        res.status(200).json({ status: 'success', data: updated });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

export const removeMovie = async (req, res) => {
    try {
        const deleted = await movieService.deleteMovie(req.params.id);
        if (!deleted) return res.status(404).json({ status: 'fail', message: 'Película no encontrada' });
        res.status(204).send(); 
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};