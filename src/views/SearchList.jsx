import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import SearchItem from '../components/SearchItem';

function SearchList({ results, meta, onBack }) {
	const navigate = useNavigate();
	const articlesPerPage = 15;

	const handleBackToHome = () => {
		onBack();
		navigate('/');
	};

	if (!results) {
		return (
			<div className="">
				<p>Realiza una búsqueda desde la barra de búsqueda</p>
			</div>
		);
	}

	return <SearchListContent results={results} meta={meta} handleBackToHome={handleBackToHome} articlesPerPage={articlesPerPage} />;
}

function SearchListContent({ results, meta, handleBackToHome, articlesPerPage }) {
	const [currentPage, setCurrentPage] = useState(1);

	// Calcular índices para paginación
	const indexOfLastArticle = currentPage * articlesPerPage;
	const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
	const currentArticles = results.slice(indexOfFirstArticle, indexOfLastArticle);
	const totalPages = Math.ceil(results.length / articlesPerPage);

	const handleNextPage = () => {
		if (currentPage < totalPages) {
			setCurrentPage(currentPage + 1);
			window.scrollTo({ top: 0, behavior: 'smooth' });
		}
	};

	const handlePreviousPage = () => {
		if (currentPage > 1) {
			setCurrentPage(currentPage - 1);
			window.scrollTo({ top: 0, behavior: 'smooth' });
		}
	};

	return (
		<div className="flex flex-col gap-4 max-w-5xl mx-auto px-4">
			<button className='m-5' onClick={handleBackToHome}>← Volver</button>
			<h2 className='font-bold text-indigo-500'>
				Resultados para: <span className='font-bold text-white'>{meta?.query || ''}</span>
			</h2>

			{results && results.length > 0 ? (
				<>
					<p className='text-gray-400 text-sm'>
						Mostrando {indexOfFirstArticle + 1}-{Math.min(indexOfLastArticle, results.length)} de {results.length} resultados
					</p>

					<ul className='flex flex-col gap-6'>
						{currentArticles.map((item, idx) => (
							<SearchItem key={item.url || idx} article={item} />
						))}
					</ul>

					{/* Controles de paginación */}
					{totalPages > 1 && (
						<div className='flex items-center justify-center gap-4 my-8'>
							<button
								onClick={handlePreviousPage}
								disabled={currentPage === 1}
								className={`px-6 py-2 rounded-lg font-medium transition-colors ${
									currentPage === 1
										? 'bg-gray-700 text-gray-500 cursor-not-allowed'
										: 'bg-indigo-600 text-white hover:bg-indigo-700'
								}`}
							>
								← Anterior
							</button>

							<span className='text-gray-300'>
								Página {currentPage} de {totalPages}
							</span>

							<button
								onClick={handleNextPage}
								disabled={currentPage === totalPages}
								className={`px-6 py-2 rounded-lg font-medium transition-colors ${
									currentPage === totalPages
										? 'bg-gray-700 text-gray-500 cursor-not-allowed'
										: 'bg-indigo-600 text-white hover:bg-indigo-700'
								}`}
							>
								Siguiente →
							</button>
						</div>
					)}
				</>
			) : (
				<p>No se encontraron resultados</p>
			)}
		</div>
	);
}

export default SearchList;