import React, { useEffect, useRef, useState } from 'react';
import { useSearchContext } from '../context/SearchContext';
import { searchData } from '../data/searchData';
import { SearchResult } from '../type';
import { useVirtualizer } from '@tanstack/react-virtual';

const SearchResults: React.FC = () => {
  const { searchTerm, addToSearchHistory } = useSearchContext();
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [timeTaken, setTimeTaken] = useState<number>(0);

  const rowVirtualizer = useVirtualizer({
    count: results.length,
    getScrollElement: () => document.documentElement,
    estimateSize: () => 40,
    overscan: 5,
  });

  const getFilteredResults = (query: string) => {
    const startTime = performance.now();

    const filteredResults = searchData.filter((item) =>
      item.title.toLowerCase().includes(query.toLowerCase())
    );

    const endTime = performance.now();
    const duration = endTime - startTime;

    return { filteredResults, duration };
  };

  useEffect(() => {
    if (searchTerm) {
      setLoading(true);

      const { filteredResults, duration } = getFilteredResults(searchTerm);

      setTimeTaken(duration);
      setResults(filteredResults);
      setLoading(false);
    } else {
      setResults([]);
    }
  }, [searchTerm]);

  const handleResultSelect = (result: SearchResult) => {
    addToSearchHistory(result.title);
  };

  return (
    <div className="mt-4 w-full">
      <div className="text-sm text-gray-500 mb-4">
        {loading ? (
          <span>Loading...</span>
        ) : (
          <span>
            Found {results.length} results for "{searchTerm}" in {timeTaken.toFixed(2)} ms
          </span>
        )}
      </div>
      {results.length > 0 ? (
        <div
          className="relative"
          style={{
            height: `${rowVirtualizer.getTotalSize()}px`,
            width: '100%',
          }}
        >
          {rowVirtualizer.getVirtualItems().map((virtualRow) => {
            const result = results[virtualRow.index];
            return (
              <div
                key={result.title}
                className="absolute w-full p-1 cursor-pointer hover:bg-gray-100"
                style={{
                  top: virtualRow.start,
                  height: `${virtualRow.size}px`,
                  transform: `translateY(${virtualRow.start}px)`,
                }}
                onClick={() => handleResultSelect(result)}
              >
                <a
                  href={result.url}
                  className="text-blue-600 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {result.title}
                </a>
                <p className="text-gray-600">{result.description}</p>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-gray-500">No results found</div>
      )}
    </div>
  );
};

export default SearchResults;
