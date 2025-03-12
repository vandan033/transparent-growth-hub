
import { Calendar, MapPin, BarChart3, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { Progress } from "@/components/ui/progress";

export interface ProjectCardProps {
  id: string;  // Changed from number to string to match UUID from Supabase
  title: string;
  description: string;
  location: string;
  budget: string;
  progress: number;
  startDate: string;
  endDate: string;
  status: "ongoing" | "completed" | "planned";
  imageUrl: string;
}

const ProjectCard = ({
  id,
  title,
  description,
  location,
  budget,
  progress,
  startDate,
  endDate,
  status,
  imageUrl,
}: ProjectCardProps) => {
  const statusColors = {
    ongoing: "bg-gov-yellow text-gray-800",
    completed: "bg-gov-green text-white",
    planned: "bg-gov-blue text-white",
  };

  return (
    <div className="group rounded-xl overflow-hidden bg-white dark:bg-gray-800 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col h-full">
      <div className="relative overflow-hidden">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-4 right-4">
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium ${
              statusColors[status]
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </span>
        </div>
      </div>
      <div className="p-6 flex-grow flex flex-col">
        <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
          {title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
          {description}
        </p>
        <div className="space-y-3 mt-auto">
          <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
            <MapPin className="h-4 w-4 mr-2" />
            <span>{location}</span>
          </div>
          <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
            <BarChart3 className="h-4 w-4 mr-2" />
            <span>Budget: {budget}</span>
          </div>
          <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
            <Calendar className="h-4 w-4 mr-2" />
            <span>
              {startDate} - {endDate}
            </span>
          </div>
          <div className="space-y-1">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-300">Progress</span>
              <span className="font-medium text-gov-blue">{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </div>
      </div>
      <div className="px-6 pb-6">
        <Link
          to={`/projects/${id}`}
          className="block w-full py-2 text-center bg-gov-blue text-white rounded-lg hover:bg-gov-blue/90 transition-colors"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default ProjectCard;
