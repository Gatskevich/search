import { createContext, useState, useContext, useCallback, ReactNode, useMemo } from 'react';

interface SearchContextType {
  searchTerm: string;
  searchHistory: string[];
  setSearchTerm: (term: string) => void;
  addToSearchHistory: (term: string) => void;
  removeFromSearchHistory: (term: string) => void;
}

interface SearchProviderProps {
  children: ReactNode;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const SearchProvider = ({ children }: SearchProviderProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchHistory, setSearchHistory] = useState<string[]>([]);

  const addToSearchHistory = useCallback((term: string) => {
    setSearchHistory((prevHistory) => [...new Set([term, ...prevHistory])]);
  }, []);

  const removeFromSearchHistory = useCallback((term: string) => {
    setSearchHistory((prevHistory) => prevHistory.filter(item => item !== term));
  }, []);
  
  const contextValue = useMemo(
    () => ({
      searchTerm,
      searchHistory,
      setSearchTerm,
      addToSearchHistory,
      removeFromSearchHistory,
    }),
    [searchTerm, searchHistory, addToSearchHistory, removeFromSearchHistory]
  );

  return (
    <SearchContext.Provider value={contextValue}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearchContext = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearchContext must be used within a SearchProvider');
  }
  return context;
};
