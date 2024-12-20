import { useSearchContext } from '../../features/Search/context/SearchContext';
import SearchInput from '../../features/Search/components/SearchInput';
import SearchResults from '../../features/Search/components/SearchResults';

const SearchPage = () => {
  const { searchTerm } = useSearchContext();

  return (
    <div className="p-4">
      <SearchInput />
      {searchTerm && <SearchResults />}
    </div>
  );
};

export default SearchPage;
