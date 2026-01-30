import { useState, useEffect } from 'react';
import { fetchNewsByCategory } from '../api/NewsApi';
import NewsRow from '../components/NewsRow';

function Categories() {
    const [categoriesData, setCategoriesData] = useState({
        business: [],
        entertainment: [],
        general: [],
        health: [],
        science: [],
        sports: [],
        technology: []
    });

    const categoryNames = {
        business: 'Negocios',
        entertainment: 'Entretenimiento',
        general: 'General',
        health: 'Salud',
        science: 'Ciencia',
        sports: 'Deportes',
        technology: 'Tecnología'
    };

    useEffect(() => {
        const loadAllCategories = async () => {
            const categories = Object.keys(categoriesData);
            
            for (const category of categories) {
                try {
                    const articles = await fetchNewsByCategory(category, 3);
                    setCategoriesData(prev => ({
                        ...prev,
                        [category]: articles
                    }));
                } catch (error) {
                    console.error(`Error cargando categoría ${category}:`, error);
                }
            }
        };

        loadAllCategories();
    }, []);

    return (
        <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col gap-12">
            {Object.keys(categoriesData).map((category) => (
                categoriesData[category].length > 0 && (
                    <NewsRow
                        key={category}
                        title={categoryNames[category]}
                        articles={categoriesData[category]}
                    />
                )
            ))}
        </div>
    );
}

export default Categories;