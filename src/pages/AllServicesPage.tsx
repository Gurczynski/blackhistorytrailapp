import { 
  Search,
  Menu,
  CreditCard,
  Recycle,
  Trees,
  FileText,
  AlertTriangle,
  Shield,
  Building,
  TrendingUp,
  ChevronRight
} from "lucide-react";
import MobileHeader from "@/components/MobileHeader";

const AllServicesPage = () => {
  const residentServices = [
    { icon: CreditCard, title: "Pay Utility Bill" },
    { icon: Recycle, title: "Garbage & Recycling" },
    { icon: Trees, title: "Parks & Recreation" },
    { icon: FileText, title: "Permits & Licensing" },
    { icon: AlertTriangle, title: "Report a Concern" },
    { icon: Shield, title: "Animal Services" },
    { icon: Shield, title: "Public Safety" }
  ];
  
  const businessServices = [
    { icon: Building, title: "Business Licensing" },
    { icon: TrendingUp, title: "Economic Development" },
    { icon: FileText, title: "Development Services & Trades" }
  ];
  
  return (
    <div>
      <MobileHeader 
        title="All Services & Info" 
        showMenu={true}
        onMenuClick={() => {}}
      />
      
      {/* Search Bar */}
      <div className="p-4 pb-0">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
          <input
            type="text"
            placeholder="Search all city services..."
            className="w-full pl-10 pr-4 py-3 bg-muted rounded-lg border-0 text-foreground placeholder-muted-foreground"
          />
        </div>
      </div>
      
      <div className="p-4">
        {/* For Residents Section */}
        <div className="mb-8">
          <h2 className="text-sm font-bold text-muted-foreground mb-4 tracking-wide">
            FOR RESIDENTS
          </h2>
          
          <div className="space-y-1">
            {residentServices.map((service, index) => {
              const Icon = service.icon;
              return (
                <div key={index} className="service-card">
                  <div className="flex items-center">
                    <Icon 
                      size={20} 
                      className="text-primary mr-4 flex-shrink-0" 
                    />
                    <span className="font-medium text-foreground">
                      {service.title}
                    </span>
                  </div>
                  <ChevronRight size={20} className="text-muted-foreground" />
                </div>
              );
            })}
          </div>
        </div>
        
        {/* Business & Development Section */}
        <div>
          <h2 className="text-sm font-bold text-muted-foreground mb-4 tracking-wide">
            BUSINESS & DEVELOPMENT
          </h2>
          
          <div className="space-y-1">
            {businessServices.map((service, index) => {
              const Icon = service.icon;
              return (
                <div key={index} className="service-card">
                  <div className="flex items-center">
                    <Icon 
                      size={20} 
                      className="text-primary mr-4 flex-shrink-0" 
                    />
                    <span className="font-medium text-foreground">
                      {service.title}
                    </span>
                  </div>
                  <ChevronRight size={20} className="text-muted-foreground" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllServicesPage;