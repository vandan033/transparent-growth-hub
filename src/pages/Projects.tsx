
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProjectCard, { ProjectCardProps } from "@/components/ProjectCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter } from "lucide-react";

// Sample project data
const projectsData: ProjectCardProps[] = [
  {
    id: 1,
    title: "Municipal Water Supply Enhancement",
    description: "Upgrading the water distribution network to improve supply efficiency and reduce water wastage across Bharuch city.",
    location: "Bharuch City",
    budget: "₹3.5 Crore",
    progress: 65,
    startDate: "Jan 2023",
    endDate: "Dec 2023",
    status: "ongoing",
    imageUrl: "https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
  },
  {
    id: 2,
    title: "Rural Road Connectivity Project",
    description: "Construction of all-weather roads connecting remote villages to main highways, enabling better access to markets and services.",
    location: "Bharuch District",
    budget: "₹5.2 Crore",
    progress: 82,
    startDate: "Mar 2023",
    endDate: "Feb 2024",
    status: "ongoing",
    imageUrl: "https://images.unsplash.com/photo-1582461833047-2aaf69c632c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
  },
  {
    id: 3,
    title: "Solar-Powered Smart Schools",
    description: "Implementation of solar panels in government schools to provide sustainable electricity and modern digital learning facilities.",
    location: "Multiple Locations",
    budget: "₹2.8 Crore",
    progress: 100,
    startDate: "Nov 2022",
    endDate: "Oct 2023",
    status: "completed",
    imageUrl: "https://images.unsplash.com/photo-1629168249736-7719feda0a7a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
  },
  {
    id: 4,
    title: "Urban Waste Management System",
    description: "Development of integrated waste collection, segregation, and processing facilities to improve urban cleanliness and environmental sustainability.",
    location: "Bharuch Municipality",
    budget: "₹4.1 Crore",
    progress: 25,
    startDate: "Jul 2023",
    endDate: "Jun 2024",
    status: "ongoing",
    imageUrl: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
  },
  {
    id: 5,
    title: "Primary Healthcare Center Expansion",
    description: "Expanding and upgrading primary healthcare centers across rural areas to improve healthcare accessibility and quality.",
    location: "Rural Bharuch",
    budget: "₹6.7 Crore",
    progress: 45,
    startDate: "Feb 2023",
    endDate: "Mar 2024",
    status: "ongoing",
    imageUrl: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
  },
  {
    id: 6,
    title: "Smart Traffic Management System",
    description: "Implementation of AI-powered traffic signals and monitoring systems to reduce congestion and improve traffic flow in urban areas.",
    location: "Bharuch City",
    budget: "₹2.3 Crore",
    progress: 100,
    startDate: "Jul 2022",
    endDate: "Jun 2023",
    status: "completed",
    imageUrl: "https://images.unsplash.com/photo-1573094844769-8c8e72205c14?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
  },
  {
    id: 7,
    title: "Women's Skill Development Center",
    description: "Establishing training centers for women to develop vocational skills and entrepreneurship capabilities, promoting economic independence.",
    location: "Bharuch City",
    budget: "₹1.8 Crore",
    progress: 75,
    startDate: "Nov 2022",
    endDate: "Oct 2023",
    status: "ongoing",
    imageUrl: "https://images.unsplash.com/photo-1532649538693-f3a2ec1bf8bd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
  },
  {
    id: 8,
    title: "Agricultural Irrigation Network",
    description: "Development of modernized irrigation canals and water management systems to support agricultural productivity in rural areas.",
    location: "Bharuch District",
    budget: "₹8.5 Crore",
    progress: 0,
    startDate: "Oct 2023",
    endDate: "Sep 2024",
    status: "planned",
    imageUrl: "https://images.unsplash.com/photo-1558905384-41f6b466d5be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
  },
  {
    id: 9,
    title: "Digital Village Initiative",
    description: "Providing digital infrastructure and internet connectivity to rural areas to bridge the digital divide and improve access to online services.",
    location: "Rural Bharuch",
    budget: "₹4.2 Crore",
    progress: 35,
    startDate: "Apr 2023",
    endDate: "Mar 2024",
    status: "ongoing",
    imageUrl: "https://images.unsplash.com/photo-1526948531399-320e7e40f0ca?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
  },
  {
    id: 10,
    title: "River Front Development",
    description: "Beautification and development of the Narmada river front to create recreational spaces and promote tourism.",
    location: "Bharuch City",
    budget: "₹12.3 Crore",
    progress: 15,
    startDate: "May 2023",
    endDate: "Apr 2025",
    status: "ongoing",
    imageUrl: "https://images.unsplash.com/photo-1473773508845-188df298d2d1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
  },
  {
    id: 11,
    title: "Vocational Training Centers",
    description: "Setting up vocational training centers to provide skills development for youth and improve employability in modern sectors.",
    location: "Multiple Locations",
    budget: "₹3.7 Crore",
    progress: 60,
    startDate: "Feb 2023",
    endDate: "Jan 2024",
    status: "ongoing",
    imageUrl: "https://images.unsplash.com/photo-1581092921461-39b9ced33e76?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
  },
  {
    id: 12,
    title: "Urban Green Spaces Development",
    description: "Creating and enhancing parks and green spaces in urban areas to improve air quality and provide recreational facilities for citizens.",
    location: "Bharuch City",
    budget: "₹2.1 Crore",
    progress: 100,
    startDate: "Jan 2022",
    endDate: "Dec 2022",
    status: "completed",
    imageUrl: "https://images.unsplash.com/photo-1565109761376-8a9daa83e0a4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
  },
];

const Projects = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [locationFilter, setLocationFilter] = useState<string>("");
  const [filteredProjects, setFilteredProjects] = useState<ProjectCardProps[]>(projectsData);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Filter projects based on search query and filters
    let filtered = projectsData;

    if (searchQuery) {
      filtered = filtered.filter(
        (project) =>
          project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          project.location.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (statusFilter) {
      filtered = filtered.filter((project) => project.status === statusFilter);
    }

    if (locationFilter) {
      filtered = filtered.filter((project) =>
        project.location.toLowerCase().includes(locationFilter.toLowerCase())
      );
    }

    setFilteredProjects(filtered);
  }, [searchQuery, statusFilter, locationFilter]);

  // Get unique locations for the filter
  const locations = Array.from(new Set(projectsData.map((project) => project.location)));

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="flex-1 bg-gray-50 dark:bg-gray-900 pt-24">
        <div className="container mx-auto px-4 md:px-6 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Development Projects
            </h1>
            <p className="text-gray-600 dark:text-gray-300 max-w-3xl">
              Explore all development projects in Bharuch district. Track progress, view details, and stay informed about initiatives that impact your community.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search projects..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="w-full sm:w-40">
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All Statuses</SelectItem>
                      <SelectItem value="ongoing">Ongoing</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="planned">Planned</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="w-full sm:w-48">
                  <Select value={locationFilter} onValueChange={setLocationFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Location" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All Locations</SelectItem>
                      {locations.map((location) => (
                        <SelectItem key={location} value={location}>
                          {location}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <Button
                  variant="outline"
                  className="gap-2"
                  onClick={() => {
                    setSearchQuery("");
                    setStatusFilter("");
                    setLocationFilter("");
                  }}
                >
                  <Filter className="h-4 w-4" />
                  Reset
                </Button>
              </div>
            </div>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md h-96 animate-pulse"
                >
                  <div className="h-48 bg-gray-200 dark:bg-gray-700"></div>
                  <div className="p-6 space-y-4">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
                    <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-full mt-6"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProjects.map((project) => (
                <ProjectCard key={project.id} {...project} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-gray-400 dark:text-gray-500 text-lg mb-3">
                No projects found matching your criteria
              </div>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchQuery("");
                  setStatusFilter("");
                  setLocationFilter("");
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Projects;
