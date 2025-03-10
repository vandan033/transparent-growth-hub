
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
import { ProjectCardProps } from "@/components/ProjectCard";

// Sample project data
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
];

// Sample statistics
const statistics = {
  totalProjects: 32,
  completedProjects: 12,
  ongoingProjects: 16,
  plannedProjects: 4,
  totalBudget: "₹48.5 Cr",
  utilisedBudget: "₹23.2 Cr",
  projectsByCategory: [
    { name: "Infrastructure", count: 12 },
    { name: "Education", count: 8 },
    { name: "Healthcare", count: 6 },
    { name: "Agriculture", count: 4 },
    { name: "Others", count: 2 },
  ],
  projectsByLocation: [
    { name: "Bharuch City", count: 14 },
    { name: "Ankleshwar", count: 8 },
    { name: "Jambusar", count: 4 },
    { name: "Vagra", count: 3 },
    { name: "Others", count: 3 },
  ],
};

const Dashboard = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
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
      const dashboard = document.getElementById("dashboard-content");
      if (!dashboard) return;

      const dashboardTop = dashboard.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      if (dashboardTop < windowHeight * 0.8) {
        setAnimatedItems(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check on initial load
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, [navigate]);

  if (!isLoggedIn) {
    return null; // Don't render anything until auth check is complete
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <div 
        id="dashboard-content" 
        className="flex-grow pt-24"
      >
        <div className="container mx-auto px-4 md:px-6 py-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Project Dashboard
          </h1>

          {/* Statistics Cards */}
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

          {/* Projects Table */}
          <div 
            className={`bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-8 animate-on-scroll ${
              animatedItems ? "animated" : ""
            }`}
          >
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
                  {projectsData.map((project) => (
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

          {/* Categories and Locations */}
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

          {/* Alert Section */}
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
                  The following projects are at risk of delays or have other issues:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-300">
                  <li>
                    <span className="font-medium">Urban Waste Management System</span> - Budget allocation pending
                  </li>
                  <li>
                    <span className="font-medium">Jambusar Community Center</span> - Regulatory approvals delayed
                  </li>
                  <li>
                    <span className="font-medium">Ankleshwar Industrial Corridor</span> - Environmental clearance required
                  </li>
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
