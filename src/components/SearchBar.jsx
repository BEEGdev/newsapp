import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { fetchNews } from '../api/NewsApi';

function SearchBar({ onSearch }) {
	const [showFilters, setShowFilters] = useState(false);
	const [searchQuery, setSearchQuery] = useState('');
	const [filters, setFilters] = useState({
		language: 'es',
		sortBy: 'publishedAt',
		timeRange: 'all'
	});
	const [localError, setLocalError] = useState(null);
	const navigate = useNavigate();

	const getDateRange = (timeRange) => {
		if (timeRange === 'all') {
			return { from: '', to: '' };
		}

		const today = new Date();
		const from = new Date();

		switch (timeRange) {
			case 'today':
				from.setHours(0, 0, 0, 0);
				break;
			case 'week':
				from.setDate(today.getDate() - 7);
				break;
			case '2weeks':
				from.setDate(today.getDate() - 14);
				break;
			case 'month':
				from.setDate(today.getDate() - 30);
				break;
			default:
				return { from: '', to: '' };
		}

		return {
			from: from.toISOString().split('T')[0],
			to: today.toISOString().split('T')[0]
		};
	};

	const handleFilterChange = (filterName, value) => {
		setFilters({
			...filters,
			[filterName]: value
		});
	};

	const handleSearch = async (e) => {
		e.preventDefault();
		if (!searchQuery.trim()) {
			setLocalError('Por favor ingresa un término de búsqueda');
			return;
		}
		setLocalError(null);
		try {
			const dateRange = getDateRange(filters.timeRange);
			const results = await fetchNews({
				q: searchQuery,
				language: filters.language,
				sortBy: filters.sortBy,
				from: dateRange.from,
				to: dateRange.to,
				pageSize: 100
			});
			onSearch(results, { query: searchQuery, filters });
			navigate('/search');
			setSearchQuery('');
		} catch (err) {
			setLocalError(err.message || 'Error al buscar');
		} 
	};

	const handleKeyPress = (e) => {
		if (e.key === 'Enter') {
			handleSearch(e);
		}
	};

	return (
		<div className="max-w-5xl mx-auto px-4 py-6">
			<div className="flex flex-col gap-3">
				<form onSubmit={handleSearch} className='flex flex-col gap-4'>
					{/* Barra de búsqueda */}
					<div className='flex flex-col sm:flex-row gap-3'>
						<div className='flex flex-row flex-1'>
							<input
								type="text"
								className="bg-gray-700 px-4 py-3 rounded-l flex-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
								placeholder="Buscar noticias..."
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
								onKeyPress={handleKeyPress}
							/>
							<button
								className="bg-indigo-600 px-6 py-3 rounded-r hover:bg-indigo-700 transition-colors font-medium"
								type="submit"
							>
								Buscar
							</button>
						</div>
						
						{/* Botón filtros */}
						<button 
							type='button'
							className="bg-indigo-600 px-6 py-3 rounded hover:bg-indigo-700 transition-colors font-medium sm:w-auto"
							onClick={() => setShowFilters(!showFilters)}
						>
							{showFilters ? '▲ Ocultar filtros' : '▼ Mostrar filtros'}
						</button>
					</div>
				</form>

				{/* Error message */}
				{localError && (
					<div className="bg-red-500/20 border border-red-500 rounded p-3 text-red-200">
						Error: {localError}
					</div>
				)}

				{/* Filtros */}
				{showFilters && (
					<div className="bg-gray-800/50 rounded-lg p-4 md:p-6">
						<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
							{/* Idioma */}
							<div className="flex flex-col gap-2">
								<label className="font-medium text-gray-300">Idioma:</label>
								<select 
									className='p-3 bg-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500'
									value={filters.language}
									onChange={(e) => handleFilterChange('language', e.target.value)}
								>
									<option value="">Todos los idiomas</option>
									<option value="es">Español</option>
									<option value="en">Inglés</option>
									<option value="fr">Francés</option>
									<option value="de">Alemán</option>
									<option value="it">Italiano</option>
									<option value="pt">Portugués</option>
									<option value="ar">Árabe</option>
									<option value="zh">Chino</option>
								</select>
							</div>

							{/* Periodo */}
							<div className="flex flex-col gap-2">
								<label className="font-medium text-gray-300">Periodo:</label>
								<select 
									className='p-3 bg-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500'
									value={filters.timeRange}
									onChange={(e) => handleFilterChange('timeRange', e.target.value)}
								>
									<option value="all">Sin límite</option>
									<option value="today">Hoy</option>
									<option value="week">Última semana</option>
									<option value="2weeks">Últimas 2 semanas</option>
									<option value="month">Último mes</option>
								</select>
							</div>

							{/* Ordenar */}
							<div className="flex flex-col gap-2">
								<label className="font-medium text-gray-300">Ordenar por:</label>
								<select 
									className='p-3 bg-gray-700 rounded focus:optimize-none focus:ring-2 focus:ring-indigo-500'
									value={filters.sortBy}
									onChange={(e) => handleFilterChange('sortBy', e.target.value)}
								>
									<option value="publishedAt">Más recientes</option>
									<option value="relevancy">Relevancia</option>
									<option value="popularity">Popularidad</option>
								</select>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}

export default SearchBar;