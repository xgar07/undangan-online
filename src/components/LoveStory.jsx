import React from 'react';

const LoveStory = ({ story }) => {
  if (!story || story.length === 0) return null;

  return (
    <section id="kisah" className="story-section">
      <div className="story-container">
        <h2 className="section-title fade-in">Kisah Kami</h2>
        
        <div className="timeline">
          {story.map((item, index) => (
            <div key={index} className="timeline-item slide-up" style={{ animationDelay: `${index * 0.2}s` }}>
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <span className="timeline-year">{item.year}</span>
                <h3 className="timeline-title">{item.title}</h3>
                <p className="timeline-desc">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LoveStory;
