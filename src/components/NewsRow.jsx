import { useState } from 'react';
import FavButton from './FavButton';

function NewsCard({ article }) {
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
        <div className="flex-1 relative">
            {/* Botón de favoritos en la esquina superior derecha */}
            <div className="absolute top-2 right-2 z-10">
                <FavButton article={article} />
            </div>
            
            <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block h-full"
            >
                <div className='rounded-lg overflow-hidden h-full flex flex-col'>
                    {article.urlToImage && !imageError ? (
                        <img
                            src={article.urlToImage}
                            alt={article.title}
                            className="w-full h-48 object-cover"
                            onError={handleImageError}
                        />
                    ) : (
                        <div className="w-full h-48 bg-gray-700 flex items-center justify-center">
                            <span className="text-gray-400">Sin imagen</span>
                        </div>
                    )}
                    <div className="bg-white/10 backdrop-blur-md shadow-xl p-4 flex-1 flex flex-col gap-3">
                        <h3 className="font-semibold text-lg line-clamp-2">{article.title}</h3>
                        <p className="text-gray-300 text-sm">
                            {formatDate(article.publishedAt)}
                        </p>
                        <p className="text-indigo-300 text-sm">
                            {article.source.name}
                        </p>
                    </div>
                </div>
            </a>
        </div>
    );
}

function NewsRow({ title, articles }) {
    if (!articles || articles.length === 0) return null;
    
    return (
        <div className="flex flex-col gap-4">
            {title && (
                <h2 className="text-2xl font-bold text-left">{title}</h2>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {articles.map((article, idx) => (
                    <NewsCard key={article.url || idx} article={article} />
                ))}
            </div>
        </div>
    );
}

export default NewsRow;