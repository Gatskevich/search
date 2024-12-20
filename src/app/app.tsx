import { SearchProvider } from '../features/Search/context/SearchContext';
import SearchPage from '../pages/SearchPage';

const App = () => {
  return (
    <SearchProvider>
      <SearchPage />
    </SearchProvider>
  );
};

export default App;
