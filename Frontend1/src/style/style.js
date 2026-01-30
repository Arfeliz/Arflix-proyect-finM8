export const styles = {
    container: {
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000',
        backgroundImage: 'linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url("https://assets.nflxext.com/...")',
        backgroundSize: 'cover',
        padding: '20px' // Espacio para que el form no toque los bordes en móvil
    },
    form: {
        backgroundColor: 'rgba(0,0,0,0.75)',
        padding: '40px 5vw', // Padding responsivo
        borderRadius: '8px',
        width: '100%',
        maxWidth: '450px', // No crece más de esto en desktop
        color: '#fff',
        display: 'flex',
        flexDirection: 'column',
        boxSizing: 'border-box'
    },
    input: {
        padding: '15px',
        marginBottom: '20px',
        borderRadius: '4px',
        border: 'none',
        backgroundColor: '#333',
        color: '#fff',
        fontSize: '16px' // Evita el zoom automático en iOS al enfocar
    }
};