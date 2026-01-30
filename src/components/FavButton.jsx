import { useState } from 'react';

function FavButton({ article }) {
    const [isFavorite, setIsFavorite] = useState(() => {
        // Inicializar el estado verificando localStorage
        const favorites = JSON.parse(localStorage.getItem('favArticles') || '[]');
        return favorites.some(fav => fav.url === article.url);
    });

    const toggleFavorite = (e) => {
        e.preventDefault(); // Evitar que se abra el enlace del artículo
        e.stopPropagation();

        const favorites = JSON.parse(localStorage.getItem('favArticles') || '[]');
        
        if (isFavorite) {
            // Quitar de favoritos
            const newFavorites = favorites.filter(fav => fav.url !== article.url);
            localStorage.setItem('favArticles', JSON.stringify(newFavorites));
            setIsFavorite(false);
        } else {
            // Añadir a favoritos con timestamp
            const newFavorite = {
                ...article,
                favoritedAt: new Date().toISOString()
            };
            favorites.push(newFavorite);
            localStorage.setItem('favArticles', JSON.stringify(favorites));
            setIsFavorite(true);
        }
    };

    return (
        <button
            onClick={toggleFavorite}
            className={`p-2 rounded-full transition-all duration-200 ${
                isFavorite 
                    ? 'bg-yellow-500 text-white hover:bg-yellow-600' 
                    : 'bg-white/70 text-gray-300 hover:bg-white hover:text-yellow-400'
            }`}
            title={isFavorite ? 'Quitar de favoritos' : 'Añadir a favoritos'}
        >
            <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5" 
                viewBox="0 0 24 24" 
                fill={isFavorite ? 'currentColor' : 'none'}
                stroke="currentColor" 
                strokeWidth="2"
            >
                <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" 
                />
            </svg>
        </button>
    );
}

export default FavButton;