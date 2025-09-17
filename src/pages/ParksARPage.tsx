import { 
  X, 
  HelpCircle,
  Camera,
  FileText,
  Grid3X3,
  Map,
  Search
} from "lucide-react";
import { Link } from "react-router-dom";
import parkImage from "@/assets/riverfront-park.jpg";

const ParksARPage = () => {
  const arHotspots = [
    { id: 1, x: '30%', y: '40%' },
    { id: 2, x: '60%', y: '35%' },
    { id: 3, x: '45%', y: '60%' }
  ];
  
  return (
    <div className="mobile-container relative">
      {/* AR Camera View Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${parkImage})` }}
      />
      
      {/* Header */}
      <div className="relative z-10 flex items-center justify-between p-4 bg-gradient-to-b from-black/60 to-transparent">
        <Link to="/" className="p-2 bg-black/30 rounded-full">
          <X size={24} className="text-white" />
        </Link>
        <h1 className="text-white font-bold-accent text-center flex-1 mx-4">
          Riverfront Park Interactive Experience
        </h1>
        <button className="p-2 bg-black/30 rounded-full">
          <HelpCircle size={24} className="text-white" />
        </button>
      </div>
      
      {/* AR Hotspots */}
      {arHotspots.map(hotspot => (
        <button
          key={hotspot.id}
          className="absolute z-10 w-8 h-8 bg-primary/80 rounded-full flex items-center justify-center animate-pulse"
          style={{ left: hotspot.x, top: hotspot.y }}
        >
          <span className="text-white text-sm font-bold">i</span>
        </button>
      ))}
      
      {/* Floating Scan Button */}
      <button className="absolute z-10 right-6 bottom-32 w-16 h-16 bg-accent rounded-full flex items-center justify-center shadow-lg">
        <Search size={28} className="text-white" />
      </button>
      
      {/* Bottom Info Panel */}
      <div className="absolute bottom-0 left-0 right-0 z-10 bg-mobile-header/95 backdrop-blur-sm text-white p-6 rounded-t-3xl">
        <div className="w-12 h-1 bg-white/30 rounded-full mx-auto mb-4" />
        
        <div className="flex items-start mb-4">
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center mr-3 flex-shrink-0 mt-1">
            <span className="text-white text-sm font-bold">🔑</span>
          </div>
          <div>
            <p className="font-medium mb-1">
              Welcome to Riverfront Park! Point your camera around to discover hidden stories and start a scavenger hunt.
            </p>
          </div>
        </div>
        
        {/* AR Navigation */}
        <nav className="flex justify-around items-center pt-4 border-t border-white/20">
          <button className="flex flex-col items-center space-y-1">
            <Camera size={24} />
            <span className="text-xs">Gallery</span>
          </button>
          <button className="flex flex-col items-center space-y-1">
            <FileText size={24} />
            <span className="text-xs">History</span>
          </button>
          <button className="flex flex-col items-center space-y-1 text-accent">
            <Grid3X3 size={24} />
            <span className="text-xs font-medium">Scan QR</span>
          </button>
          <button className="flex flex-col items-center space-y-1">
            <Search size={24} />
            <span className="text-xs">Hunt</span>
          </button>
          <button className="flex flex-col items-center space-y-1">
            <Map size={24} />
            <span className="text-xs">Map</span>
          </button>
        </nav>
      </div>
    </div>
  );
};

export default ParksARPage;