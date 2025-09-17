import { Link } from "react-router-dom";
import { ArrowLeft, Calendar, MapPin, Users } from "lucide-react";

const ParkHistoryPage = () => {
  const historyTimeline = [
    {
      year: "1926",
      title: "Bandshell Construction",
      description: "The iconic Daytona Beach Bandshell was built as part of the city's growing tourism infrastructure.",
      image: "/src/assets/summer-music-festival.jpg"
    },
    {
      year: "1950s",
      title: "Riverfront Development", 
      description: "Major expansion of Riverfront Park with new walkways and recreational facilities.",
      image: "/src/assets/riverfront-park.jpg"
    },
    {
      year: "1970s",
      title: "Community Programs Launch",
      description: "Introduction of organized recreational programs and community events in city parks.",
      image: "/src/assets/community-meeting.jpg"
    },
    {
      year: "2000s",
      title: "Modern Renovations",
      description: "Comprehensive updates to park facilities including new playgrounds and accessibility improvements.",
      image: "/src/assets/city-council-building.jpg"
    }
  ];

  const facts = [
    { icon: MapPin, label: "Total Parks", value: "28 Parks" },
    { icon: Users, label: "Annual Visitors", value: "2.3M+" },
    { icon: Calendar, label: "Events Yearly", value: "150+" }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="mobile-header">
        <Link to="/parks" className="p-1">
          <ArrowLeft size={24} />
        </Link>
        <h1 className="text-lg font-bold-accent text-center flex-1">
          Parks History
        </h1>
        <div className="w-6" />
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Hero Section */}
        <div className="relative mb-6 rounded-lg overflow-hidden">
          <img 
            src="/src/assets/riverfront-park.jpg" 
            alt="Historic park view"
            className="w-full h-48 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <h2 className="text-2xl font-bold-accent mb-2">
              Nearly a Century of Parks
            </h2>
            <p className="text-sm opacity-90">
              Discover the rich history of Daytona Beach's recreational spaces
            </p>
          </div>
        </div>

        {/* Fun Facts */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {facts.map((fact, index) => {
            const Icon = fact.icon;
            return (
              <div key={index} className="bg-card rounded-lg p-4 text-center">
                <Icon size={24} className="mx-auto text-primary mb-2" />
                <p className="text-xs text-muted-foreground mb-1">{fact.label}</p>
                <p className="font-bold text-card-foreground">{fact.value}</p>
              </div>
            );
          })}
        </div>

        {/* Timeline */}
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-foreground">Historical Timeline</h3>
          
          {historyTimeline.map((item, index) => (
            <div key={index} className="relative">
              {/* Timeline line */}
              {index < historyTimeline.length - 1 && (
                <div className="absolute left-8 top-16 w-0.5 h-16 bg-border"></div>
              )}
              
              <div className="flex items-start space-x-4">
                {/* Year badge */}
                <div className="flex-shrink-0 w-16 h-16 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-xs">{item.year}</span>
                </div>
                
                {/* Content */}
                <div className="flex-1 bg-card rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <div className="flex-1">
                      <h4 className="font-semibold text-card-foreground mb-2">
                        {item.title}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                    <img 
                      src={item.image} 
                      alt={item.title}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Legacy Section */}
        <div className="mt-8 bg-card rounded-lg p-6">
          <h3 className="font-semibold text-card-foreground mb-3">
            Our Parks Legacy
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed">
            From the historic Bandshell that has hosted countless performances to the 
            scenic Riverfront Park that connects our community to the Halifax River, 
            Daytona Beach parks have been the heart of our city for generations. These 
            spaces continue to evolve while preserving their unique character and natural beauty.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ParkHistoryPage;