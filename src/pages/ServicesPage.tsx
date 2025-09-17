import { useState } from "react";
import { 
  CreditCard, 
  FileText, 
  AlertTriangle, 
  Trees, 
  Recycle,
  Clock
} from "lucide-react";
import { Link } from "react-router-dom";
import MobileHeader from "@/components/MobileHeader";
import { Button } from "@/components/ui/button";
import testData from "@/data/testData.json";

const ServicesPage = () => {
  const [activeTab, setActiveTab] = useState('all');
  
  const tabs = [
    { id: 'all', label: 'All Services' },
    { id: 'residents', label: 'Residents' },
    { id: 'business', label: 'Business' },
    { id: 'online', label: 'Online' }
  ];

  const quickActions = [
    { icon: CreditCard, title: "Pay Utility Bill", color: "bg-blue-100 text-blue-600", serviceId: 1 },
    { icon: FileText, title: "Permits", color: "bg-orange-100 text-orange-600", serviceId: null },
    { icon: AlertTriangle, title: "Report Issue", color: "bg-red-100 text-red-600", serviceId: null },
    { icon: Trees, title: "Parks & Rec", color: "bg-green-100 text-green-600", serviceId: null }
  ];
  
  const filteredServices = activeTab === 'all' 
    ? testData.services 
    : testData.services.filter(service => service.category === activeTab);
  
  return (
    <div>
      <MobileHeader title="City Services" />
      
      {/* Service Categories */}
      <div className="px-4 pt-4">
        <div className="flex space-x-6 mb-6 border-b border-border">
          {tabs.map(tab => (
            <button 
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-3 px-1 text-sm font-medium transition-all duration-200 border-b-2 ${
                activeTab === tab.id
                  ? 'text-primary border-primary'
                  : 'text-muted-foreground border-transparent hover:text-foreground'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        
        {/* Quick Actions */}
        <div className="mb-6">
          <h2 className="text-lg font-bold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-4">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <Link 
                  key={index} 
                  to={action.serviceId ? `/services/${action.serviceId}` : '#'}
                  className="quick-action-card hover-scale animate-fade-in"
                >
                  <div className={`w-12 h-12 rounded-lg ${action.color} flex items-center justify-center mb-3`}>
                    <Icon size={24} />
                  </div>
                  <span className="text-sm font-medium text-center">
                    {action.title}
                  </span>
                </Link>
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
            {filteredServices.map((service, index) => {
              const Icon = service.icon === 'CreditCard' ? CreditCard : Recycle;
              return (
                <Link 
                  key={index} 
                  to={`/services/${service.id}`}
                  className="block hover-scale animate-fade-in"
                >
                  <div className="bg-card rounded-lg p-4 border border-border transition-all duration-200 hover:shadow-md">
                    <div className="flex items-start">
                      <div className={`w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center mr-4 flex-shrink-0`}>
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
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;