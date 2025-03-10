
import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { 
  MapPin, 
  Calendar, 
  BarChart3, 
  Clock, 
  FileText, 
  CheckCircle2,
  ChevronLeft,
  Building,
  Users,
  Phone
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Progress } from "@/components/ui/progress";
import { ProjectCardProps } from "@/components/ProjectCard";

// Extended project data for detail page
type ProjectDetailData = ProjectCardProps & {
  description: string;
  fullDescription: string;
  department: string;
  contactPerson: string;
  contactNumber: string;
  milestones: {
    title: string;
    date: string;
    completed: boolean;
  }[];
  documents: {
    name: string;
    type: string;
    date: string;
    url: string;
  }[];
  updates: {
    date: string;
    title: string;
    description: string;
  }[];
};

// Sample detailed projects data
const projectsDetailData: ProjectDetailData[] = [
  {
    id: 1,
    title: "Municipal Water Supply Enhancement",
    description:
      "Upgrading the water distribution network to improve supply efficiency and reduce water wastage across Bharuch city.",
    fullDescription: 
      "The Municipal Water Supply Enhancement project aims to modernize Bharuch's water distribution infrastructure to serve the growing population effectively while minimizing wastage. The project involves replacing outdated pipelines, installing smart water meters, establishing new water treatment facilities, and implementing a SCADA system for real-time monitoring and management of the water network. This comprehensive upgrade will ensure consistent water supply across all areas of Bharuch city, reduce non-revenue water loss by up to 30%, and improve water quality through advanced filtration systems.",
    location: "Bharuch City",
    budget: "₹3.5 Crore",
    progress: 65,
    startDate: "Jan 2023",
    endDate: "Dec 2023",
    status: "ongoing",
    department: "Municipal Corporation - Water Works Division",
    contactPerson: "Er. Rajesh Patel",
    contactNumber: "+91 945-678-9012",
    imageUrl:
      "https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    milestones: [
      {
        title: "Project Planning & Approval",
        date: "January 2023",
        completed: true
      },
      {
        title: "Procurement & Vendor Selection",
        date: "March 2023",
        completed: true
      },
      {
        title: "Phase 1 - Northern Zone Implementation",
        date: "June 2023",
        completed: true
      },
      {
        title: "Phase 2 - Central Zone Implementation",
        date: "September 2023",
        completed: false
      },
      {
        title: "Phase 3 - Southern Zone Implementation",
        date: "November 2023",
        completed: false
      },
      {
        title: "System Integration & Testing",
        date: "December 2023",
        completed: false
      }
    ],
    documents: [
      {
        name: "Detailed Project Report",
        type: "PDF",
        date: "December 2022",
        url: "#"
      },
      {
        name: "Technical Specifications",
        type: "DOC",
        date: "January 2023",
        url: "#"
      },
      {
        name: "Environmental Impact Assessment",
        type: "PDF",
        date: "February 2023",
        url: "#"
      },
      {
        name: "Phase 1 Completion Report",
        type: "PDF",
        date: "July 2023",
        url: "#"
      }
    ],
    updates: [
      {
        date: "July 25, 2023",
        title: "Phase 1 Successfully Completed",
        description: "The Northern Zone implementation has been successfully completed, with 98% of households now connected to the new water supply network. Water pressure has improved by 40% and initial tests show a reduction in wastage of approximately 25%."
      },
      {
        date: "August 15, 2023",
        title: "Central Zone Work Commenced",
        description: "Work on the Central Zone has officially started today. The contractor has mobilized resources and excavation for new pipeline laying has begun at three locations simultaneously."
      },
      {
        date: "September 5, 2023",
        title: "Smart Meters Installation Progress",
        description: "Over 2,000 smart water meters have been installed in households across implemented zones. The SCADA control room setup is 70% complete and is expected to be operational by end of month."
      }
    ]
  },
  {
    id: 2,
    title: "Rural Road Connectivity Project",
    description:
      "Construction of all-weather roads connecting remote villages to main highways, enabling better access to markets and services.",
    fullDescription: 
      "The Rural Road Connectivity Project is designed to improve transportation infrastructure in the rural areas of Bharuch district by constructing all-weather roads that connect remote villages to main highways and urban centers. The project covers 45 villages across 6 talukas, with a total road length of 120 kilometers. These roads are being constructed using cement concrete and bituminous technology to ensure durability during monsoon seasons. The enhanced connectivity will reduce travel times by up to 60%, improve access to healthcare and educational facilities, boost agricultural produce transportation efficiency, and stimulate economic activities in previously isolated communities.",
    location: "Bharuch District",
    budget: "₹5.2 Crore",
    progress: 82,
    startDate: "Mar 2023",
    endDate: "Feb 2024",
    status: "ongoing",
    department: "Public Works Department - Rural Infrastructure",
    contactPerson: "Er. Amit Sharma",
    contactNumber: "+91 890-123-4567",
    imageUrl:
      "https://images.unsplash.com/photo-1582461833047-2aaf69c632c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    milestones: [
      {
        title: "Project Approval & Land Acquisition",
        date: "March 2023",
        completed: true
      },
      {
        title: "Contractor Selection & Resource Mobilization",
        date: "April 2023",
        completed: true
      },
      {
        title: "Zone 1 Roads (Jambusar Taluka)",
        date: "June 2023",
        completed: true
      },
      {
        title: "Zone 2 Roads (Vagra & Amod Talukas)",
        date: "September 2023",
        completed: true
      },
      {
        title: "Zone 3 Roads (Jhagadia Taluka)",
        date: "November 2023",
        completed: false
      },
      {
        title: "Zone 4 Roads (Ankleshwar & Hansot Talukas)",
        date: "January 2024",
        completed: false
      },
      {
        title: "Final Inspection & Project Handover",
        date: "February 2024",
        completed: false
      }
    ],
    documents: [
      {
        name: "Project Master Plan",
        type: "PDF",
        date: "February 2023",
        url: "#"
      },
      {
        name: "Technical Specifications & Standards",
        type: "PDF",
        date: "March 2023",
        url: "#"
      },
      {
        name: "Zone 1 Completion Certificate",
        type: "PDF",
        date: "July 2023",
        url: "#"
      },
      {
        name: "Zone 2 Completion Certificate",
        type: "PDF",
        date: "October 2023",
        url: "#"
      }
    ],
    updates: [
      {
        date: "October 10, 2023",
        title: "Zone 2 Roads Completed Ahead of Schedule",
        description: "We're pleased to announce that Zone 2 road construction has been completed 3 weeks ahead of schedule. All 42km of roads in Vagra and Amod Talukas are now open for traffic. Initial feedback from villagers has been overwhelmingly positive."
      },
      {
        date: "October 25, 2023",
        title: "Zone 3 Progress Update",
        description: "Construction in Jhagadia Taluka is progressing well with 60% of earthwork and 40% of concrete works completed. We've encountered some rocky terrain which is being addressed with specialized equipment to maintain the project timeline."
      }
    ]
  },
  {
    id: 3,
    title: "Solar-Powered Smart Schools",
    description:
      "Implementation of solar panels in government schools to provide sustainable electricity and modern digital learning facilities.",
    fullDescription: 
      "The Solar-Powered Smart Schools initiative transforms government schools across Bharuch district into energy-independent digital learning centers. This comprehensive project installs rooftop solar panels (3-5kW capacity per school) to provide reliable electricity, establishes computer labs with internet connectivity, and implements smart classrooms with interactive teaching tools. The project covers 50 government schools, benefiting approximately 15,000 students and 500 teachers. The solar systems include battery storage to ensure uninterrupted power even during grid outages, significantly reducing the schools' electricity expenses while providing a consistent environment for digital education.",
    location: "Multiple Locations",
    budget: "₹2.8 Crore",
    progress: 100,
    startDate: "Nov 2022",
    endDate: "Oct 2023",
    status: "completed",
    department: "Education Department & Renewable Energy Cell",
    contactPerson: "Dr. Priya Mehta",
    contactNumber: "+91 789-012-3456",
    imageUrl:
      "https://images.unsplash.com/photo-1629168249736-7719feda0a7a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    milestones: [
      {
        title: "Project Planning & School Selection",
        date: "November 2022",
        completed: true
      },
      {
        title: "Procurement of Solar Equipment & IT Infrastructure",
        date: "January 2023",
        completed: true
      },
      {
        title: "Phase 1 - Urban Schools Implementation",
        date: "March 2023",
        completed: true
      },
      {
        title: "Phase 2 - Semi-Urban Schools Implementation",
        date: "June 2023",
        completed: true
      },
      {
        title: "Phase 3 - Rural Schools Implementation",
        date: "September 2023",
        completed: true
      },
      {
        title: "Teacher Training & Handover",
        date: "October 2023",
        completed: true
      }
    ],
    documents: [
      {
        name: "Project Concept Note",
        type: "PDF",
        date: "October 2022",
        url: "#"
      },
      {
        name: "Solar System Specifications",
        type: "PDF",
        date: "December 2022",
        url: "#"
      },
      {
        name: "Digital Learning Tools Manual",
        type: "PDF",
        date: "February 2023",
        url: "#"
      },
      {
        name: "Project Completion Report",
        type: "PDF",
        date: "October 2023",
        url: "#"
      }
    ],
    updates: [
      {
        date: "September 28, 2023",
        title: "Project Completion Milestone Achieved",
        description: "We're happy to announce that solar panel installation and smart classroom setup has been completed in all 50 targeted schools, completing the physical implementation phase of the project."
      },
      {
        date: "October 15, 2023",
        title: "Teacher Training Program Concluded",
        description: "The comprehensive training program for 500 teachers on utilizing the digital learning tools and maintaining the solar equipment has been successfully concluded. All schools are now fully operational with trained staff."
      },
      {
        date: "October 30, 2023",
        title: "Project Impact Assessment Initiated",
        description: "A third-party assessment of the project's impact has been initiated. Preliminary data shows a 90% reduction in electricity bills and 30% improvement in student attendance in the implemented schools."
      }
    ]
  },
  {
    id: 4,
    title: "Urban Waste Management System",
    description:
      "Development of integrated waste collection, segregation, and processing facilities to improve urban cleanliness and environmental sustainability.",
    fullDescription: 
      "The Urban Waste Management System project is transforming how Bharuch handles municipal solid waste through a comprehensive approach covering collection, segregation, transportation, processing, and disposal. The project establishes a centralized waste processing facility with 150 metric tons per day capacity, implements door-to-door segregated waste collection across all 15 wards, deploys GPS-tracked waste collection vehicles, creates two transfer stations to optimize transportation, and develops a sanitary landfill site for non-recyclable waste. The system includes a material recovery facility for recyclables and a biogas plant for organic waste conversion to energy. This integrated approach will significantly improve urban cleanliness, reduce environmental pollution, and create economic value from waste processing.",
    location: "Bharuch Municipality",
    budget: "₹4.1 Crore",
    progress: 25,
    startDate: "Jul 2023",
    endDate: "Jun 2024",
    status: "ongoing",
    department: "Municipal Corporation - Sanitation Department",
    contactPerson: "Shri Vikram Desai",
    contactNumber: "+91 654-321-0987",
    imageUrl:
      "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    milestones: [
      {
        title: "Project Planning & Land Allocation",
        date: "July 2023",
        completed: true
      },
      {
        title: "Environmental Clearances & Approvals",
        date: "September 2023",
        completed: true
      },
      {
        title: "Procurement of Equipment & Vehicles",
        date: "November 2023",
        completed: false
      },
      {
        title: "Construction of Processing Facility",
        date: "February 2024",
        completed: false
      },
      {
        title: "Door-to-Door Collection System Setup",
        date: "April 2024",
        completed: false
      },
      {
        title: "System Integration & Trial Run",
        date: "May 2024",
        completed: false
      },
      {
        title: "Full System Handover & Operations",
        date: "June 2024",
        completed: false
      }
    ],
    documents: [
      {
        name: "Detailed Project Report",
        type: "PDF",
        date: "June 2023",
        url: "#"
      },
      {
        name: "Environmental Impact Assessment",
        type: "PDF",
        date: "August 2023",
        url: "#"
      },
      {
        name: "Technical Specifications",
        type: "PDF",
        date: "September 2023",
        url: "#"
      }
    ],
    updates: [
      {
        date: "September 15, 2023",
        title: "Environmental Clearance Obtained",
        description: "We're pleased to announce that all environmental clearances for the waste processing facility and landfill site have been obtained from the State Pollution Control Board, allowing us to proceed with the construction phase."
      },
      {
        date: "October 5, 2023",
        title: "Vendor Selection Completed",
        description: "After a thorough evaluation process, vendors have been selected for supply of waste collection vehicles, bins, and processing equipment. Purchase orders have been issued and deliveries are expected to commence by early November."
      }
    ]
  }
];

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState<ProjectDetailData | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [animatedItems, setAnimatedItems] = useState(false);

  useEffect(() => {
    // Check if user is logged in
    const userLoggedIn = localStorage.getItem("userLoggedIn");
    if (!userLoggedIn) {
      navigate("/login");
    } else {
      setIsLoggedIn(true);
    }

    // Get project details
    if (id) {
      const projectData = projectsDetailData.find(p => p.id === parseInt(id));
      if (projectData) {
        setProject(projectData);
      } else {
        navigate("/projects");
      }
    }
    
    setIsLoading(false);

    // Animation setup
    const handleScroll = () => {
      setAnimatedItems(true);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check on initial load
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, [id, navigate]);

  if (!isLoggedIn || isLoading || !project) {
    return null; // Don't render until data is loaded
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
          <div className="mb-6">
            <Link 
              to="/projects" 
              className="inline-flex items-center text-gov-blue hover:text-gov-blue/80 font-medium"
            >
              <ChevronLeft className="mr-1 h-4 w-4" />
              Back to Projects
            </Link>
          </div>

          {/* Project Header */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden mb-8">
            <div className="relative h-64 sm:h-80">
              <img 
                src={project.imageUrl} 
                alt={project.title} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-6">
                <div className="mb-2">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      statusColors[project.status]
                    }`}
                  >
                    {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                  </span>
                </div>
                <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
                  {project.title}
                </h1>
                <p className="text-white/90 text-sm md:text-base max-w-3xl">
                  {project.description}
                </p>
              </div>
            </div>
            
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="flex items-center">
                <MapPin className="h-5 w-5 text-gov-blue mr-3" />
                <div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Location</div>
                  <div className="font-medium text-gray-900 dark:text-white">{project.location}</div>
                </div>
              </div>
              
              <div className="flex items-center">
                <Calendar className="h-5 w-5 text-gov-blue mr-3" />
                <div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Timeline</div>
                  <div className="font-medium text-gray-900 dark:text-white">
                    {project.startDate} - {project.endDate}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center">
                <BarChart3 className="h-5 w-5 text-gov-blue mr-3" />
                <div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Budget</div>
                  <div className="font-medium text-gray-900 dark:text-white">{project.budget}</div>
                </div>
              </div>
              
              <div className="flex items-center">
                <Building className="h-5 w-5 text-gov-blue mr-3" />
                <div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Department</div>
                  <div className="font-medium text-gray-900 dark:text-white truncate max-w-[180px]" title={project.department}>
                    {project.department}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content - Left Column */}
            <div className="lg:col-span-2 space-y-8">
              {/* Project Description */}
              <div 
                className={`bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 animate-on-scroll ${
                  animatedItems ? "animated" : ""
                }`}
              >
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Project Overview
                </h2>
                <p className="text-gray-700 dark:text-gray-300 mb-4 whitespace-pre-line">
                  {project.fullDescription}
                </p>
              </div>

              {/* Project Progress */}
              <div 
                className={`bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 animate-on-scroll ${
                  animatedItems ? "animated" : ""
                }`}
              >
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Project Progress
                </h2>
                <div className="mb-6">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600 dark:text-gray-300">Overall Progress</span>
                    <span className="font-medium text-gov-blue">{project.progress}%</span>
                  </div>
                  <Progress value={project.progress} className="h-3" />
                </div>
                
                <h3 className="font-medium text-gray-800 dark:text-gray-200 mb-4">Milestones</h3>
                <div className="space-y-4">
                  {project.milestones.map((milestone, index) => (
                    <div 
                      key={index} 
                      className="flex items-start"
                    >
                      <div className={`mt-1 mr-3 flex-shrink-0 h-5 w-5 rounded-full flex items-center justify-center ${
                        milestone.completed ? "bg-gov-green" : "bg-gray-200 dark:bg-gray-600"
                      }`}>
                        {milestone.completed && <CheckCircle2 className="h-4 w-4 text-white" />}
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                          <span className={`font-medium ${
                            milestone.completed ? "text-gray-900 dark:text-white" : "text-gray-600 dark:text-gray-400"
                          }`}>
                            {milestone.title}
                          </span>
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            {milestone.date}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Project Updates */}
              <div 
                className={`bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 animate-on-scroll ${
                  animatedItems ? "animated" : ""
                }`}
              >
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Project Updates
                </h2>
                <div className="space-y-6">
                  {project.updates.map((update, index) => (
                    <div key={index} className="relative pl-6 border-l-2 border-gov-blue/20 pb-6">
                      <div className="absolute left-[-8px] top-0 h-4 w-4 rounded-full bg-gov-blue"></div>
                      <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">{update.date}</div>
                      <h3 className="font-medium text-gray-900 dark:text-white mb-2">{update.title}</h3>
                      <p className="text-gray-700 dark:text-gray-300 text-sm">{update.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar - Right Column */}
            <div className="space-y-8">
              {/* Contact Information */}
              <div 
                className={`bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 animate-on-scroll ${
                  animatedItems ? "animated" : ""
                }`}
              >
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Contact Information
                </h2>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <Users className="h-5 w-5 text-gov-blue mr-3 mt-0.5" />
                    <div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">Project Manager</div>
                      <div className="font-medium text-gray-900 dark:text-white">{project.contactPerson}</div>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Phone className="h-5 w-5 text-gov-blue mr-3 mt-0.5" />
                    <div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">Contact Number</div>
                      <div className="font-medium text-gray-900 dark:text-white">{project.contactNumber}</div>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Building className="h-5 w-5 text-gov-blue mr-3 mt-0.5" />
                    <div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">Department</div>
                      <div className="font-medium text-gray-900 dark:text-white">{project.department}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Documents */}
              <div 
                className={`bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 animate-on-scroll ${
                  animatedItems ? "animated" : ""
                }`}
              >
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Project Documents
                </h2>
                <div className="space-y-3">
                  {project.documents.map((doc, index) => (
                    <a 
                      key={index}
                      href={doc.url}
                      className="flex items-center p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                      <div className="mr-3 p-2 bg-gov-blue/10 rounded">
                        <FileText className="h-5 w-5 text-gov-blue" />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-gray-900 dark:text-white">{doc.name}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          {doc.type} • {doc.date}
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              {/* Project Status */}
              <div 
                className={`bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 animate-on-scroll ${
                  animatedItems ? "animated" : ""
                }`}
              >
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Project Status
                </h2>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 text-gov-blue mr-3" />
                    <div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">Current Status</div>
                      <div className="font-medium text-gray-900 dark:text-white capitalize">
                        {project.status}
                      </div>
                    </div>
                  </div>
                  
                  {project.status === "ongoing" && (
                    <div>
                      <div className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                        Progress Tracking
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs">
                          <span>Start Date</span>
                          <span>Current Progress</span>
                          <span>End Date</span>
                        </div>
                        <div className="relative pt-4">
                          <div className="h-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full">
                            <div 
                              className="h-2 bg-gov-blue rounded-full" 
                              style={{ width: `${project.progress}%` }}
                            />
                          </div>
                          <div className="absolute left-0 top-0 -mt-1">
                            <div className="h-4 w-1 bg-gray-300 dark:bg-gray-600" />
                          </div>
                          <div 
                            className="absolute -mt-1 top-0"
                            style={{ left: `${project.progress}%` }}
                          >
                            <div className="h-4 w-4 rounded-full bg-gov-blue -ml-2" />
                          </div>
                          <div className="absolute right-0 top-0 -mt-1">
                            <div className="h-4 w-1 bg-gray-300 dark:bg-gray-600" />
                          </div>
                        </div>
                        <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                          <span>{project.startDate}</span>
                          <span>{project.endDate}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProjectDetail;
