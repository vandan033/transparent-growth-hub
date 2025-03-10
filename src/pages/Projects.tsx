
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ProjectCardProps } from "@/components/ProjectCard";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { MapPin, CalendarIcon, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

// Sample project data (using the same data as in the Dashboard)
const projectsData: ProjectCardProps[] = [
  {
    id: 1,
    title: "Municipal Water Supply Enhancement",
    description:
      "Upgrading the water distribution network to improve supply efficiency and reduce water wastage across Bharuch city.",
    location: "Bharuch City",
    budget: "₹3.5 Crore",
    progress: 65,
    startDate: "Jan 2023",
    endDate: "Dec 2023",
    status: "ongoing",
    imageUrl:
      "https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
  },
  {
    id: 2,
    title: "Rural Road Connectivity Project",
    description:
      "Construction of all-weather roads connecting remote villages to main highways, enabling better access to markets and services.",
    location: "Bharuch District",
    budget: "₹5.2 Crore",
    progress: 82,
    startDate: "Mar 2023",
    endDate: "Feb 2024",
    status: "ongoing",
    imageUrl:
      "https://images.unsplash.com/photo-1582461833047-2aaf69c632c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
  },
  {
    id: 3,
    title: "Solar-Powered Smart Schools",
    description:
      "Implementation of solar panels in government schools to provide sustainable electricity and modern digital learning facilities.",
    location: "Multiple Locations",
    budget: "₹2.8 Crore",
    progress: 100,
    startDate: "Nov 2022",
    endDate: "Oct 2023",
    status: "completed",
    imageUrl:
      "https://images.unsplash.com/photo-1629168249736-7719feda0a7a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
  },
  {
    id: 4,
    title: "Urban Waste Management System",
    description:
      "Development of integrated waste collection, segregation, and processing facilities to improve urban cleanliness and environmental sustainability.",
    location: "Bharuch Municipality",
    budget: "₹4.1 Crore",
    progress: 25,
    startDate: "Jul 2023",
    endDate: "Jun 2024",
    status: "ongoing",
    imageUrl:
      "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
  },
  {
    id: 5,
    title: "Healthcare Infrastructure Upgrade",
    description:
      "Renovating and equipping primary health centers across rural areas to improve healthcare accessibility and quality.",
    location: "Bharuch District",
    budget: "₹4.8 Crore",
    progress: 45,
    startDate: "May 2023",
    endDate: "Apr 2024",
    status: "ongoing",
    imageUrl:
      "https://images.unsplash.com/photo-1578991624414-276ef23908bf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
  },
  {
    id: 6,
    title: "Digital Village Initiative",
    description:
      "Establishing digital infrastructure and training centers in villages to bridge the digital divide and promote e-governance.",
    location: "Multiple Villages",
    budget: "₹3.2 Crore",
    progress: 70,
    startDate: "Feb 2023",
    endDate: "Jan 2024",
    status: "ongoing",
    imageUrl:
      "https://images.unsplash.com/photo-1544654803-3429ed142be4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
  },
];

// Filtering options
const statusOptions = ["all", "ongoing", "completed", "planned"];
const locationOptions = [
  "all",
  "Bharuch City",
  "Bharuch District",
  "Multiple Locations",
  "Bharuch Municipality",
  "Multiple Villages",
];

const Projects = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [filteredProjects, setFilteredProjects] = useState(projectsData);
  const [statusFilter, setStatusFilter] = useState("all");
  const [locationFilter, setLocationFilter] = useState("all");
  const [animatedItems, setAnimatedItems] = useState(false);

  useEffect(() => {
    // Check if user is logged in
    const userLoggedIn = localStorage.getItem("userLoggedIn");
    if (!userLoggedIn) {
      navigate("/login");
    } else {
      setIsLoggedIn(true);
    }

    // Animation setup
    const handleScroll = () => {
      setAnimatedItems(true);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check on initial load
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, [navigate]);

  useEffect(() => {
    // Apply filters
    let result = projectsData;
    
    if (statusFilter !== "all") {
      result = result.filter(project => project.status === statusFilter);
    }
    
    if (locationFilter !== "all") {
      result = result.filter(project => project.location === locationFilter);
    }
    
    setFilteredProjects(result);
  }, [statusFilter, locationFilter]);

  if (!isLoggedIn) {
    return null; // Don't render until auth check is complete
  }

  const statusColors = {
    ongoing: "bg-gov-yellow text-gray-800",
    completed: "bg-gov-green text-white",
    planned: "bg-gov-blue text-white",
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <div className="flex-grow pt-24">
        <div className="container mx-auto px-4 md:px-6 py-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                District Projects
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                Browse all development projects in Bharuch district
              </p>
            </div>
            <div className="mt-4 md:mt-0 grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Status
                </label>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full rounded-md border-gray-300 bg-white dark:bg-gray-800 dark:border-gray-700 py-2 px-3 shadow-sm focus:border-gov-blue focus:ring focus:ring-gov-blue focus:ring-opacity-50"
                >
                  {statusOptions.map((status) => (
                    <option key={status} value={status}>
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Location
                </label>
                <select
                  value={locationFilter}
                  onChange={(e) => setLocationFilter(e.target.value)}
                  className="w-full rounded-md border-gray-300 bg-white dark:bg-gray-800 dark:border-gray-700 py-2 px-3 shadow-sm focus:border-gov-blue focus:ring focus:ring-gov-blue focus:ring-opacity-50"
                >
                  {locationOptions.map((location) => (
                    <option key={location} value={location}>
                      {location === "all" ? "All Locations" : location}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {filteredProjects.length === 0 ? (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8 text-center">
              <h3 className="text-xl font-medium text-gray-700 dark:text-gray-300">
                No projects found
              </h3>
              <p className="text-gray-500 dark:text-gray-400 mt-2">
                Try adjusting your filters to see more projects
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project) => (
                <Card
                  key={project.id}
                  className={`overflow-hidden transition-all duration-300 hover:shadow-lg animate-on-scroll ${
                    animatedItems ? "animated" : ""
                  }`}
                >
                  <div className="relative h-48">
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 right-3">
                      <Badge 
                        className={`${
                          project.status === "ongoing" 
                            ? "bg-gov-yellow text-gray-800" 
                            : project.status === "completed" 
                            ? "bg-gov-green text-white" 
                            : "bg-gov-blue text-white"
                        }`}
                      >
                        {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                      </Badge>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      {project.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
                      {project.description}
                    </p>
                    <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm mb-3">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span>{project.location}</span>
                    </div>
                    <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm mb-4">
                      <CalendarIcon className="h-4 w-4 mr-1" />
                      <span>{project.startDate} - {project.endDate}</span>
                    </div>
                    <div className="mb-4">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-gray-600 dark:text-gray-300">Progress</span>
                        <span className="font-medium text-gov-blue">{project.progress}%</span>
                      </div>
                      <Progress value={project.progress} className="h-1.5" />
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="font-semibold text-gray-900 dark:text-white">
                        {project.budget}
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-gov-blue border-gov-blue hover:bg-gov-blue hover:text-white"
                        onClick={() => navigate(`/projects/${project.id}`)}
                      >
                        View Details
                        <ArrowRight className="ml-1 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Projects;
