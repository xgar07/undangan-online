import React from 'react';

const Hero = ({ data }) => {
  if (!data) return null;

  return (
    <section className="hero-section">
      <div 
        className="hero-bg" 
        style={{ backgroundImage: `url(${data.heroImage})` }}
      ></div>
      <div className="hero-overlay"></div>
      
      <div className="hero-content fade-in delay-1000">
        <h4>We Are Getting Married</h4>
        <h1>{data.couple.firstName} <br/>&<br/> {data.couple.secondName}</h1>
        <div className="date">{data.date}</div>
      </div>

      <div className="scroll-indicator fade-in delay-1000">
        <span>Scroll</span>
        <div className="line"></div>
      </div>
    </section>
  );
};

export default Hero;
