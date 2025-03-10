
import { useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

// This is a simplified map implementation that uses an image
// In a production app, we would integrate with a proper mapping library like Mapbox or Google Maps
const MapSection = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleScroll = () => {
      const mapSection = document.getElementById("map-section");
      if (!mapSection) return;

      const mapSectionTop = mapSection.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      if (mapSectionTop < windowHeight * 0.75) {
        mapSection.classList.add("animated");
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check on initial load
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div id="map-section" className="py-20 relative overflow-hidden animate-on-scroll">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 lg:pr-12 mb-10 lg:mb-0 space-y-6">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Geographic Project Tracking
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Our interactive map provides real-time visibility into development projects across Bharuch district. Explore projects by location, track progress, and gain insights into regional development patterns.
            </p>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="mt-1 mr-4 flex-shrink-0 rounded-full bg-gov-blue p-1">
                  <div className="h-2 w-2 rounded-full bg-white"></div>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">Location-Based Filtering</h3>
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                    Filter projects by taluka, village, or urban area to focus on your area of interest.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="mt-1 mr-4 flex-shrink-0 rounded-full bg-gov-green p-1">
                  <div className="h-2 w-2 rounded-full bg-white"></div>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">Visual Progress Indicators</h3>
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                    Color-coded markers show project status, with detailed information available on click.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="mt-1 mr-4 flex-shrink-0 rounded-full bg-gov-yellow p-1">
                  <div className="h-2 w-2 rounded-full bg-gray-800"></div>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">Comprehensive Coverage</h3>
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                    All 8 talukas and 660+ villages of Bharuch district represented in one integrated view.
                  </p>
                </div>
              </div>
            </div>
            <div className="pt-4">
              <Link
                to="/dashboard"
                className="inline-flex items-center text-gov-blue hover:text-gov-blue/80 font-medium"
              >
                Explore the Dashboard
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
          
          <div className="lg:w-1/2 relative">
            <div className="glass-effect rounded-2xl overflow-hidden shadow-xl">
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1549396535-c1189a7d9183?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" 
                  alt="Bharuch District Map"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gov-blue/10" />
                
                {/* Project Markers - these would be dynamically generated in a real app */}
                <div className="absolute top-[30%] left-[40%] h-4 w-4 rounded-full bg-gov-blue animate-pulse">
                  <span className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap bg-white px-2 py-1 rounded text-xs font-medium shadow-md">
                    Water Project
                  </span>
                </div>
                <div className="absolute top-[50%] left-[60%] h-4 w-4 rounded-full bg-gov-green animate-pulse">
                  <span className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap bg-white px-2 py-1 rounded text-xs font-medium shadow-md">
                    School Solar Project
                  </span>
                </div>
                <div className="absolute top-[70%] left-[30%] h-4 w-4 rounded-full bg-gov-yellow animate-pulse">
                  <span className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap bg-white px-2 py-1 rounded text-xs font-medium shadow-md">
                    Road Construction
                  </span>
                </div>
              </div>
            </div>
            
            <div className="absolute -bottom-4 -right-4 -z-10 h-72 w-72 rounded-full bg-gov-blue/10 blur-3xl" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapSection;
