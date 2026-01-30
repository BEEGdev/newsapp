import { Link } from 'react-router-dom';

function Footer() {
    return (
        <footer className="bg-gray-900 border-t border-gray-700">
            <div className="max-w-5xl mx-auto px-4 py-6">
                <div className="flex flex-col gap-4 items-center text-center">
                    {/* Nombre de la página */}
                    <div className="text-xl font-bold text-indigo-400">
                        NewsApp
                    </div>

                    {/* Enlaces de navegación */}
                    <div className="flex gap-6">
                        <Link
                            to="/"
                            className="text-gray-300 hover:text-indigo-400 transition-colors font-medium"
                        >
                            Inicio
                        </Link>
                        <Link
                            to="/top"
                            className="text-gray-300 hover:text-indigo-400 transition-colors font-medium"
                        >
                            Top
                        </Link>
                        <Link
                            to="/categories"
                            className="text-gray-300 hover:text-indigo-400 transition-colors font-medium"
                        >
                            Categorías
                        </Link>
                        <Link
                            to="/favorites"
                            className="text-gray-300 hover:text-indigo-400 transition-colors font-medium"
                        >
                            Favoritos
                        </Link>
                    </div>

                    {/* Copyright */}
                    <div className="text-gray-400 text-sm">
                        © {new Date().getFullYear()} NewsApp. Todos los derechos reservados.
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;