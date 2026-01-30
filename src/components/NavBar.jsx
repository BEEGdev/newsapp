import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';

function NavBar() {
    const location = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const isActive = (path) => {
        return location.pathname === path;
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    return (
        <nav className="bg-gray-800 border-b border-gray-700 shadow-lg">
            <div className="max-w-5xl mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    {/* Logo/Título */}
                    <Link to="/" className="text-xl font-bold text-indigo-400 hover:text-indigo-300 transition-colors">
                        NewsApp
                    </Link>

                    {/* Links de navegación - Desktop */}
                    <div className="hidden md:flex gap-6">
                        <Link
                            to="/"
                            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                                isActive('/')
                                    ? 'bg-indigo-600 text-white'
                                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                            }`}
                        >
                            Inicio
                        </Link>
                        <Link
                            to="/top"
                            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                                isActive('/top')
                                    ? 'bg-indigo-600 text-white'
                                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                            }`}
                        >
                            Top
                        </Link>
                        <Link
                            to="/categories"
                            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                                isActive('/categories')
                                    ? 'bg-indigo-600 text-white'
                                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                            }`}
                        >
                            Categorías
                        </Link>
                        <Link
                            to="/favorites"
                            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                                isActive('/favorites')
                                    ? 'bg-indigo-600 text-white'
                                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                            }`}
                        >
                            Favoritos
                        </Link>
                    </div>

                    {/* Botón hamburguesa - Mobile */}
                    <button
                        onClick={toggleMenu}
                        className="md:hidden text-gray-300 hover:text-white focus:outline-none"
                        aria-label="Abrir menú"
                    >
                        <svg
                            className="h-6 w-6"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            {isMenuOpen ? (
                                <path d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>

                {/* Menú desplegable - Mobile */}
                {isMenuOpen && (
                    <div className="md:hidden pb-4">
                        <div className="flex flex-col gap-2">
                            <Link
                                to="/"
                                onClick={closeMenu}
                                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                                    isActive('/')
                                        ? 'bg-indigo-600 text-white'
                                        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                                }`}
                            >
                                Inicio
                            </Link>
                            <Link
                                to="/top"
                                onClick={closeMenu}
                                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                                    isActive('/top')
                                        ? 'bg-indigo-600 text-white'
                                        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                                }`}
                            >
                                Top
                            </Link>
                            <Link
                                to="/categories"
                                onClick={closeMenu}
                                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                                    isActive('/categories')
                                        ? 'bg-indigo-600 text-white'
                                        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                                }`}
                            >
                                Categorías
                            </Link>
                            <Link
                                to="/favorites"
                                onClick={closeMenu}
                                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                                    isActive('/favorites')
                                        ? 'bg-indigo-600 text-white'
                                        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                                }`}
                            >
                                Favoritos
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}

export default NavBar;