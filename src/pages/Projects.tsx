
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ProjectCardProps } from "@/components/ProjectCard";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { MapPin, CalendarIcon, ArrowRight, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import AddProjectModal from "@/components/AddProjectModal";
import { useToast } from "@/hooks/use-toast";

const Projects = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [projects, setProjects] = useState<ProjectCardProps[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);

  const fetchProjects = async () => {
    try {
      const { data: projectsData, error: projectsError } = await supabase
        .from("projects")
        .select(`
          *,
          project_contacts (*),
          project_milestones (*),
          project_documents (*)
        `)
        .order('created_at', { ascending: false });

      if (projectsError) throw projectsError;

      const formattedProjects: ProjectCardProps[] = projectsData.map((project) => ({
        id: project.id,
        title: project.title,
        description: project.description,
        location: project.location,
        budget: project.budget,
        progress: project.progress,
        startDate: project.start_date,
        endDate: project.end_date,
        status: project.status as "ongoing" | "completed" | "planned", // Add type assertion here
        imageUrl: project.image_url || 'https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?ixlib=rb-4.0.3',
      }));

      setProjects(formattedProjects);
    } catch (error) {
      console.error("Error fetching projects:", error);
      toast({
        title: "Error",
        description: "Failed to load projects. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session) {
          setIsLoggedIn(true);
          fetchProjects();
        } else {
          const userLoggedIn = localStorage.getItem("userLoggedIn");
          if (!userLoggedIn) {
            navigate("/login");
            return;
          }
          setIsLoggedIn(true);
          fetchProjects();
        }
      } catch (error) {
        console.error("Auth check error:", error);
        navigate("/login");
      }
    };

    checkAuth();
  }, [navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-t-gov-blue border-gray-200 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Loading projects...</p>
        </div>
      </div>
    );
  }

  if (!isLoggedIn) {
    return null;
  }

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
            <Button
              onClick={() => setShowAddModal(true)}
              className="mt-4 md:mt-0"
            >
              <Plus className="mr-2 h-4 w-4" /> Add New Project
            </Button>
          </div>

          {projects.length === 0 ? (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8 text-center">
              <h3 className="text-xl font-medium text-gray-700 dark:text-gray-300">
                No projects found
              </h3>
              <p className="text-gray-500 dark:text-gray-400 mt-2">
                Start by adding your first project
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <Card
                  key={project.id}
                  className="overflow-hidden transition-all duration-300 hover:shadow-lg"
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
      
      <AddProjectModal
        open={showAddModal}
        onOpenChange={setShowAddModal}
        onProjectAdded={fetchProjects}
      />
    </div>
  );
};

export default Projects;
