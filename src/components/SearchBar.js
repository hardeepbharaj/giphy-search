'use client';

import { useState, useEffect } from 'react';
import { useDebounce } from '@/hooks/useDebounce';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState(() => '');
  const [inputTouched, setInputTouched] = useState(false);
  const debouncedQuery = useDebounce(query, 500);

  useEffect(() => {
    if (inputTouched) {
      onSearch(debouncedQuery);
    }
  }, [debouncedQuery, inputTouched, onSearch]);

  const handleInputChange = (e) => {
    setQuery(e.target.value);

    if (!inputTouched) {
      setInputTouched(true);
    }
  };
  
  return (
    <div className="relative max-w-2xl mx-auto">
      <div className="relative group">
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Search for GIFs..."
          className="w-full pl-4 pr-4 py-4 bg-zinc-800/50 backdrop-blur-sm border-2 border-zinc-700/50 rounded-xl text-white placeholder-gray-400 
            focus:outline-none focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 
            transition-all duration-200 ease-in-out
            hover:bg-zinc-800/70 hover:border-zinc-600/50
            shadow-lg shadow-black/20"
        />
        {query && (
          <button
            onClick={() => setQuery('')}
            className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400 hover:text-white transition-colors cursor-pointer"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
      <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-purple-500/0 via-purple-500/50 to-purple-500/0 opacity-0 group-focus-within:opacity-100 transition-opacity duration-200" />
    </div>
  );
};

export default SearchBar;