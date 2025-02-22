import React from "react";
import { Link } from "react-router-dom";
import bgimage from "../assets/image1.png";
import { Clock, Edit, Smartphone } from "lucide-react";
import image from "../assets/gne.png";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-24">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
              <span className="block">Document your journey,</span>
              <span className="block text-indigo-600">transform your life</span>
            </h1>
            <p className="mt-6 text-base text-gray-500 sm:text-lg md:text-xl">
              JournalMind helps you track your thoughts, mood patterns, and personal growth through intuitive journaling and powerful analytics.
            </p>
            <div className="mt-8 sm:flex sm:justify-center lg:justify-start">
              <div className="rounded-md shadow">
                <Link
                  to="/signup"
                  className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
                >
                  Get started
                </Link>
              </div>
              <div className="mt-3 sm:mt-0 sm:ml-3">
                <Link
                  to="/login"
                  className="w-full flex items-center justify-center px-8 py-3 border border-gray-300 rounded-md text-base font-medium text-indigo-600 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10"
                >
                  Log in
                </Link>
              </div>
            </div>
          </div>
          <div className="mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center">
            <div className="relative mx-auto w-full rounded-lg lg:max-w-md">
              <div className="relative block w-full rounded-lg overflow-hidden">
                <img
                  src={bgimage}
                  alt="Journal app interface preview"
                  className="w-full"
                />
                {/* <div className="absolute inset-0 w-full h-full flex items-center justify-center">
                  <svg className="h-12 w-12 text-indigo-500" fill="currentColor" viewBox="0 0 84 84">
                    <circle opacity="0.9" cx="42" cy="42" r="42" fill="white" />
                    <path d="M55 42L35 55V29L55 42Z" />
                  </svg>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>


      {/* How It Works Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 font-medium text-sm mb-4">How It Works</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Start journaling in three simple steps
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Step 1 */}
            <div className="flex flex-col items-center text-center">
              <div className="relative">
                <div className="w-20 h-20 bg-indigo-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-6">1</div>
                <div className="hidden md:block absolute top-10 left-20 w-full border-t-2 border-dashed border-indigo-200"></div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Create an account</h3>
              <p className="text-gray-600">
                Sign up in seconds. No credit card required to get started with our free plan.
              </p>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center text-center">
              <div className="relative">
                <div className="w-20 h-20 bg-indigo-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-6">2</div>
                <div className="hidden md:block absolute top-10 left-20 w-full border-t-2 border-dashed border-indigo-200"></div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Write your first entry</h3>
              <p className="text-gray-600">
                Our intuitive editor guides you with optional prompts to inspire your writing.
              </p>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center text-center">
              <div>
                <div className="w-20 h-20 bg-indigo-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-6">3</div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Build a journaling habit</h3>
              <p className="text-gray-600">
                Customize reminders to help you maintain consistency and watch your journal grow.
              </p>
            </div>
          </div>
        </div>
      </section>


      {/* Time for Reflection Section */}
      <section className="py-20 bg-gradient-to-b from-indigo-600 to-indigo-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <span className="inline-block px-3 py-1 rounded-full bg-indigo-500 bg-opacity-30 text-white font-medium text-sm mb-4">Time For Reflection</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Your journaling journey begins today
            </h2>
            <p className="text-xl text-indigo-100 mb-8">
              Start building a meaningful record of your life, one day at a time.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/signup"
                className="px-8 py-4 bg-white text-indigo-600 rounded-lg hover:bg-gray-100 transition-colors shadow-lg font-medium"
              >
                Create Your Journal
              </Link>
              <Link
                to="/login"
                className="px-8 py-4 bg-indigo-500 text-white border border-indigo-400 rounded-lg hover:bg-indigo-700 transition-colors font-medium"
              >
                Sign In
              </Link>
            </div>

            <div className="mt-12 grid grid-cols-3 gap-6 text-center">
              <div>
                <div className="flex justify-center">
                  <Edit className="h-8 w-8 text-indigo-300" />
                </div>
                <h3 className="mt-2 text-xl font-medium">No Limits</h3>
                <p className="mt-1 text-indigo-200">Write as much as you want</p>
              </div>
              <div>
                <div className="flex justify-center">
                  <Clock className="h-8 w-8 text-indigo-300" />
                </div>
                <h3 className="mt-2 text-xl font-medium">Auto-Saving</h3>
                <p className="mt-1 text-indigo-200">Never lose your thoughts</p>
              </div>
              <div>
                <div className="flex justify-center">
                  <Smartphone className="h-8 w-8 text-indigo-300" />
                </div>
                <h3 className="mt-2 text-xl font-medium">Multi-Device</h3>
                <p className="mt-1 text-indigo-200">Access from anywhere</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 md:flex md:items-center md:justify-between lg:px-8">
          <div className="flex justify-center space-x-6 md:order-2">
            <a href="#" className="text-gray-400 hover:text-gray-500">
              <span className="sr-only">Privacy Policy</span>
              <span className="text-sm">Privacy Policy</span>
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-500">
              <span className="sr-only">Terms</span>
              <span className="text-sm">Terms of Service</span>
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-500">
              <span className="sr-only">Contact Us</span>
              <span className="text-sm">Contact Us</span>
            </a>
          </div>
          <div className="mt-8 md:mt-0 md:order-1">
            <p className="text-center text-base text-gray-400">
              &copy; 2025 JournalMind. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;