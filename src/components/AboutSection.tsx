
import { Award, FileText, TrendingUp, CheckCircle } from "lucide-react";

const AboutSection = () => {
  return (
    <div className="py-20 bg-white dark:bg-gray-800">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            About the District Development Office
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            The District Development Office (DDO) of Bharuch is committed to transparent governance and efficient implementation of development projects that improve citizens' lives.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="space-y-8">
            <div className="flex">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-gov-blue text-white">
                  <Award className="h-6 w-6" />
                </div>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  Mission
                </h3>
                <p className="mt-2 text-gray-600 dark:text-gray-300">
                  To facilitate sustainable and inclusive development across Bharuch district through efficient planning, implementation, and monitoring of government schemes and projects.
                </p>
              </div>
            </div>
            
            <div className="flex">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-gov-green text-white">
                  <TrendingUp className="h-6 w-6" />
                </div>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  Strategic Goals
                </h3>
                <p className="mt-2 text-gray-600 dark:text-gray-300">
                  Enhance infrastructure quality across urban and rural areas, improve public service delivery, and ensure transparent utilization of development funds.
                </p>
              </div>
            </div>
            
            <div className="flex">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-gov-yellow text-gray-900">
                  <FileText className="h-6 w-6" />
                </div>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  Transparency Initiative
                </h3>
                <p className="mt-2 text-gray-600 dark:text-gray-300">
                  This platform is part of our commitment to open governance, allowing citizens direct access to information about development activities in their communities.
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-8 shadow-md">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
              <CheckCircle className="h-5 w-5 mr-2 text-gov-green" />
              Our Key Achievements
            </h3>
            
            <div className="space-y-6">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-700 dark:text-gray-300 font-medium">Digital Village Program</span>
                  <span className="text-gov-blue dark:text-gov-blue font-medium">98%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2.5">
                  <div className="bg-gov-blue h-2.5 rounded-full" style={{ width: "98%" }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-700 dark:text-gray-300 font-medium">Clean Water Access</span>
                  <span className="text-gov-green dark:text-gov-green font-medium">85%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2.5">
                  <div className="bg-gov-green h-2.5 rounded-full" style={{ width: "85%" }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-700 dark:text-gray-300 font-medium">Rural Healthcare Centers</span>
                  <span className="text-gov-blue dark:text-gov-blue font-medium">76%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2.5">
                  <div className="bg-gov-blue h-2.5 rounded-full" style={{ width: "76%" }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-700 dark:text-gray-300 font-medium">e-Governance Implementation</span>
                  <span className="text-gov-yellow dark:text-gov-yellow font-medium">92%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2.5">
                  <div className="bg-gov-yellow h-2.5 rounded-full" style={{ width: "92%" }}></div>
                </div>
              </div>
            </div>
            
            <div className="mt-8 text-sm text-gray-600 dark:text-gray-300">
              <p>
                Based on the 2022-23 district development index and project completion metrics. Updated quarterly.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
