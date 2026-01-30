// Dentro del return de MovieDetail.jsx
<div className="trailer-container" style={{ marginTop: '40px' }}>
    <h2>Tráiler Oficial</h2>
    <iframe
        width="100%"
        height="450"
        src={movie.trailerUrl.replace("watch?v=", "embed/")} 
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
    ></iframe>
</div>