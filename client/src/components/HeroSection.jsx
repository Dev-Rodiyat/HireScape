import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Check } from "lucide-react";
import hero from "../assets/hero.jpg";
import Regg from "../assets/Regg.jpg";

const HeroSection = () => {
  return (
    <div className="relative min-h-screen">
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: `url(${hero})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl">
            <span className="block">Get Tasks Done with</span>
            <span className="block text-indigo-400">
              Professional Excellence
            </span>
          </h1>
          <p className="mt-3 text-base text-gray-200 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl">
            Connect with skilled professionals ready to tackle your tasks. From
            small errands to complex projects, we've got you covered.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <div className="rounded-md shadow">
              <Link
                to="/create-job"
                className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
              >
                Post a Task
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
            <div>
              <Link
                to="/jobs"
                className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-100 bg-indigo-600/20 hover:bg-indigo-600/30 md:py-4 md:text-lg md:px-10"
              >
                Find Tasks
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
