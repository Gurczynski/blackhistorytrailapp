import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, MapPin, Navigation, Filter, List, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import testData from "@/data/testData.json";

const ParksMapPage = () => {
  const [selectedPark, setSelectedPark] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<'map' | 'list'>('map');
  const [searchQuery, setSearchQuery] = useState('');

  // Simulate map markers
  const mapMarkers = testData.parks.map(park => ({
    ...park,
    x: Math.random() * 80 + 10, // Random position for demo
    y: Math.random() * 60 + 20
  }));

  const filteredParks = testData.parks.filter(park =>
    park.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    park.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="mobile-header">
        <Link to="/parks" className="p-1">
          <ArrowLeft size={24} />
        </Link>
        <h1 className="text-lg font-bold-accent text-center flex-1">
          Parks Map
        </h1>
        <button className="p-1">
          <Navigation size={24} />
        </button>
      </div>

      {/* Search & Controls */}
      <div className="p-4 bg-card border-b border-border">
        <div className="flex space-x-2 mb-3">
          <div className="flex-1 relative">
            <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search parks..."
              className="pl-9"
            />
          </div>
          <Button variant="outline" size="icon">
            <Filter size={16} />
          </Button>
        </div>

        {/* View Toggle */}
        <div className="flex bg-muted rounded-lg p-1">
          <button
            onClick={() => setViewMode('map')}
            className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-all flex items-center justify-center ${
              viewMode === 'map'
                ? 'bg-primary text-primary-foreground shadow-sm'
                : 'text-muted-foreground'
            }`}
          >
            <MapPin size={16} className="mr-2" />
            Map
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-all flex items-center justify-center ${
              viewMode === 'list'
                ? 'bg-primary text-primary-foreground shadow-sm'
                : 'text-muted-foreground'
            }`}
          >
            <List size={16} className="mr-2" />
            List
          </button>
        </div>
      </div>

      {viewMode === 'map' ? (
        /* Map View */
        <div className="relative flex-1">
          {/* Simulated Map Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-green-100 to-blue-100 dark:from-green-900/20 dark:to-blue-900/20">
            {/* Street grid simulation */}
            <svg className="absolute inset-0 w-full h-full opacity-20">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#666" strokeWidth="1"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>

            {/* River simulation */}
            <div className="absolute top-1/3 left-0 right-0 h-16 bg-blue-300/40 transform -rotate-12"></div>
            <div className="absolute bottom-1/4 left-0 right-0 h-12 bg-blue-300/30 transform rotate-6"></div>
          </div>

          {/* Park Markers */}
          {mapMarkers.map((park) => (
            <button
              key={park.id}
              onClick={() => setSelectedPark(park.id)}
              className={`absolute z-10 transform -translate-x-1/2 -translate-y-full transition-all ${
                selectedPark === park.id ? 'scale-125' : 'hover:scale-110'
              }`}
              style={{ left: `${park.x}%`, top: `${park.y}%` }}
            >
              <div className="relative">
                <div className="w-8 h-10 bg-primary rounded-full rounded-bl-none rotate-45 transform origin-bottom-left flex items-center justify-center shadow-lg">
                  <MapPin size={16} className="text-white -rotate-45" />
                </div>
                {selectedPark === park.id && (
                  <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 bg-white rounded-lg p-2 shadow-lg min-w-32 border border-border">
                    <p className="font-medium text-xs text-card-foreground">{park.name}</p>
                  </div>
                )}
              </div>
            </button>
          ))}

          {/* Current Location Button */}
          <Button 
            size="icon"
            className="absolute bottom-20 right-4 z-20 bg-white text-gray-700 shadow-lg hover:bg-gray-50"
          >
            <Navigation size={20} />
          </Button>
        </div>
      ) : (
        /* List View */
        <div className="p-4">
          <div className="space-y-4">
            {filteredParks.map((park) => (
              <div key={park.id} className="bg-card rounded-lg p-4 border border-border">
                <div className="flex items-start space-x-4">
                  <img 
                    src={park.images[0]} 
                    alt={park.name}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-card-foreground mb-1">
                      {park.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      {park.description}
                    </p>
                    <div className="flex items-center text-xs text-muted-foreground mb-2">
                      <MapPin size={12} className="mr-1" />
                      {park.address}
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {park.amenities.slice(0, 3).map((amenity, index) => (
                        <span key={index} className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                          {amenity}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex justify-between items-center mt-4">
                  <span className="text-sm text-muted-foreground">
                    {park.hours}
                  </span>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      Directions
                    </Button>
                    <Button size="sm">
                      Details
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Bottom Panel for Selected Park */}
      {selectedPark && viewMode === 'map' && (
        <div className="absolute bottom-0 left-0 right-0 bg-white dark:bg-gray-900 rounded-t-xl p-4 shadow-lg border-t border-border">
          {(() => {
            const park = testData.parks.find(p => p.id === selectedPark);
            return park ? (
              <div>
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="font-bold text-lg text-foreground mb-1">
                      {park.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      {park.description}
                    </p>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <MapPin size={14} className="mr-1" />
                      {park.address}
                    </div>
                  </div>
                  <button 
                    onClick={() => setSelectedPark(null)}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    ×
                  </button>
                </div>
                
                <div className="flex space-x-2">
                  <Button className="flex-1">
                    Get Directions
                  </Button>
                  <Button variant="outline">
                    View Details
                  </Button>
                </div>
              </div>
            ) : null;
          })()}
        </div>
      )}
    </div>
  );
};

export default ParksMapPage;