import MobileHeader from "@/components/MobileHeader";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import festivalImage from "@/assets/summer-music-festival.jpg";
import councilImage from "@/assets/city-council-building.jpg";
import communityImage from "@/assets/community-meeting.jpg";
import daytonaLogo from "@/assets/daytona-beach-logo.png";
import testData from "@/data/testData.json";

const HomePage = () => {
  const navigate = useNavigate();

  const handleSearchClick = () => {
    navigate('/search');
  };

  return (
    <div>
      <MobileHeader onSearchClick={handleSearchClick} />
      
      {/* Hero Banner */}
      <div className="relative cursor-pointer hover:transform hover:scale-[1.02] transition-transform duration-300" onClick={() => navigate('/events')}>
        <img 
          src={festivalImage} 
          alt="Summer Music Festival" 
          className="w-full h-48 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        
        {/* Logo overlay */}
        <div className="absolute top-4 left-4">
          <img 
            src={daytonaLogo} 
            alt="Daytona Beach Logo"
            className="h-12 w-auto drop-shadow-lg"
          />
        </div>
        
        <div className="absolute bottom-4 left-4 right-4 text-white">
          <h2 className="text-2xl font-bold-accent mb-2 animate-fade-in">
            Summer Music Festival
          </h2>
          <p className="text-sm opacity-90 mb-3">
            July 15, 2024 • 7:00 PM
          </p>
          <Button variant="secondary" size="sm" className="hover-scale">
            Learn More
          </Button>
        </div>
        
        {/* Page indicators */}
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
          <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
          <div className="w-2 h-2 bg-white/50 rounded-full"></div>
          <div className="w-2 h-2 bg-white/50 rounded-full"></div>
        </div>
      </div>
      
      {/* City Highlights Section */}
      <div className="p-4">
        <h3 className="text-xl font-bold mb-4 text-foreground">City Highlights</h3>
        
        <div className="space-y-4">
          {testData.cityHighlights.map((highlight) => (
            <div key={highlight.id} className="city-card hover-scale animate-fade-in">
              <img 
                src={highlight.image} 
                alt={highlight.title} 
                className="w-full h-32 object-cover rounded-lg mb-3"
              />
              <h4 className="font-bold text-card-foreground mb-2">
                {highlight.title}
              </h4>
              <p className="text-sm text-muted-foreground mb-2">
                {highlight.description}
              </p>
              <div className="flex justify-between items-center">
                <p className="text-xs text-muted-foreground">
                  {new Date(highlight.date).toLocaleDateString()}
                </p>
                <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                  {highlight.category}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;