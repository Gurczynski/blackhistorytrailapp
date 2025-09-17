import { 
  CreditCard, 
  FileText, 
  AlertTriangle, 
  Trees, 
  Recycle,
  Clock
} from "lucide-react";
import MobileHeader from "@/components/MobileHeader";
import { Button } from "@/components/ui/button";

const ServicesPage = () => {
  const quickActions = [
    { icon: CreditCard, title: "Pay Utility Bill", color: "bg-blue-100 text-blue-600" },
    { icon: FileText, title: "Permits", color: "bg-orange-100 text-orange-600" },
    { icon: AlertTriangle, title: "Report Issue", color: "bg-red-100 text-red-600" },
    { icon: Trees, title: "Parks & Rec", color: "bg-green-100 text-green-600" }
  ];
  
  const residentServices = [
    {
      icon: CreditCard,
      title: "Pay Your Utility Bill",
      description: "Access online portal for water bills, view payment history, and manage your account",
      availability: "Available 24/7",
      color: "bg-blue-50 text-blue-600"
    },
    {
      icon: Recycle,
      title: "Garbage & Recycling", 
      description: "Collection schedules, waste rates, and recycling guidelines",
      availability: "Weekly collection",
      color: "bg-green-50 text-green-600"
    }
  ];
  
  return (
    <div>
      <MobileHeader title="City Services" />
      
      {/* Service Categories */}
      <div className="px-4 pt-4">
        <div className="flex space-x-6 mb-6">
          <button className="text-primary font-medium border-b-2 border-primary pb-2">
            All Services
          </button>
          <button className="text-muted-foreground pb-2">
            Residents
          </button>
          <button className="text-muted-foreground pb-2">
            Business
          </button>
          <button className="text-muted-foreground pb-2">
            Online
          </button>
        </div>
        
        {/* Quick Actions */}
        <div className="mb-6">
          <h2 className="text-lg font-bold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-4">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <div key={index} className="quick-action-card">
                  <div className={`w-12 h-12 rounded-lg ${action.color} flex items-center justify-center mb-3`}>
                    <Icon size={24} />
                  </div>
                  <span className="text-sm font-medium text-center">
                    {action.title}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
        
        {/* For Our Residents */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold">For Our Residents</h2>
            <div className="w-6 h-6 bg-primary rounded flex items-center justify-center">
              <span className="text-white text-xs">🏠</span>
            </div>
          </div>
          
          <div className="space-y-3">
            {residentServices.map((service, index) => {
              const Icon = service.icon;
              return (
                <div key={index} className="bg-card rounded-lg p-4 border border-border">
                  <div className="flex items-start">
                    <div className={`w-10 h-10 rounded-lg ${service.color} flex items-center justify-center mr-4 flex-shrink-0`}>
                      <Icon size={20} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-card-foreground mb-1">
                        {service.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        {service.description}
                      </p>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Clock size={12} className="mr-1" />
                        {service.availability}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;