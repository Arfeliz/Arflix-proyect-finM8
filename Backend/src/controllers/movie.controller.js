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
        console.log("Body recibido:", req.body); // Ver qué llega del frontend
        console.log("Archivo recibido:", req.file);
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
        const { id } = req.params;
        const deleted = await movieService.deleteMovie(id);
        
        if (!deleted) {
            return res.status(404).json({ status: 'fail', message: 'No se encontró la película' });
        }

        // 204 significa "No Content", éxito pero sin cuerpo de respuesta
        res.status(204).send(); 
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};