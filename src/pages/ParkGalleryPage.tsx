import { Link } from "react-router-dom";
import { ArrowLeft, Camera, Download, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import testData from "@/data/testData.json";

const ParkGalleryPage = () => {
  // Sample gallery images
  const galleryImages = [
    { id: 1, url: "/src/assets/riverfront-park.jpg", title: "Riverfront Sunset", description: "Beautiful evening view of the Halifax River" },
    { id: 2, url: "/src/assets/summer-music-festival.jpg", title: "Summer Concert", description: "Live music at the bandshell" },
    { id: 3, url: "/src/assets/community-meeting.jpg", title: "Community Gathering", description: "Local families enjoying the park" },
    { id: 4, url: "/src/assets/city-council-building.jpg", title: "Historic Architecture", description: "Classic Florida design elements" }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="mobile-header">
        <Link to="/parks" className="p-1">
          <ArrowLeft size={24} />
        </Link>
        <h1 className="text-lg font-bold-accent text-center flex-1">
          Park Gallery
        </h1>
        <button className="p-1">
          <Camera size={24} />
        </button>
      </div>

      {/* Gallery Grid */}
      <div className="p-4">
        <div className="mb-4">
          <h2 className="text-xl font-bold mb-2">Daytona Beach Parks</h2>
          <p className="text-muted-foreground">
            Explore the beauty of our city's parks and recreational areas
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {galleryImages.map((image) => (
            <div key={image.id} className="relative group">
              <div className="aspect-square rounded-lg overflow-hidden bg-card">
                <img 
                  src={image.url} 
                  alt={image.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-3">
                    <h3 className="text-white font-semibold text-sm mb-1">
                      {image.title}
                    </h3>
                    <p className="text-white/80 text-xs">
                      {image.description}
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="absolute top-2 right-2 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Button size="icon" variant="secondary" className="w-8 h-8">
                    <Share2 size={14} />
                  </Button>
                  <Button size="icon" variant="secondary" className="w-8 h-8">
                    <Download size={14} />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Upload Section */}
        <div className="mt-8 bg-card rounded-lg p-6 text-center">
          <Camera size={48} className="mx-auto text-primary mb-4" />
          <h3 className="font-semibold text-card-foreground mb-2">
            Share Your Park Photos
          </h3>
          <p className="text-muted-foreground text-sm mb-4">
            Help us showcase the beauty of Daytona Beach parks
          </p>
          <Button className="w-full">
            <Camera size={16} className="mr-2" />
            Upload Photo
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ParkGalleryPage;