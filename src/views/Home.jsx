import { Link } from 'react-router-dom';

function Home() {
    return (
        <div className="max-w-5xl mx-auto px-4 py-12">
            <div className="flex flex-col items-center gap-12">
                {/* Título principal */}
                <div className="text-center space-y-4">
                    <h1 className="text-5xl md:text-7xl font-bold text-indigo-400">
                        NewsApp
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-300">
                        Tu fuente de noticias al instante
                    </p>
                    <p className="text-gray-400 max-w-2xl">
                        Explora las últimas noticias del mundo, descubre contenido por categorías y mantente informado con los titulares más importantes
                    </p>
                </div>

                {/* Enlaces a las vistas */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl">
                    {/* Top Headlines */}
                    <Link 
                        to="/top"
                        className="group bg-white/10 backdrop-blur-md rounded-xl p-8 hover:bg-white/15 transition-all duration-300 border border-gray-700 hover:border-indigo-500 shadow-xl hover:shadow-indigo-500/20 hover:scale-105"
                    >
                        <div className="flex flex-col gap-3">
                            <h2 className="text-2xl font-bold text-white group-hover:text-indigo-400 transition-colors">
                                Top Titulares
                            </h2>
                            <p className="text-gray-300">
                                Las noticias más importantes del momento
                            </p>
                        </div>
                    </Link>

                    {/* Categorías */}
                    <Link 
                        to="/categories"
                        className="group bg-white/10 backdrop-blur-md rounded-xl p-8 hover:bg-white/15 transition-all duration-300 border border-gray-700 hover:border-indigo-500 shadow-xl hover:shadow-indigo-500/20 hover:scale-105"
                    >
                        <div className="flex flex-col gap-3">
                            <h2 className="text-2xl font-bold text-white group-hover:text-indigo-400 transition-colors">
                                Categorías
                            </h2>
                            <p className="text-gray-300">
                                Explora noticias por temas específicos
                            </p>
                        </div>
                    </Link>
                </div>

                {/* Call to action para búsqueda */}
                <div className="bg-indigo-500/20 rounded-xl p-6 border border-indigo-500/30 max-w-2xl">
                    <p className="text-center text-gray-200">
                        <span className="font-semibold">Tip:</span> Usa la barra de búsqueda arriba para encontrar noticias sobre temas específicos
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Home;