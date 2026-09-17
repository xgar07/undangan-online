import React, { useEffect, useState } from 'react';
import { getGuestName } from '../utils/guest';

const InvitationOpening = ({ data, onOpen }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [guestName, setGuestName] = useState('');

  useEffect(() => {
    setGuestName(getGuestName());
  }, []);

  const handleOpen = () => {
    setIsOpen(true);
    setTimeout(() => {
      onOpen();
    }, 1500); // Wait for transition
  };

  if (!data) return null;

  return (
    <div 
      className={`opening-screen ${isOpen ? 'closed' : ''}`}
      style={{ backgroundImage: `url(${data.bgImage})` }}
    >
      <div className="opening-overlay"></div>
      
      <div className="opening-content">
        <div className="opening-top slide-up">
          <h4>The Wedding Of</h4>
          <h1>{data.couple.firstName} & {data.couple.secondName}</h1>
          <p>{data.date}</p>
        </div>

        <div className="opening-bottom slide-up delay-500">
          <div className="guest-info">
            <p>Kepada Yth.</p>
            <h3>{guestName}</h3>
          </div>
          <button className="btn-open" onClick={handleOpen}>
            Buka Undangan
          </button>
        </div>
      </div>
    </div>
  );
};

export default InvitationOpening;
