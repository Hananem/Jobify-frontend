import React from 'react';
import { motion } from 'framer-motion';
import { FaBriefcase, FaRegLightbulb, FaPeopleArrows } from 'react-icons/fa';

const About = () => {
  return (
    <div className="bg-main dark:bg-dark-main mt-32 md:mt-24">
      <div className=" mx-auto px-[4%] md:px-[6%]">
        <motion.h2
          className="text-3xl font-bold  text-primary mb-8 mt-8"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          About Us
        </motion.h2>
        <div className="flex flex-col md:flex-row items-center sm:justify-center md:justify-between w-full">


          {/* Image Section */}
          <motion.div
            className="flex flex-col gap-x-6 md:flex-row md:gap-x-12 items-center min-h-[400px] hidden sm:flex"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  delayChildren: 0.5,
                  staggerChildren: 0.3,
                },
              },
            }}
          >
            <motion.div
              className="self-start w-[180px] h-[230px]"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
            >
              <img
                src="https://www.qualtrics.com/m/assets/wp-content/uploads/2021/11/GettyImages-1284755338.jpg"
                alt="Team"
                className="w-full h-full object-cover rounded-xl"
              />
            </motion.div>
            <motion.div
              className="self-end w-[180px] h-[230px]"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
            >
              <img
                src="https://blog.adobe.com/en/publish/2022/05/06/media_1d10e3b66d6c701779a44c3e281cce3ff091aa884.jpeg?width=1200&format=pjpg&optimize=medium"
                alt="Team"
                className="w-full h-full rounded-xl object-cover"
              />
            </motion.div>
          </motion.div>

          {/* Text Section */}
          <motion.div
            className="flex flex-col gap-4"
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
                icon: <FaRegLightbulb className="w-8 h-8 p-2 text-white bg-primary mr-3" />,
                title: "Our Mission",
                description:
                  "We connect job seekers with their ideal careers through a seamless, user-friendly experience.",
              },
              {
                icon: <FaBriefcase className="w-8 h-8 p-2 text-white bg-primary mr-3" />,
                title: "Our Story",
                description:
                  "Since our inception, we have been committed to transforming the job search experience with innovative solutions.",
              },
              {
                icon: <FaPeopleArrows className="w-8 h-8 p-2 text-white bg-primary mr-3" />,
                title: "Our Team",
                description:
                  "Our dedicated team works tirelessly to ensure that both job seekers and employers find what they need with ease.",
              },
            ].map((item, index) => (
              <motion.div key={index} className="mb-8 md:mb-0" variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}>
                <div className="flex items-center mb-4">
                  {item.icon}
                  <h3 className="text-xl font-semibold text-slate-700 dark:text-slate-300">
                    {item.title}
                  </h3>
                </div>
                <p className="text-slate-600 dark:text-slate-300 w-full md:w-[60%]">{item.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default About;
