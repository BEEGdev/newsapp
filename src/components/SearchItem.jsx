import { useState } from 'react';
import FavButton from './FavButton';

function SearchItem({ article }) {
    const [imageError, setImageError] = useState(false);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        };
        return date.toLocaleDateString('es-ES', options);
    };

    const handleImageError = () => {
        setImageError(true);
    };

    return (
        <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="relative block"
        >
            {/* Botón de favoritos en la esquina superior derecha */}
            <div className="absolute top-2 right-2 z-10">
                <FavButton article={article} />
            </div>

            <div className='rounded-t-lg md:rounded-lg md:flex md:flex-row md:overflow-hidden'>
                {article.urlToImage && !imageError ? (
                    <img
                        src={article.urlToImage}
                        alt={article.title}
                        className="w-full h-48 object-cover md:w-80 md:h-60 md:flex-shrink-0"
                        onError={handleImageError}
                    />
                ) : (
                    <div className="w-full h-48 bg-gray-700 flex items-center justify-center md:w-80 md:h-60 md:flex-shrink-0">
                        <span className="text-gray-400">Sin imagen</span>
                    </div>
                )}
                
                <div className="bg-white/10 backdrop-blur-md rounded-b-lg md:rounded-none md:rounded-r-lg shadow-xl p-4 md:flex-1">
                    <div className='py-4 flex flex-col gap-8 text-justify md:justify-between md:h-full'>
                        <h3 className="font-semibold text-xl">{article.title}</h3>
                        <div className='flex flex-col gap-3'>
                            <p className="text-gray-300">
                                {formatDate(article.publishedAt)}
                            </p>
                            <p className="text-indigo-300">
                                {article.source.name}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </a>
    );
}

export default SearchItem;