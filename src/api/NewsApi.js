import axios from 'axios';
import { mockArticles } from './mockData';

const API_KEY = import.meta.env.VITE_NEWS_API_KEY;
const BASE_URL = 'https://newsapi.org/v2/everything';
const USE_MOCK = false; 

export const fetchNews = async (params) => {
    
    if (USE_MOCK) {
        await new Promise(resolve => setTimeout(resolve, 800));
        return mockArticles;
    }

    const {
        q = '',
        sources = '',
        language = '',
        sortBy = 'publishedAt',
        from = '',
        to = '',
        pageSize = 15
    } = params;

    const queryParams = {
        apiKey: API_KEY,
        pageSize: pageSize
    };

    if (q) queryParams.q = q;
    if (sources) queryParams.domains = sources;
    if (language) queryParams.language = language;
    if (sortBy) queryParams.sortBy = sortBy;
    if (from) queryParams.from = from;
    if (to) queryParams.to = to;

    try {
        const response = await axios.get(BASE_URL, {
            params: queryParams
        });

        if (response.data.status === 'ok') {
            console.log(response.data.articles)
            return response.data.articles;
        } else {
            throw new Error(response.data.message || 'Error al obtener noticias');
        }
    } catch (error) {
        console.error('Error en fetchNews:', error);
        throw error;
    }
};

export const fetchNewsByCategory = async (category, pageSize = 3) => {
    
    if (USE_MOCK) {
        await new Promise(resolve => setTimeout(resolve, 500));
        return mockArticles.slice(0, pageSize);
    }

    const queryParams = {
        apiKey: API_KEY,
        q: category,
        pageSize: pageSize,
        sortBy: 'publishedAt'
    };

    try {
        const response = await axios.get(BASE_URL, {
            params: queryParams
        });

        if (response.data.status === 'ok') {
            return response.data.articles;
        } else {
            throw new Error(response.data.message || 'Error al obtener noticias por categoría');
        }
    } catch (error) {
        console.error('Error en fetchNewsByCategory:', error);
        throw error;
    }
};

export const fetchTopHeadlines = async (pageSize = 6) => {
    const TOP_HEADLINES_URL = 'https://newsapi.org/v2/top-headlines';
    
    if (USE_MOCK) {
        await new Promise(resolve => setTimeout(resolve, 500));
        return mockArticles.slice(0, pageSize);
    }

    const queryParams = {
        apiKey: API_KEY,
        country: 'us',
        pageSize: pageSize
    };

    try {
        const response = await axios.get(TOP_HEADLINES_URL, {
            params: queryParams
        });

        if (response.data.status === 'ok') {
            console.log(response.data.articles)
            return response.data.articles;
        } else {
            throw new Error(response.data.message || 'Error al obtener top headlines');
        }
    } catch (error) {
        console.error('Error en fetchTopHeadlines:', error);
        throw error;
    }
};