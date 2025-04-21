import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Star, Home } from 'lucide-react';

const Navbar: React.FC = () => {
  const { pathname } = useLocation();

  return (
    <nav className="bg-github-dark-secondary border-b border-github-dark-border px-4 py-3 sticky top-0 z-10">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2 no-underline">
          <img src="/logo.svg" alt="Call2Arms Logo" className="h-8 w-8" />
          <span className="text-xl font-bold text-github-dark-text">Call2Arms</span>
        </Link>
        
        <div className="flex items-center space-x-4">
          <Link 
            to="/" 
            className={`flex items-center space-x-1 p-2 rounded-md transition-colors ${
              pathname === '/' ? 'text-github-dark-accent' : 'text-github-dark-text hover:text-github-dark-accent'
            }`}
          >
            <Home size={20} />
            <span className="hidden sm:inline">ホーム</span>
          </Link>
          
          <Link 
            to="/search" 
            className={`flex items-center space-x-1 p-2 rounded-md transition-colors ${
              pathname === '/search' ? 'text-github-dark-accent' : 'text-github-dark-text hover:text-github-dark-accent'
            }`}
          >
            <Search size={20} />
            <span className="hidden sm:inline">検索</span>
          </Link>
          
          <Link 
            to="/saved" 
            className={`flex items-center space-x-1 p-2 rounded-md transition-colors ${
              pathname === '/saved' ? 'text-github-dark-accent' : 'text-github-dark-text hover:text-github-dark-accent'
            }`}
          >
            <Star size={20} />
            <span className="hidden sm:inline">保存済み</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
