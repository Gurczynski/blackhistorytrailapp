import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Trophy, MapPin, Clock, Star, Play, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const ScavengerHuntPage = () => {
  const [activeHunt, setActiveHunt] = useState<number | null>(null);
  
  const hunts = [
    {
      id: 1,
      title: "Riverfront Explorer",
      description: "Discover the hidden gems along the Halifax River",
      difficulty: "Easy",
      duration: "30-45 min",
      reward: "River Explorer Badge",
      tasks: 5,
      completed: 0,
      image: "/src/assets/riverfront-park.jpg"
    },
    {
      id: 2,
      title: "Historic Daytona",
      description: "Uncover the stories behind our city's landmarks",
      difficulty: "Medium",
      duration: "60-90 min", 
      reward: "History Buff Badge",
      tasks: 8,
      completed: 3,
      image: "/src/assets/city-council-building.jpg"
    },
    {
      id: 3,
      title: "Nature Detective",
      description: "Find and identify local wildlife and plants",
      difficulty: "Hard",
      duration: "90+ min",
      reward: "Nature Expert Badge",
      tasks: 12,
      completed: 0,
      image: "/src/assets/community-meeting.jpg"
    }
  ];

  const currentTasks = [
    { id: 1, title: "Find the bronze plaque near the bridge", completed: true },
    { id: 2, title: "Take a photo with the riverfront gazebo", completed: true },
    { id: 3, title: "Locate the historic marker stone", completed: true },
    { id: 4, title: "Scan QR code at the boat ramp", completed: false },
    { id: 5, title: "Find the hidden artistic tile", completed: false }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'text-green-600 bg-green-100';
      case 'Medium': return 'text-orange-600 bg-orange-100';
      case 'Hard': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="mobile-header">
        <Link to="/parks" className="p-1">
          <ArrowLeft size={24} />
        </Link>
        <h1 className="text-lg font-bold-accent text-center flex-1">
          Scavenger Hunt
        </h1>
        <div className="w-6" />
      </div>

      <div className="p-4">
        {activeHunt ? (
          /* Active Hunt View */
          <div>
            <div className="bg-card rounded-lg p-4 mb-6">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h2 className="text-xl font-bold text-card-foreground mb-1">
                    {hunts.find(h => h.id === activeHunt)?.title}
                  </h2>
                  <p className="text-muted-foreground text-sm">
                    {hunts.find(h => h.id === activeHunt)?.description}
                  </p>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setActiveHunt(null)}
                >
                  Exit Hunt
                </Button>
              </div>
              
              <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-4">
                <div className="flex items-center">
                  <Clock size={16} className="mr-1" />
                  {hunts.find(h => h.id === activeHunt)?.duration}
                </div>
                <div className="flex items-center">
                  <Trophy size={16} className="mr-1" />
                  {hunts.find(h => h.id === activeHunt)?.reward}
                </div>
              </div>

              <div className="mb-2">
                <div className="flex justify-between text-sm mb-1">
                  <span>Progress</span>
                  <span>3/5 tasks</span>
                </div>
                <Progress value={60} className="w-full" />
              </div>
            </div>

            {/* Task List */}
            <div className="space-y-3">
              <h3 className="font-semibold text-lg">Tasks</h3>
              {currentTasks.map((task) => (
                <div key={task.id} className={`bg-card rounded-lg p-4 border-l-4 ${task.completed ? 'border-l-green-500' : 'border-l-gray-300'}`}>
                  <div className="flex items-start">
                    <div className="flex-1">
                      <p className={`font-medium ${task.completed ? 'line-through text-muted-foreground' : 'text-card-foreground'}`}>
                        {task.title}
                      </p>
                    </div>
                    <div className="ml-3">
                      {task.completed ? (
                        <CheckCircle size={20} className="text-green-600" />
                      ) : (
                        <div className="w-5 h-5 border-2 border-gray-300 rounded-full"></div>
                      )}
                    </div>
                  </div>
                  
                  {!task.completed && (
                    <div className="mt-3 flex space-x-2">
                      <Button size="sm" variant="outline">
                        <MapPin size={14} className="mr-1" />
                        Get Hint
                      </Button>
                      <Button size="sm">
                        Mark Complete
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* Hunt Selection View */
          <div>
            {/* Header */}
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-2">AR Scavenger Hunts</h2>
              <p className="text-muted-foreground">
                Explore Daytona Beach parks through interactive challenges
              </p>
            </div>

            {/* Hunt Cards */}
            <div className="space-y-4">
              {hunts.map((hunt) => (
                <div key={hunt.id} className="bg-card rounded-lg overflow-hidden border border-border">
                  <div className="aspect-video relative">
                    <img 
                      src={hunt.image} 
                      alt={hunt.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 left-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(hunt.difficulty)}`}>
                        {hunt.difficulty}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <h3 className="font-bold text-card-foreground mb-2">
                      {hunt.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4">
                      {hunt.description}
                    </p>
                    
                    <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center">
                          <Clock size={16} className="mr-1" />
                          {hunt.duration}
                        </div>
                        <div className="flex items-center">
                          <Star size={16} className="mr-1" />
                          {hunt.tasks} tasks
                        </div>
                      </div>
                      {hunt.completed > 0 && (
                        <span className="text-primary font-medium">
                          {hunt.completed}/{hunt.tasks} completed
                        </span>
                      )}
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Trophy size={16} className="mr-1" />
                        {hunt.reward}
                      </div>
                      <Button 
                        onClick={() => setActiveHunt(hunt.id)}
                        className="flex items-center"
                      >
                        <Play size={16} className="mr-2" />
                        Start Hunt
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ScavengerHuntPage;