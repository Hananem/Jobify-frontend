import React from 'react';
import Hero from './Hero';
import About from './About';
import HowItWorks from './HowItWorks';
import Blog from './Blog';
import LatestJobs from './LatestJobs';
const Home = () => {
  return (
    <div>
      <Hero />
      <About />
      <LatestJobs />
      <HowItWorks />
      <Blog />
     
    </div>
  );
};

export default Home;
