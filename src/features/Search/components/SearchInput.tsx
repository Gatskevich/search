import { useState, useCallback, ChangeEvent, KeyboardEvent, useRef, useEffect, FocusEvent} from 'react';
import useSearch from '../hooks/useSearch';
import AutocompleteList from './AutocompleteList';
import Input from '../ui/Input';
import { useSearchContext } from '../context/SearchContext';

const SearchInput = () => {
  const { searchTerm } = useSearchContext();
  const { autocompleteResults, debouncedSearch, handleSelectResult } = useSearch();

  const [text, setText] = useState(searchTerm);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const handleInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setText(value);
      debouncedSearch(value);
    },
    [debouncedSearch]
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        handleSelectResult(text);
        setIsFocused(false);
        inputRef.current?.blur();
      }
    },
    [text, handleSelectResult]
  );

  const handleSelectAutocomplete = useCallback(
    (term: string) => {
      handleSelectResult(term);
      setIsFocused(false);
      inputRef.current?.blur();
    },
    [handleSelectResult]
  );

  const handleClear = useCallback(() => {
    setText('');
    debouncedSearch('');
    inputRef.current?.focus();
  },[]);

  const handleClickOutside = useCallback((e: MouseEvent) => {
    if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
      setIsFocused(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div ref={wrapperRef} className="relative md:w-[584px]">
      <Input
        ref={inputRef}
        value={text}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onFocus={() => setIsFocused(true)}
        onClear={handleClear}
      />
      {isFocused && autocompleteResults.length > 0 && (
        <AutocompleteList
          results={autocompleteResults}
          onSelect={handleSelectAutocomplete}
        />
      )}
    </div>
  );
};

export default SearchInput;
