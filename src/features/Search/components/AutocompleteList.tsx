import { useSearchContext } from '../context/SearchContext';
import Button from '../ui/Button';
import { AiOutlineSearch } from 'react-icons/ai';
import { FiClock } from 'react-icons/fi';

interface AutocompleteListProps {
  results: string[];
  onSelect: (term: string) => void;
}

const AutocompleteList = ({ results, onSelect }: AutocompleteListProps) => {
  const { searchHistory, removeFromSearchHistory } = useSearchContext();

  return (
    <ul className="absolute left-0 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-[600px] overflow-y-auto z-10 transition-all duration-200">
      {results.map((result, index) => (
        <li
          key={index}
          className="p-3 cursor-pointer hover:bg-gray-100 flex items-center justify-between space-x-2 transition-all duration-150 ease-in-out"
          onClick={() => onSelect(result)}
        >
          <div className="flex items-center">
            {searchHistory.includes(result) ? (
              <FiClock size={16} className="text-gray-400" />
            ) : (
              <AiOutlineSearch size={16} className="text-gray-400" />
            )}
            
            <span
              className={`text-sm font-medium ml-2 ${searchHistory.includes(result) ? 'text-purple-600' : 'text-black'}`}
            >
              <span dangerouslySetInnerHTML={{ __html: result }} />
            </span>
          </div>
          {searchHistory.includes(result) && (
            <div className="flex items-center space-x-2">
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  removeFromSearchHistory(result);
                }}
              >
                Remove
              </Button>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
};

export default AutocompleteList;
