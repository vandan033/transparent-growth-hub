import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  BarChart3, 
  PieChart, 
  Calendar, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle2, 
  Clock 
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Progress } from "@/components/ui/progress";
import { useProjects } from "@/hooks/useProjects";
import { supabase } from "@/integrations/supabase/client";

const Dashboard = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [animatedItems, setAnimatedItems] = useState(false);
  const { data: projects, isLoading, error } = useProjects();

  const statistics = {
    totalProjects: projects?.length || 0,
    completedProjects: projects?.filter(p => p.status === "completed").length || 0,
    ongoingProjects: projects?.filter(p => p.status === "ongoing").length || 0,
    plannedProjects: projects?.filter(p => p.status === "planned").length || 0,
    totalBudget: projects?.reduce((acc, curr) => {
      const amount = parseFloat(curr.budget.replace(/[^0-9.-]+/g, ""));
      return acc + (isNaN(amount) ? 0 : amount);
    }, 0).toLocaleString('en-IN', { style: 'currency', currency: 'INR' }) || "₹0",
    utilisedBudget: "Calculating...",
    projectsByCategory: [
      { name: "Infrastructure", count: projects?.filter(p => p.title.toLowerCase().includes("infrastructure")).length || 0 },
      { name: "Education", count: projects?.filter(p => p.title.toLowerCase().includes("education")).length || 0 },
      { name: "Healthcare", count: projects?.filter(p => p.title.toLowerCase().includes("healthcare")).length || 0 },
      { name: "Agriculture", count: projects?.filter(p => p.title.toLowerCase().includes("agriculture")).length || 0 },
      { name: "Others", count: projects?.filter(p => 
        !p.title.toLowerCase().includes("infrastructure") && 
        !p.title.toLowerCase().includes("education") && 
        !p.title.toLowerCase().includes("healthcare") && 
        !p.title.toLowerCase().includes("agriculture")
      ).length || 0 },
    ],
    projectsByLocation: [
      { name: "Bharuch City", count: projects?.filter(p => p.location.includes("Bharuch")).length || 0 },
      { name: "Ankleshwar", count: projects?.filter(p => p.location.includes("Ankleshwar")).length || 0 },
      { name: "Jambusar", count: projects?.filter(p => p.location.includes("Jambusar")).length || 0 },
      { name: "Vagra", count: projects?.filter(p => p.location.includes("Vagra")).length || 0 },
      { name: "Others", count: projects?.filter(p => 
        !p.location.includes("Bharuch") && 
        !p.location.includes("Ankleshwar") && 
        !p.location.includes("Jambusar") && 
        !p.location.includes("Vagra")
      ).length || 0 },
    ],
  };

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session) {
          setIsLoggedIn(true);
          localStorage.setItem("userLoggedIn", "true");
          localStorage.setItem("userEmail", session.user.email);
        } else {
          const userLoggedIn = localStorage.getItem("userLoggedIn");
          if (!userLoggedIn) {
            navigate("/login");
            return;
          }
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.error("Auth check error:", error);
        navigate("/login");
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();

    const handleScroll = () => {
      const dashboard = document.getElementById("dashboard-content");
      if (!dashboard) return;

      const dashboardTop = dashboard.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      if (dashboardTop < windowHeight * 0.8) {
        setAnimatedItems(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-t-gov-blue border-gray-200 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    console.error("Error loading projects:", error);
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center text-red-600">
          <p>Error loading dashboard data. Please try again later.</p>
        </div>
      </div>
    );
  }

  if (!isLoggedIn) {
    return null;
  }

  const projectsAtRisk = projects?.filter(p => p.progress < 30 && p.status === "ongoing") || [];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <div id="dashboard-content" className="flex-grow pt-24">
        <div className="container mx-auto px-4 md:px-6 py-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Project Dashboard
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div 
              className={`bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md animate-on-scroll ${
                animatedItems ? "animated" : ""
              }`}
              style={{ transitionDelay: "100ms" }}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-700 dark:text-gray-200">Total Projects</h3>
                <div className="p-2 bg-gov-blue/10 rounded-lg">
                  <BarChart3 className="h-5 w-5 text-gov-blue" />
                </div>
              </div>
              <div className="text-3xl font-semibold text-gray-900 dark:text-white mb-2">
                {statistics.totalProjects}
              </div>
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                <TrendingUp className="h-4 w-4 mr-1 text-gov-green" />
                <span>3 new this month</span>
              </div>
            </div>

            <div 
              className={`bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md animate-on-scroll ${
                animatedItems ? "animated" : ""
              }`}
              style={{ transitionDelay: "200ms" }}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-700 dark:text-gray-200">Total Budget</h3>
                <div className="p-2 bg-gov-green/10 rounded-lg">
                  <PieChart className="h-5 w-5 text-gov-green" />
                </div>
              </div>
              <div className="text-3xl font-semibold text-gray-900 dark:text-white mb-2">
                {statistics.totalBudget}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                <span>{statistics.utilisedBudget} utilised</span>
              </div>
            </div>

            <div 
              className={`bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md animate-on-scroll ${
                animatedItems ? "animated" : ""
              }`}
              style={{ transitionDelay: "300ms" }}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-700 dark:text-gray-200">Completed</h3>
                <div className="p-2 bg-gov-yellow/10 rounded-lg">
                  <CheckCircle2 className="h-5 w-5 text-gov-yellow" />
                </div>
              </div>
              <div className="text-3xl font-semibold text-gray-900 dark:text-white mb-2">
                {statistics.completedProjects}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                <span>37.5% of total projects</span>
              </div>
            </div>

            <div 
              className={`bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md animate-on-scroll ${
                animatedItems ? "animated" : ""
              }`}
              style={{ transitionDelay: "400ms" }}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-700 dark:text-gray-200">In Progress</h3>
                <div className="p-2 bg-gov-blue/10 rounded-lg">
                  <Clock className="h-5 w-5 text-gov-blue" />
                </div>
              </div>
              <div className="text-3xl font-semibold text-gray-900 dark:text-white mb-2">
                {statistics.ongoingProjects}
              </div>
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                <Calendar className="h-4 w-4 mr-1" />
                <span>4 due this month</span>
              </div>
            </div>
          </div>

          <div className={`bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-8 animate-on-scroll ${
            animatedItems ? "animated" : ""
          }`}>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              Recent Projects
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-gray-500 dark:text-gray-400 border-b dark:border-gray-700">
                    <th className="pb-3 font-medium">Project Name</th>
                    <th className="pb-3 font-medium">Status</th>
                    <th className="pb-3 font-medium">Location</th>
                    <th className="pb-3 font-medium">Budget</th>
                    <th className="pb-3 font-medium">Progress</th>
                  </tr>
                </thead>
                <tbody>
                  {projects?.slice(0, 4).map((project) => (
                    <tr 
                      key={project.id} 
                      className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-750 cursor-pointer"
                      onClick={() => navigate(`/projects/${project.id}`)}
                    >
                      <td className="py-4 font-medium text-gray-900 dark:text-white">
                        {project.title}
                      </td>
                      <td className="py-4">
                        <span 
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            project.status === "ongoing" 
                              ? "bg-gov-yellow/20 text-gov-yellow" 
                              : project.status === "completed" 
                              ? "bg-gov-green/20 text-gov-green" 
                              : "bg-gov-blue/20 text-gov-blue"
                          }`}
                        >
                          {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                        </span>
                      </td>
                      <td className="py-4 text-gray-600 dark:text-gray-300">
                        {project.location}
                      </td>
                      <td className="py-4 text-gray-600 dark:text-gray-300">
                        {project.budget}
                      </td>
                      <td className="py-4 w-36">
                        <div className="flex flex-col space-y-1">
                          <div className="flex justify-between text-xs">
                            <span className="text-gray-600 dark:text-gray-300">Progress</span>
                            <span className="font-medium text-gov-blue">{project.progress}%</span>
                          </div>
                          <Progress value={project.progress} className="h-1.5" />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div 
              className={`bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 animate-on-scroll ${
                animatedItems ? "animated" : ""
              }`}
              style={{ transitionDelay: "100ms" }}
            >
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                Projects by Category
              </h2>
              <div className="space-y-4">
                {statistics.projectsByCategory.map((category) => (
                  <div key={category.name}>
                    <div className="flex justify-between mb-1">
                      <span className="text-gray-700 dark:text-gray-300 font-medium">{category.name}</span>
                      <span className="text-gov-blue dark:text-gov-blue">{category.count}</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-gov-blue h-2 rounded-full" 
                        style={{ width: `${(category.count / statistics.totalProjects) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div 
              className={`bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 animate-on-scroll ${
                animatedItems ? "animated" : ""
              }`}
              style={{ transitionDelay: "200ms" }}
            >
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                Projects by Location
              </h2>
              <div className="space-y-4">
                {statistics.projectsByLocation.map((location) => (
                  <div key={location.name}>
                    <div className="flex justify-between mb-1">
                      <span className="text-gray-700 dark:text-gray-300 font-medium">{location.name}</span>
                      <span className="text-gov-green dark:text-gov-green">{location.count}</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-gov-green h-2 rounded-full" 
                        style={{ width: `${(location.count / statistics.totalProjects) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div 
            className={`bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-8 animate-on-scroll ${
              animatedItems ? "animated" : ""
            }`}
            style={{ transitionDelay: "300ms" }}
          >
            <div className="flex items-start">
              <div className="flex-shrink-0 mr-4">
                <div className="p-2 bg-gov-yellow/20 rounded-full">
                  <AlertTriangle className="h-6 w-6 text-gov-yellow" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">
                  Projects Requiring Attention
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  The following projects are at risk of delays or have low progress:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-300">
                  {projectsAtRisk.map(project => (
                    <li key={project.id}>
                      <span className="font-medium">{project.title}</span> - Progress at {project.progress}%
                    </li>
                  ))}
                  {projectsAtRisk.length === 0 && (
                    <li>No projects currently at risk</li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
