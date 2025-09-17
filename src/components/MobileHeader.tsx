import { Search, Menu } from "lucide-react";

interface MobileHeaderProps {
  title?: string;
  showSearch?: boolean;
  showMenu?: boolean;
  onSearchClick?: () => void;
  onMenuClick?: () => void;
}

const MobileHeader = ({ 
  title, 
  showSearch = true, 
  showMenu = false,
  onSearchClick,
  onMenuClick 
}: MobileHeaderProps) => {
  return (
    <header className="mobile-header">
      {showMenu ? (
        <button onClick={onMenuClick} className="p-1">
          <Menu size={24} />
        </button>
      ) : (
        <div className="w-6" />
      )}
      
      {title && (
        <h1 className="text-lg font-bold-accent text-center flex-1">
          {title}
        </h1>
      )}
      
      {showSearch && (
        <button onClick={onSearchClick} className="p-1">
          <Search size={24} />
        </button>
      )}
    </header>
  );
};

export default MobileHeader;