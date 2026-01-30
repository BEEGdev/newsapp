import { useState, useEffect } from 'react';
import NewsRow from '../components/NewsRow';

function Favorites() {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const loadFavorites = () => {
            const favArticles = JSON.parse(localStorage.getItem('favArticles') || '[]');
            // Ordenar de más nuevo a más antiguo según cuando se añadieron a favoritos
            const sortedFavorites = favArticles.sort((a, b) => {
                return new Date(b.favoritedAt) - new Date(a.favoritedAt);
            });
            setFavorites(sortedFavorites);
        };

        loadFavorites();

        // Escuchar cambios en localStorage desde otros componentes
        const handleStorageChange = () => {
            loadFavorites();
        };

        window.addEventListener('storage', handleStorageChange);
        
        // También escuchar un evento personalizado para cambios en la misma pestaña
        window.addEventListener('favoritesChanged', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
            window.removeEventListener('favoritesChanged', handleStorageChange);
        };
    }, []);

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            {favorites.length > 0 ? (
                <NewsRow 
                    title="Mis Favoritos" 
                    articles={favorites} 
                />
            ) : (
                <div className="text-center py-16">
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-16 w-16 mx-auto text-gray-500 mb-4" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                    >
                        <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth="2" 
                            d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" 
                        />
                    </svg>
                    <h2 className="text-2xl font-bold text-gray-400 mb-2">No tienes favoritos</h2>
                    <p className="text-gray-500">Añade artículos a favoritos haciendo clic en la estrella</p>
                </div>
            )}
        </div>
    );
}

export default Favorites;