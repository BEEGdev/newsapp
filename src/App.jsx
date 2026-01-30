import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SearchBar from './components/SearchBar';
import SearchList from './views/SearchList';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Home from './views/Home'
import Categories from './views/Categories';
import Top from './views/Top';
import Favorites from './views/Favorites';

function App() {
  const [searchResults, setSearchResults] = useState(null);
  const [searchMeta, setSearchMeta] = useState(null);

  const handleSearch = (results, meta) => {
    setSearchResults(results);
    setSearchMeta(meta);
  };

  const handleBackToMain = () => {
    setSearchResults(null);
    setSearchMeta(null);
  };

  return (
    <Router>
      <NavBar/>
      <div className="bg-gray-900 min-h-screen min-w-screen text-white text-center p-8">
      <SearchBar onSearch={handleSearch} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/top" element={<Top />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route 
          path="/search" 
          element={
            <SearchList
              results={searchResults}
              meta={searchMeta}
              onBack={handleBackToMain}
            />
          } 
        />
      </Routes>
      </div>
      <Footer/>
    </Router>
  );
}

export default App;