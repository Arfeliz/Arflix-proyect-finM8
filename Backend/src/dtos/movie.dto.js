import { z } from 'zod';

// 1. DTO de Entrada: Lo que el sistema acepta
export const CreateMovieDTO = z.object({
    title: z.string().min(1, "El título es obligatorio"),
    genre: z.string().min(1, "El género es obligatorio"),
    year: z.preprocess((val) => Number(val), z.number().int().min(1888)),
    description: z.string().min(10, "La descripción debe ser más larga"),
    trailerUrl: z.string().url("Debe ser una URL válida de YouTube")
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