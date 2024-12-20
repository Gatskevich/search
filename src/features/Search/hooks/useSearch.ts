import { useState, useCallback, useMemo, useEffect } from 'react';
import _debounce from 'lodash/debounce';
import { useSearchContext } from '../context/SearchContext';
import { filterResults } from '../lib/filterResults';
import { searchData } from '../data/searchData';

const useSearch = () => {
  const [autocompleteResults, setAutocompleteResults] = useState<string[]>([]);
  const { searchHistory, addToSearchHistory, setSearchTerm } = useSearchContext();
  const [currentQuery, setCurrentQuery] = useState<string>('');
  
  const searchTitles = useMemo(() => searchData.map(item => item.title), []);

  const performSearch = useCallback(
    (query: string) => {
      setCurrentQuery(query);
      if (query) {
        const allItems = [...new Set([...searchHistory, ...searchTitles])];
        const results = filterResults(allItems, query);
        setAutocompleteResults(results);
      } else {
        setAutocompleteResults([]);
      }
    },
    [searchHistory, searchTitles]
  );

  const debouncedSearch = useMemo(() => _debounce(performSearch, 300), [performSearch]);

  const handleSelectResult = useCallback(
    (term: string) => {
      addToSearchHistory(term);
      setSearchTerm(term);
    },
    [addToSearchHistory, setSearchTerm]
  );

  useEffect(() => {
    if (currentQuery) {
      const allItems = [...new Set([...searchHistory, ...searchTitles])];
      const results = filterResults(allItems, currentQuery);
      setAutocompleteResults(results);
    }
  }, [searchHistory, currentQuery, searchTitles]);

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  return {
    autocompleteResults,
    debouncedSearch,
    setAutocompleteResults,
    handleSelectResult,
  };
};

export default useSearch;
