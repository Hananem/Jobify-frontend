import React from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <div className="h-screen md:px-[6%] flex flex-wrap sm:justify-center md:justify-between items-center">
      
      {/* Text Section */}
      <motion.div
        className="w-full md:w-1/2 p-4"
        initial={{ opacity: 0, y: 50 }} // Start position for the text (down)
        animate={{ opacity: 1, y: 0 }} // End position (normal)
        transition={{ duration: 1 }} // Animation duration
      >
        <h1 className="text-4xl md:text-6xl font-bold mb-4 text-center">
          Find Your Dream Job or Discover Top Talent
        </h1>
        <p className="text-lg md:text-2xl mb-8 text-center">
          Connecting job seekers with the right opportunities and employers with the best candidates.
        </p>
      </motion.div>

      {/* Image Section */}
      <motion.div
        className="grid grid-cols-3 gap-3 w-full sm:w-[250px] md:w-[300px] p-4"
        initial={{ opacity: 0, y: -50 }} // Start position for the images (up)
        animate={{ opacity: 1, y: 0 }} // End position (normal)
        transition={{ duration: 1 }} // Animation duration
      >
        <div className="flex flex-col">
          <img
            src="https://media.istockphoto.com/id/1351651339/video/smiling-man-with-arms-crossed-over-green-background.jpg?s=640x640&k=20&c=818Lwpd4-JxtTOeZWSSZlDray0oLp8IcM8h3ycM3A3Y="
            alt="Image 1"
            className="w-[150px] h-[190px] object-cover rounded-xl mb-2"
          />
          <img
            src="https://img.freepik.com/free-photo/portrait-satisfied-curly-haired-woman_273609-45838.jpg?size=626&ext=jpg&ga=GA1.1.2008272138.1727740800&semt=ais_hybrid"
            alt="Image 2"
            className="w-[150px] h-[250px] object-cover rounded-xl"
          />
        </div>
        <div className="flex flex-col">
          <img
            src="https://www.shutterstock.com/image-photo/young-handsome-man-beard-wearing-600nw-1768126784.jpg"
            alt="Image 3"
            className="w-[150px] h-[250px] object-cover rounded-xl mb-2"
          />
          <img
            src="https://t4.ftcdn.net/jpg/03/41/11/21/360_F_341112159_9Ot66wlUyNVcYlGjwg0X14jRTs5rcMsb.jpg"
            alt="Image 4"
            className="w-[150px] h-[190px] object-cover rounded-xl"
          />
        </div>
        <div className="flex items-center justify-center">
          <img
            src="https://img.freepik.com/premium-photo/young-brazilian-woman-isolated-purple-background-keeps-palm-together-person-asks-something_1368-379072.jpg"
            alt="Image 5"
            className="w-[150px] h-[260px] object-cover rounded-xl"
          />
        </div>
      </motion.div>
    </div>
  );
};

export default Hero;

