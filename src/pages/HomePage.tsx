import MobileHeader from "@/components/MobileHeader";
import { Button } from "@/components/ui/button";
import festivalImage from "@/assets/summer-music-festival.jpg";
import councilImage from "@/assets/city-council-building.jpg";
import communityImage from "@/assets/community-meeting.jpg";

const HomePage = () => {
  return (
    <div>
      <MobileHeader />
      
      {/* Hero Banner */}
      <div className="relative">
        <img 
          src={festivalImage} 
          alt="Summer Music Festival" 
          className="w-full h-48 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4 text-white">
          <h2 className="text-2xl font-bold-accent mb-2">
            Summer Music Festival
          </h2>
          <p className="text-sm opacity-90 mb-3">
            July 15, 2024 • 7:00 PM
          </p>
          <Button variant="secondary" size="sm">
            Learn More
          </Button>
        </div>
        
        {/* Page indicators */}
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
          <div className="w-2 h-2 bg-white rounded-full"></div>
          <div className="w-2 h-2 bg-white/50 rounded-full"></div>
          <div className="w-2 h-2 bg-white/50 rounded-full"></div>
        </div>
      </div>
      
      {/* City Highlights Section */}
      <div className="p-4">
        <h3 className="text-xl font-bold mb-4 text-foreground">City Highlights</h3>
        
        <div className="space-y-4">
          <div className="city-card">
            <img 
              src={councilImage} 
              alt="City Council Building" 
              className="w-full h-32 object-cover rounded-lg mb-3"
            />
            <h4 className="font-bold text-card-foreground mb-2">
              City Council Meeting Updates
            </h4>
            <p className="text-sm text-muted-foreground mb-2">
              Latest decisions and upcoming agenda items from this week's council meeting...
            </p>
            <p className="text-xs text-muted-foreground">
              July 10, 2024
            </p>
          </div>
          
          <div className="city-card">
            <img 
              src={communityImage} 
              alt="Community Meeting" 
              className="w-full h-32 object-cover rounded-lg mb-3"
            />
            <h4 className="font-bold text-card-foreground mb-2">
              Infrastructure Upgrades
            </h4>
            <p className="text-sm text-muted-foreground mb-2">
              New water main improvements coming to downtown area...
            </p>
            <p className="text-xs text-muted-foreground">
              July 8, 2024
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;