
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="relative overflow-hidden pt-24">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gov-blue/10 to-transparent -z-10" />
      
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(#1a73e8_1px,transparent_1px)] [background-size:20px_20px]" />
      </div>

      <div className="container mx-auto px-4 md:px-6 py-16 md:py-24">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 md:pr-12 space-y-6 animate-slide-right">
            <div className="inline-block rounded-full bg-gov-blue/10 px-3 py-1 text-sm font-medium text-gov-blue mb-2 animate-fade-in">
              Bharuch District Development Office
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
              <span className="block xl:inline">Transparent</span>{" "}
              <span className="block text-gov-blue xl:inline">
                Governance
              </span>
            </h1>
            <p className="mt-3 text-base text-gray-600 dark:text-gray-300 sm:mt-5 sm:text-lg md:mt-5 md:text-xl lg:mx-0 max-w-lg">
              Monitoring development projects in real-time, providing citizens with
              transparent access to government initiatives and progress.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link to="/projects">
                <button className="group bg-gov-blue hover:bg-gov-blue/90 text-white font-medium py-3 px-6 rounded-lg transition-transform duration-300 ease-in-out transform hover:-translate-y-1 flex items-center">
                  Explore Projects
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
              <Link to="/dashboard">
                <button className="bg-white hover:bg-gray-50 text-gray-800 font-medium py-3 px-6 rounded-lg border border-gray-200 transition-transform duration-300 ease-in-out transform hover:-translate-y-1">
                  View Dashboard
                </button>
              </Link>
            </div>
          </div>
          <div className="md:w-1/2 mt-12 md:mt-0 animate-slide-left">
            <div className="glass-effect rounded-2xl overflow-hidden shadow-2xl transform rotate-1 hover:rotate-0 transition-all duration-500">
              <img
                src="https://images.unsplash.com/photo-1599493758267-c6c884c7071f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
                alt="Bharuch City"
                className="w-full h-auto object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                <p className="text-white text-lg font-medium">
                  Building a Better Bharuch
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-20 grid grid-cols-2 gap-8 md:grid-cols-4 animate-slide-up">
          <div className="glass-effect rounded-lg p-6 text-center">
            <div className="text-3xl font-bold text-gov-blue mb-2">32+</div>
            <div className="text-sm text-gray-600 dark:text-gray-300">Active Projects</div>
          </div>
          <div className="glass-effect rounded-lg p-6 text-center">
            <div className="text-3xl font-bold text-gov-green mb-2">₹48Cr</div>
            <div className="text-sm text-gray-600 dark:text-gray-300">Total Funding</div>
          </div>
          <div className="glass-effect rounded-lg p-6 text-center">
            <div className="text-3xl font-bold text-gov-yellow mb-2">93%</div>
            <div className="text-sm text-gray-600 dark:text-gray-300">On-Time Completion</div>
          </div>
          <div className="glass-effect rounded-lg p-6 text-center">
            <div className="text-3xl font-bold text-gov-blue mb-2">5.2M</div>
            <div className="text-sm text-gray-600 dark:text-gray-300">Citizens Impacted</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
