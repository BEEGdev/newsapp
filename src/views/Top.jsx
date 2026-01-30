import { useState, useEffect } from 'react';
import { fetchTopHeadlines } from '../api/NewsApi';
import NewsRow from '../components/NewsRow';

function Top() {
    const [topNews, setTopNews] = useState([]);

    useEffect(() => {
        const loadTopHeadlines = async () => {
            try {
                const articles = await fetchTopHeadlines(6);
                setTopNews(articles);
            } catch (error) {
                console.error('Error cargando top headlines:', error);
            }
        };

        loadTopHeadlines();
    }, []);

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            {topNews.length > 0 && (
                <NewsRow articles={topNews} />
            )}
        </div>
    );
}

export default Top;