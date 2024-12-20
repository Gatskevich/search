import { ChangeEvent, forwardRef, InputHTMLAttributes, KeyboardEvent } from 'react';
import { AiOutlineClose, AiOutlineSearch } from "react-icons/ai";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void;
  placeholder?: string;
  onClear?: () => void;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ value, onChange, onKeyDown, placeholder, onClear, ...rest }, ref) => {
    return (
      <div
        id="searchBox"
        className="relative h-[46px] w-full flex items-center gap-3 px-4 border border-[#dfe1e5] rounded-full transition-all duration-200 focus-within:border-[#bebebe] focus-within:shadow-lg focus-within:shadow-[#bebebe]"
      >
        <AiOutlineSearch size={18} color="#9aa0a6" />

        <input
          className="grow outline-0 text-black/[0.87] placeholder:text-[#6c757d] focus:ring-0 transition-all duration-200"
          ref={ref}
          type="text"
          value={value}
          onChange={onChange}
          onKeyDown={onKeyDown}
          placeholder={placeholder || 'Search...'}
          {...rest}
        />

        {value && (
          <AiOutlineClose 
            size={18} 
            color="#9aa0a6" 
            onClick={onClear} 
            className="cursor-pointer absolute right-4"
          />
        )}
      </div>
    );
  }
);

export default Input;
