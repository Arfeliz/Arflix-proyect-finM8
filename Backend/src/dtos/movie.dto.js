import { z } from 'zod';

// 1. DTO de Entrada: Lo que el sistema acepta
export const CreateMovieDTO = z.object({
    title: z.string().min(1),
    genre: z.string(),
    year: z.preprocess((val) => Number(val), z.number().int().min(1888)), // Vital para FormData
    description: z.string(),
    trailerUrl: z.string().url()
});

// 2. DTO de Salida Detallado: Para la vista de detalle (MovieDetail)
export const MovieOutDTO = z.object({
    id: z.string(),
    title: z.string(),
    genre: z.string(),
    year: z.number(),
    description: z.string(),
    trailerUrl: z.string(), // ¡Ahora incluido!
    coverImage: z.string().transform((val) => `http://localhost:3000${val}`),
    createdAt: z.string().optional()
});

// 3. DTO de Salida Compacto: Para el catálogo (Home/Rows)
// Cumple con el requerimiento de no exponer datos innecesarios en listas largas
export const MovieResponseDTO = z.object({
    id: z.string(),
    title: z.string(),
    coverImage: z.string().transform(val => `http://localhost:3000${val}`)
});