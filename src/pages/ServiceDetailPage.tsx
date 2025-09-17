import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Clock, Phone, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import testData from "@/data/testData.json";

const ServiceDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const service = testData.services.find(s => s.id === parseInt(id || '0'));

  if (!service) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-bold mb-2">Service Not Found</h2>
          <Link to="/services">
            <Button variant="outline">Back to Services</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="mobile-header">
        <Link to="/services" className="p-1">
          <ArrowLeft size={24} />
        </Link>
        <h1 className="text-lg font-bold-accent text-center flex-1">
          Service Details
        </h1>
        <div className="w-6" />
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Service Header */}
        <div className="bg-card rounded-lg p-6 mb-6">
          <h2 className="text-2xl font-bold text-card-foreground mb-3">
            {service.title}
          </h2>
          <p className="text-muted-foreground mb-4">
            {service.description}
          </p>
          
          <div className="flex items-center text-sm">
            <Clock size={16} className="mr-2 text-primary" />
            <span className="text-muted-foreground">{service.availability}</span>
          </div>
        </div>

        {/* Service Details */}
        {service.details && (
          <div className="space-y-6">
            {/* Overview */}
            <div className="bg-card rounded-lg p-4">
              <h3 className="font-semibold text-card-foreground mb-3">Overview</h3>
              <p className="text-muted-foreground">{service.details.overview}</p>
            </div>

            {/* How To */}
            {service.details.howTo && (
              <div className="bg-card rounded-lg p-4">
                <h3 className="font-semibold text-card-foreground mb-3">How to Apply</h3>
                <ol className="space-y-2">
                  {service.details.howTo.map((step, index) => (
                    <li key={index} className="flex items-start">
                      <span className="flex-shrink-0 w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm mr-3 mt-0.5">
                        {index + 1}
                      </span>
                      <span className="text-muted-foreground">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            )}

            {/* Requirements */}
            {service.details.requirements && (
              <div className="bg-card rounded-lg p-4">
                <h3 className="font-semibold text-card-foreground mb-3">Requirements</h3>
                <ul className="space-y-2">
                  {service.details.requirements.map((req, index) => (
                    <li key={index} className="flex items-center">
                      <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                      <span className="text-muted-foreground">{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Schedule */}
            {service.details.schedule && (
              <div className="bg-card rounded-lg p-4">
                <h3 className="font-semibold text-card-foreground mb-3">Collection Schedule</h3>
                <div className="space-y-3">
                  {Object.entries(service.details.schedule).map(([type, schedule]) => (
                    <div key={type} className="flex justify-between items-center">
                      <span className="font-medium capitalize">{type.replace(/([A-Z])/g, ' $1')}</span>
                      <span className="text-muted-foreground">{schedule as string}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Guidelines */}
            {service.details.guidelines && (
              <div className="bg-card rounded-lg p-4">
                <h3 className="font-semibold text-card-foreground mb-3">Guidelines</h3>
                <ul className="space-y-2">
                  {service.details.guidelines.map((guideline, index) => (
                    <li key={index} className="flex items-start">
                      <div className="w-2 h-2 bg-accent rounded-full mr-3 mt-2 flex-shrink-0"></div>
                      <span className="text-muted-foreground">{guideline}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Contact */}
            {service.details.contact && (
              <div className="bg-card rounded-lg p-4">
                <h3 className="font-semibold text-card-foreground mb-3">Contact Information</h3>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Phone size={16} className="mr-2 text-primary" />
                    <span className="text-muted-foreground">{service.details.contact}</span>
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <a href={`tel:${service.details.contact}`}>
                      Call Now
                    </a>
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="mt-8 space-y-3">
          <Button className="w-full" size="lg">
            Start Application
          </Button>
          <Button variant="outline" className="w-full" asChild>
            <a href="https://daytonabeach.gov" target="_blank" rel="noopener noreferrer">
              <ExternalLink size={16} className="mr-2" />
              Visit Official Website
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetailPage;