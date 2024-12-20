interface ButtonProps {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  children: React.ReactNode;
  className?: string;
}

const Button = ({ onClick, children, className }: ButtonProps) => {
  return (
    <button 
      onClick={onClick} 
      className={`text-sm bg-transparent p-1 focus:outline-none text-gray-400 hover:text-gray-500 ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
