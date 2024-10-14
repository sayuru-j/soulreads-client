import React from "react";
import Image from "next/image";
import Header from "../components/Header";
import backgroundImg from "../assets/gg.png"; // Make sure the path is correct

const About: React.FC = () => {
  return (
    <>
      <Header />

      {/* Wrapper for the content and background image */}
      <div className="relative flex flex-col items-center justify-center max-w-7xl mx-auto p-8 text-center dark:text-white/80">
        
        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src={backgroundImg}
            alt="Background"
            layout="fill"
            objectFit="cover"
            className="opacity-10"
          />
        </div>

        {/* Content on top of the background image */}
        <h1 className="text-5xl font-extrabold mb-6 text-gradient relative z-10">
          About Us
        </h1>
        <p className="text-lg md:text-xl mb-8 max-w-2xl relative z-10">
          At SOULREADS, we are passionate about bringing people together through
          the power of storytelling.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mb-10 relative z-10">
          <div className="bg-white shadow-lg rounded-lg p-6 dark:bg-gray-800 dark:text-white">
            <h2 className="text-3xl font-semibold mb-4 dark:text-white">Our Mission</h2>
            <p className="text-base md:text-lg dark:text-white/80">
              To create a vibrant community where readers can share their love
              for literature and discover new stories that resonate with them.
            </p>
          </div>

          <div className="bg-white shadow-lg rounded-lg p-6 dark:bg-gray-800 dark:text-white">
            <h2 className="text-3xl font-semibold mb-4 dark:text-white">Our Vision</h2>
            <p className="text-base md:text-lg dark:text-white/80">
              We envision a world where stories inspire empathy, creativity, and
              connection among readers of all backgrounds.
            </p>
          </div>
        </div>

        <h2 className="text-4xl font-bold mb-6 relative z-10 dark:text-white">Join Our Journey</h2>
        <p className="text-base md:text-lg mb-8 max-w-2xl relative z-10 dark:text-white/80">
          Whether you’re a lifelong book lover or just starting your reading adventure, 
          SOULREADS is here to support and inspire you. Join us for book discussions, 
          reviews, and community events where we celebrate literature in all its forms.
        </p>

        <h3 className="text-3xl font-semibold mb-4 relative z-10 dark:text-white">Get Involved!</h3>
        <p className="text-base md:text-lg mb-6 relative z-10 dark:text-white/80">
          Connect with fellow readers through our social media channels and subscribe 
          to our newsletter to stay updated on the latest events, book releases, and 
          reading challenges!
        </p>

        <div className="text-center relative z-10">
          <a
            href="/contact"
            className="inline-block bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-blue-600 transition duration-200"
          >
            Contact Us
          </a>
        </div>
      </div>
    </>
  );
};

export default About;
