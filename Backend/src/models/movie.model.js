export class Movie {
    constructor({ title, genre, year, description,trailerUrl,coverImage }) {
        this.id = Date.now().toString();
        this.title = title;
        this.genre = genre;
        this.year = parseInt(year);
        this.description = description;
        this.trailerUrl = trailerUrl;
        this.coverImage = coverImage; // Aquí guardaremos el path del archivo
        this.createdAt = new Date().toISOString();
    }
}
