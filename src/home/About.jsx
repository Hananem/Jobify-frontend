import React from 'react';
import { motion } from 'framer-motion';
import { FaBriefcase, FaRegLightbulb, FaPeopleArrows } from 'react-icons/fa';

const About = () => {
  return (
    <div className="bg-main dark:bg-dark-main mt-32 md:mt-24">
      <div className="mx-auto px-[4%] md:px-[6%] max-w-[1800px]">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-primary mb-10 mt-10 text-center"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          About Us
        </motion.h2>
        
        <div className="flex flex-col xl:flex-row items-center justify-center gap-10 xl:gap-20 w-full">

          {/* Extra Large Image Section */}
          <motion.div
            className="w-full xl:w-[55%]"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <img
              src="https://www.qualtrics.com/m/assets/wp-content/uploads/2021/11/GettyImages-1284755338.jpg"
              alt="Team"
              className="w-full h-auto min-h-[400px] max-h-[700px] object-cover rounded-2xl shadow-2xl"
            />
          </motion.div>

          {/* Text Section */}
          <motion.div
            className="flex flex-col gap-8 w-full xl:w-[45%]"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  delayChildren: 0.2,
                  staggerChildren: 0.3,
                },
              },
            }}
          >
            {[
              {
                icon: <FaRegLightbulb className="w-10 h-10 p-2 text-white bg-primary mr-4 rounded-lg" />,
                title: "Our Mission",
                description: "We connect job seekers with their ideal careers through a seamless, user-friendly experience that prioritizes human connections and professional growth.",
              },
              {
                icon: <FaBriefcase className="w-10 h-10 p-2 text-white bg-primary mr-4 rounded-lg" />,
                title: "Our Story",
                description: "Founded in 2020, we've revolutionized the job search experience with cutting-edge technology and a passionate commitment to helping people find meaningful work.",
              },
              {
                icon: <FaPeopleArrows className="w-10 h-10 p-2 text-white bg-primary mr-4 rounded-lg" />,
                title: "Our Team",
                description: "Comprised of industry veterans and innovative thinkers, our team brings decades of combined experience to create the best possible platform for job seekers and employers alike.",
              },
            ].map((item, index) => (
              <motion.div 
                key={index}
                variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
                className="mb-5 last:mb-0"
              >
                <div className="flex items-center mb-3">
                  {item.icon}
                  <h3 className="text-xl md:text-2xl font-semibold text-slate-800 dark:text-slate-200">
                    {item.title}
                  </h3>
                </div>
                <p className="text-base md:text-lg text-slate-600 dark:text-slate-300 pl-16 leading-normal">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default About;