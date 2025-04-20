'use client';

import React, { useState, useEffect } from 'react';
import { ChevronDown, Menu, ArrowRight } from 'lucide-react';

const ThreeTreesPage = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleDropdown = (menu: string) => {
    if (activeDropdown === menu) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(menu);
    }
  };

  return (
    <div className="relative min-h-screen bg-gray-100">
      {/* Hero Section with Background Image */}
      <div className="h-screen relative">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('/api/placeholder/1600/900')`,
            filter: 'brightness(0.85)'
          }}
        ></div>
        
        {/* Navigation Bar - Transparent with Gradient */}
        <header 
          className={`fixed w-full top-0 z-50 transition-all duration-300 ${
            scrolled ? 'bg-white shadow-md' : 'bg-gradient-to-b from-black/40 to-transparent'
          }`}
        >
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            {/* Logo */}
            <div className="flex items-center">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${scrolled ? 'bg-blue-700' : 'bg-blue-600'}`}>
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
                  <path d="M12 6.25278V19.2528M12 6.25278C10.8321 5.48018 8.61539 4.25 6.5 5C4.38461 5.75 4 7.75 4 9.5C4 15 12 19.2528 12 19.2528M12 6.25278C13.1679 5.48018 15.3846 4.25 17.5 5C19.6154 5.75 20 7.75 20 9.5C20 15 12 19.2528 12 19.2528" 
                    stroke={scrolled ? "white" : "white"} strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <div className="ml-3">
                <div className={`font-bold text-lg ${scrolled ? 'text-blue-800' : 'text-white'}`}>THREE TREES</div>
                <div className={`text-xs ${scrolled ? 'text-gray-600' : 'text-gray-200'}`}>CENTER FOR CHANGE</div>
              </div>
            </div>
            
            {/* Desktop Navigation - Hidden on Mobile */}
            <div className="hidden md:flex items-center space-x-1">
              {/* Court-Ordered Classes */}
              <div className="relative group">
                <button 
                  className={`px-3 py-2 rounded-md flex items-center ${
                    scrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/10'
                  }`}
                  onClick={() => toggleDropdown('court')}
                >
                  <span className="font-medium">COURT-ORDERED CLASSES</span>
                  <ChevronDown className="ml-1 h-4 w-4" />
                </button>
                
                {activeDropdown === 'court' && (
                  <div className="absolute left-0 mt-2 w-80 bg-white rounded-md shadow-lg overflow-hidden z-20">
                    <div className="p-4">
                      <h3 className="text-lg font-bold text-blue-800 mb-3">Court-Ordered Classes Overview</h3>
                      <div className="grid grid-cols-1 gap-2">
                        <a href="#" className="p-2 hover:bg-gray-50 rounded">
                          <div className="font-medium">Domestic Violence</div>
                          <p className="text-sm text-gray-600">Classes focused on preventing and addressing domestic violence issues.</p>
                        </a>
                        <a href="#" className="p-2 hover:bg-gray-50 rounded">
                          <div className="font-medium">Anger Management</div>
                          <p className="text-sm text-gray-600">Learn effective techniques to manage and control anger responses.</p>
                        </a>
                        <a href="#" className="p-2 hover:bg-gray-50 rounded">
                          <div className="font-medium">Substance Abuse</div>
                          <p className="text-sm text-gray-600">Support and education for overcoming substance abuse challenges.</p>
                        </a>
                        <a href="#" className="p-2 hover:bg-gray-50 rounded">
                          <div className="font-medium">Peaceful Parenting</div>
                          <p className="text-sm text-gray-600">Develop positive parenting skills and family relationships.</p>
                        </a>
                      </div>
                      <div className="mt-4">
                        <button className="w-full bg-blue-600 text-white py-2 rounded">
                          Sign Up for Court-Ordered Classes
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              {/* College Programs */}
              <div className="relative group">
                <button 
                  className={`px-3 py-2 rounded-md flex items-center ${
                    scrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/10'
                  }`}
                  onClick={() => toggleDropdown('college')}
                >
                  <span className="font-medium">COLLEGE PROGRAMS</span>
                  <ChevronDown className="ml-1 h-4 w-4" />
                </button>
                
                {activeDropdown === 'college' && (
                  <div className="absolute left-0 mt-2 w-80 bg-white rounded-md shadow-lg overflow-hidden z-20">
                    <div className="p-4">
                      <h3 className="text-lg font-bold text-blue-800 mb-3">College Programs</h3>
                      <div className="grid grid-cols-1 gap-2">
                        <a href="#" className="p-2 hover:bg-gray-50 rounded">
                          <div className="font-medium">Conflict Resolution</div>
                          <p className="text-sm text-gray-600">Learn effective strategies for resolving conflicts.</p>
                        </a>
                        <a href="#" className="p-2 hover:bg-gray-50 rounded">
                          <div className="font-medium">Responsible Relationships</div>
                          <p className="text-sm text-gray-600">Develop skills for building healthy relationships.</p>
                        </a>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Corporate & Hospitals */}
              <div className="relative group">
                <button 
                  className={`px-3 py-2 rounded-md flex items-center ${
                    scrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/10'
                  }`}
                  onClick={() => toggleDropdown('corporate')}
                >
                  <span className="font-medium">CORPORATE & HOSPITALS</span>
                  <ChevronDown className="ml-1 h-4 w-4" />
                </button>
              </div>
              
              {/* About Us */}
              <div className="relative group">
                <button 
                  className={`px-3 py-2 rounded-md flex items-center ${
                    scrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/10'
                  }`}
                  onClick={() => toggleDropdown('about')}
                >
                  <span className="font-medium">ABOUT US</span>
                  <ChevronDown className="ml-1 h-4 w-4" />
                </button>
              </div>
              
              <div className="mx-2 h-8 w-px bg-white/20"></div>
              
              {/* Action Buttons */}
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium">
                ENROLL NOW
              </button>
              
              <button className={`px-4 py-2 rounded-md font-medium ${
                scrolled ? 'border border-blue-600 text-blue-600 hover:bg-blue-50' : 'border border-white text-white hover:bg-white/10'
              }`}>
                SIGN IN PORTAL
              </button>
            </div>
            
            {/* Mobile Menu Button - Only on Mobile */}
            <button className="md:hidden text-white">
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </header>
        
        {/* Hero Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
            Evidence-based<br />behavioral change<br />programs that work.
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mb-8 bg-black/30 p-2 rounded-md">
            Court-mandated classes, campus interventions, and workplace training 
            powered by our Cognitive Behavioral Inquiry (CBI) method.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-medium flex items-center justify-center">
              Enroll Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
            <button className="border border-white text-white px-6 py-3 rounded-md font-medium hover:bg-white/10">
              Contact Us
            </button>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-0 right-0 flex justify-center animate-bounce">
          <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
      
      {/* Trust Bar */}
      <div className="bg-white py-6 border-b border-gray-200">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mb-2">
                <svg className="w-5 h-5 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <p className="text-sm font-medium">Evidence-Based</p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mb-2">
                <svg className="w-5 h-5 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                </svg>
              </div>
              <p className="text-sm font-medium">40,000+ Lives Changed</p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mb-2">
                <svg className="w-5 h-5 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
              </div>
              <p className="text-sm font-medium">15+ Years Experience</p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mb-2">
                <svg className="w-5 h-5 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <p className="text-sm font-medium">Certified Professionals</p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mb-2">
                <svg className="w-5 h-5 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <p className="text-sm font-medium">Secure Online Learning</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Three Pillars Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-blue-800 mb-3">The Three Pillars of Lasting Change</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              This evidence-based approach has helped over 40,000 individuals create meaningful, 
              lasting change by addressing all three dimensions of human experience, ensuring 
              improvements become integrated into participants&apos; daily lives.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="w-24 h-24 mx-auto mb-6">
                <div className="w-full h-full rounded-full border-4 border-green-600 bg-green-50"></div>
              </div>
              <h3 className="text-xl font-bold mb-3 text-green-800">Emotional Resilience</h3>
              <p className="text-gray-600">
                Developing the capacity to recognize, understand, and effectively manage emotional 
                responses to stressors and challenges, creating a foundation for healthier relationships.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="w-24 h-24 mx-auto mb-6">
                <div className="w-full h-full rounded-full border-4 border-blue-600 bg-blue-50"></div>
              </div>
              <h3 className="text-xl font-bold mb-3 text-blue-800">Clear Thinking</h3>
              <p className="text-gray-600">
                Identifying and restructuring thought patterns that perpetuate harmful behaviors while 
                enhancing rational thinking and promoting better decision-making in challenging situations.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="w-24 h-24 mx-auto mb-6">
                <div className="w-full h-full rounded-full border-4 border-green-500 bg-green-50"></div>
              </div>
              <h3 className="text-xl font-bold mb-3 text-green-800">Positive Action</h3>
              <p className="text-gray-600">
                Establishing and maintaining positive action patterns that lead to meaningful outcomes 
                and reinforce long-term change through practical skills development and sustainable habit formation.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Programs Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-blue-800 mb-3">Our Programs</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We offer a range of evidence-based programs designed to meet the specific needs of 
              individuals, organizations, and institutions.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
              <div className="h-2 bg-red-600 w-full"></div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3">Court-Mandated Programs</h3>
                <p className="text-gray-600 mb-4">
                  Our court-approved programs satisfy legal requirements while providing practical 
                  tools for meaningful behavioral change.
                </p>
                <ul className="space-y-2 mb-4">
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Anger Management</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Domestic Violence</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Substance Abuse</span>
                  </li>
                </ul>
                <button className="bg-blue-600 text-white py-2 px-4 rounded w-full">
                  Learn More
                </button>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
              <div className="h-2 bg-blue-600 w-full"></div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3">College Programs</h3>
                <p className="text-gray-600 mb-4">
                  Supporting students in developing essential life skills to navigate academic 
                  pressures and social challenges.
                </p>
                <ul className="space-y-2 mb-4">
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Conflict Resolution</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Responsible Relationships</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Substance Abuse Prevention</span>
                  </li>
                </ul>
                <button className="bg-blue-600 text-white py-2 px-4 rounded w-full">
                  Learn More
                </button>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
              <div className="h-2 bg-purple-600 w-full"></div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3">Corporate & Healthcare</h3>
                <p className="text-gray-600 mb-4">
                  Enhancing workplace effectiveness and team dynamics through specialized 
                  training and certification programs.
                </p>
                <ul className="space-y-2 mb-4">
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Staff Training</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Professional Certifications</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Hospital Referral Programs</span>
                  </li>
                </ul>
                <button className="bg-blue-600 text-white py-2 px-4 rounded w-full">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-blue-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Begin Your Journey of Change?</h2>
          <p className="text-xl max-w-3xl mx-auto mb-8">
            Take the first step toward positive transformation. Our evidence-based programs 
            provide the tools and support you need to create lasting change.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-700 hover:bg-gray-100 px-6 py-3 rounded-md font-bold">
              Enroll Now
            </button>
            <button className="border border-white text-white hover:bg-white/10 px-6 py-3 rounded-md font-medium">
              Contact Us
            </button>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center mr-3">
                  <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none">
                    <path d="M12 6.25278V19.2528M12 6.25278C10.8321 5.48018 8.61539 4.25 6.5 5C4.38461 5.75 4 7.75 4 9.5C4 15 12 19.2528 12 19.2528M12 6.25278C13.1679 5.48018 15.3846 4.25 17.5 5C19.6154 5.75 20 7.75 20 9.5C20 15 12 19.2528 12 19.2528" 
                      stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </div>
                <div>
                  <div className="font-bold text-lg">THREE TREES</div>
                  <div className="text-xs text-gray-400">CENTER FOR CHANGE</div>
                </div>
              </div>
              <p className="text-gray-400 text-sm">
                Evidence-based behavioral change programs for lasting impact.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ThreeTreesPage;