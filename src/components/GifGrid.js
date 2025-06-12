'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import SearchBar from '@/components/SearchBar';
import GifCard from '@/components/GifCard';
import SkeletonGifCard from '@/components/SkeletonGifCard';
import ErrorComp from '@/components/ErrorComp';
import { getTrendingGifs, searchGifs } from '@/services/giphyService';

export default function GifGrid({ initialGifs = [] }) {
  const [gifs, setGifs] = useState(initialGifs);
  const [offset, setOffset] = useState(initialGifs.length);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [hasMore, setHasMore] = useState(true);
  const cachedTrendingRef = useRef(initialGifs);

  const fetchGifs = async (query = '', currentOffset = 0) => {
    try {
      setIsLoading(true);

      if (query === '' && currentOffset === 0 && cachedTrendingRef.current.length > 0) {
        setGifs(cachedTrendingRef.current);
        setHasMore(cachedTrendingRef.current.length === 20);
        setOffset(cachedTrendingRef.current.length);
        return;
      }
      
      const response = query
        ? await searchGifs(query, currentOffset)
        : await getTrendingGifs(currentOffset)

      if (currentOffset === 0) {
        setGifs(response.data);
        if (query === '') {
          cachedTrendingRef.current = response.data
        }
      } else {
        setGifs((prev) => [...prev, ...response.data]);
      }

      setHasMore(response.data.length === 20);
      setOffset(currentOffset + response.data.length);
    } catch (err) {
      console.error('Error fetching GIFs:', error);
      setError(`Oops! Something went wrong.: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = useCallback((query) => {
    setSearchQuery(query);
    setOffset(0);
    fetchGifs(query, 0);
  }, []);

  const handleLoadMore = () => {
    fetchGifs(searchQuery, offset);
  };

  return (
    <div className="min-h-screen bg-black">
      <header className="bg-zinc-900 shadow-lg sticky top-0 z-10">
        <div className="max-w-7xl mx-auto py-6 px-4">
          <h1 className="text-3xl font-bold text-center text-white mb-4">Giphy</h1>
          <SearchBar onSearch={handleSearch} />
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {error ? (
          <ErrorComp error={error} />
        ) : isLoading && gifs.length === 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[...Array(12)].map((_, index) => (
              <SkeletonGifCard key={`initial-loading-${index}`} />
            ))}
          </div>
        ) : gifs.length === 0 ? (
          <div className="text-center text-gray-400 py-12">
            <p className="text-xl">No GIFs found. Try searching for something!</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {gifs.map((gif, index) => (
                <GifCard key={gif.id} gif={gif} priority={index < 4} />
              ))}
            </div>

            {isLoading && gifs.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
                {[...Array(4)].map((_, index) => (
                  <SkeletonGifCard key={`load-more-loading-${index}`} />
                ))}
              </div>
            )}

            {!isLoading && hasMore && (
              <div className="flex justify-center p-8">
                <button
                  onClick={handleLoadMore}
                  className="px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-70 cursor-pointer disabled:cursor-not-allowed"
                  disabled={isLoading}
                >
                  Load More
                </button>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
} 