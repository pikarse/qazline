import React from 'react';
import Hero from '../components/Hero';
import Features from '../components/Features';
import Testimonials from '../components/Testimonials';
import About from '../components/About';
import RegistrationForm from '../components/RegistrationForm';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <Features />
      <Testimonials />
      <About />
      <RegistrationForm />
    </div>
  );
};

export default Home; 