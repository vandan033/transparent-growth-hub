
import { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import ProjectCard, { ProjectCardProps } from "./ProjectCard";

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

const ProjectsSection = () => {
  const [animatedItems, setAnimatedItems] = useState<boolean[]>(
    Array(projectsData.length).fill(false)
  );

  useEffect(() => {
    const handleScroll = () => {
      const section = document.getElementById("projects-section");
      if (!section) return;

      const sectionTop = section.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      if (sectionTop < windowHeight * 0.75) {
        setAnimatedItems(Array(projectsData.length).fill(true));
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check on initial load
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      id="projects-section"
      className="py-20 bg-gray-50 dark:bg-gray-900"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Featured Projects
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Explore our ongoing and completed development initiatives across
            Bharuch district, each designed to improve infrastructure, services,
            and quality of life.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {projectsData.map((project, index) => (
            <div
              key={project.id}
              className={`animate-on-scroll ${
                animatedItems[index] ? "animated" : ""
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <ProjectCard {...project} />
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            to="/projects"
            className="inline-flex items-center text-gov-blue hover:text-gov-blue/80 font-medium"
          >
            View All Projects
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProjectsSection;
