import { Home, Calendar, Settings, MoreHorizontal, TreePine } from "lucide-react";
import { useLocation, Link } from "react-router-dom";

const MobileNavigation = () => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  const navItems = [
    { icon: Home, label: "Home", path: "/" },
    { icon: Calendar, label: "Events", path: "/events" },
    { icon: TreePine, label: "Parks", path: "/parks", isCenter: true },
    { icon: Settings, label: "Services", path: "/services" },
    { icon: MoreHorizontal, label: "More", path: "/more" }
  ];
  
  return (
    <nav className="mobile-nav">
      {navItems.map((item) => {
        const Icon = item.icon;
        const active = isActive(item.path);
        
        if (item.isCenter) {
          return (
            <Link
              key={item.path}
              to={item.path}
              className="nav-center-button"
            >
              <Icon size={24} />
            </Link>
          );
        }
        
        return (
          <Link
            key={item.path}
            to={item.path}
            className={`nav-item ${active ? 'active' : ''}`}
          >
            <Icon size={20} className="mb-1" />
            <span className="text-xs">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
};

export default MobileNavigation;