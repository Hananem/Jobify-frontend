import React, { useRef } from 'react';
import { FaSearch, FaHandshake, FaCheckCircle, FaBriefcase } from 'react-icons/fa';
import { motion, useInView } from 'framer-motion';

const HowItWorks = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  return (
    <div className="my-32">
      <div className="container mx-auto px-6">
        <motion.h2
          className="text-4xl font-extrabold  text-primary mb-12"
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { duration: 0.8 } },
          }}
        >
          How It Works
        </motion.h2>
        <motion.div
          ref={ref}
          className="flex flex-col md:flex-row md:space-x-8"
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={containerVariants}
        >
          {[
            {
              icon: <FaSearch className="w-6 h-6 text-[#8485ad]" />,
              title: 'Search Jobs',
              description:
                'Use our advanced search filters to find the perfect job match based on your skills, location, and preferences.',
            },
            {
              icon: <FaHandshake className="w-6 h-6 text-[#6dbad1]" />,
              title: 'Apply Easily',
              description:
                'Submit your application directly through our platform with a few clicks. Track your application status in real-time.',
            },
            {
              icon: <FaCheckCircle className="w-6 h-6 text-[#82bf63]" />,
              title: 'Get Hired',
              description:
                'Receive job offers and secure your dream job. We’re here to support you throughout your career journey.',
            },
            {
              icon: <FaBriefcase className="w-6 h-6 text-[#ad6c5a]" />,
              title: 'Build Your Profile',
              description:
                'Create a professional profile to showcase your experience and attract potential employers.',
            },
          ].map((step, index) => (
            <motion.div
              key={index}
              className="flex-1 bg-white dark:bg-dark-card p-8 rounded-full shadow-xl dark:shadow-none mb-8 md:mb-0"
              variants={cardVariants}
            >
              <div className="flex items-center justify-center mb-6">{step.icon}</div>
              <h3 className="text-2xl font-semibold text-center text-slate-800 dark:text-slate-200 mb-4">
                {step.title}
              </h3>
              <p className="text-slate-600 text-center dark:text-slate-300">{step.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default HowItWorks;

