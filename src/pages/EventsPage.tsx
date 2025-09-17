import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import MobileHeader from "@/components/MobileHeader";
import { Button } from "@/components/ui/button";
import festivalImage from "@/assets/summer-music-festival.jpg";
import communityImage from "@/assets/community-meeting.jpg";

const EventsPage = () => {
  const [viewMode, setViewMode] = useState<'calendar' | 'list'>('calendar');
  const [selectedDate, setSelectedDate] = useState(23);
  const [currentMonth] = useState('July 2024');
  
  const eventDays = [4, 15, 19, 23, 25]; // Days that have events
  
  const events = [
    {
      id: 1,
      title: "Summer Music Festival",
      time: "7:00 PM - 11:00 PM",
      image: festivalImage
    },
    {
      id: 2,
      title: "Community Meeting",
      time: "6:00 PM - 8:00 PM", 
      image: communityImage
    }
  ];
  
  const generateCalendar = () => {
    const daysInMonth = 31;
    const firstDay = 1; // Monday
    const days = [];
    
    // Add empty cells for days before the first of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(
        <div key={`empty-${i}`} className="calendar-day text-muted-foreground">
          {30 + i}
        </div>
      );
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const isSelected = day === selectedDate;
      const hasEvent = eventDays.includes(day);
      
      days.push(
        <button
          key={day}
          onClick={() => setSelectedDate(day)}
          className={`calendar-day hover:bg-muted ${
            isSelected ? 'selected' : ''
          } ${hasEvent ? 'has-event' : ''}`}
        >
          {day}
        </button>
      );
    }
    
    return days;
  };
  
  return (
    <div>
      <MobileHeader title="Events" />
      
      {/* View Toggle */}
      <div className="p-4 pb-0">
        <div className="flex bg-muted rounded-full p-1">
          <button
            onClick={() => setViewMode('calendar')}
            className={`flex-1 py-2 px-4 rounded-full text-sm font-medium transition-all ${
              viewMode === 'calendar'
                ? 'bg-primary text-primary-foreground shadow-sm'
                : 'text-muted-foreground'
            }`}
          >
            Calendar View
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`flex-1 py-2 px-4 rounded-full text-sm font-medium transition-all ${
              viewMode === 'list'
                ? 'bg-primary text-primary-foreground shadow-sm'
                : 'text-muted-foreground'
            }`}
          >
            List View
          </button>
        </div>
      </div>
      
      {/* Calendar Header */}
      <div className="flex items-center justify-between px-4 py-3">
        <button className="p-1">
          <ChevronLeft size={20} />
        </button>
        <h2 className="text-lg font-bold">{currentMonth}</h2>
        <button className="p-1">
          <ChevronRight size={20} />
        </button>
      </div>
      
      {/* Calendar Grid */}
      <div className="px-4">
        <div className="grid grid-cols-7 gap-1 mb-2">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="text-center text-sm font-medium text-muted-foreground py-2">
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1 mb-6">
          {generateCalendar()}
        </div>
      </div>
      
      {/* Selected Date Events */}
      <div className="px-4">
        <h3 className="font-bold text-lg mb-3">July {selectedDate}, 2024</h3>
        
        <div className="space-y-3">
          {events.map(event => (
            <div key={event.id} className="flex items-center bg-card-subtle rounded-lg p-3">
              <img
                src={event.image}
                alt={event.title}
                className="w-12 h-12 rounded-lg object-cover mr-3"
              />
              <div className="flex-1">
                <h4 className="font-medium text-card-foreground">{event.title}</h4>
                <p className="text-sm text-muted-foreground">{event.time}</p>
              </div>
              <Button variant="outline" size="sm">
                Details
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventsPage;