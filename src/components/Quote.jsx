import React from 'react';

const Quote = ({ quote }) => {
  if (!quote) return null;

  return (
    <section className="quote-section slide-up">
      <div className="quote-container">
        <p className="quote-text">"{quote.text}"</p>
        <span className="quote-source">{quote.source}</span>
      </div>
    </section>
  );
};

export default Quote;
