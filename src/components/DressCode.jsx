import React from 'react';

const DressCode = ({ config }) => {
  if (!config || !config.enabled) return null;

  return (
    <section className="dresscode-section slide-up">
      <div className="dresscode-container">
        <h2 className="section-title">{config.title || "Dress Code"}</h2>
        <p className="dresscode-desc">{config.description}</p>
        
        {config.colors && config.colors.length > 0 && (
          <div className="color-palette">
            {config.colors.map((color, index) => (
              <div 
                key={index} 
                className="color-swatch"
                style={{ backgroundColor: color }}
                aria-label={`Warna ${color}`}
              ></div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default DressCode;
