import React, { useState, useEffect } from 'react';
import InvitationOpening from './components/InvitationOpening';
import Hero from './components/Hero';
import Quote from './components/Quote';
import LoveStory from './components/LoveStory';
import EventDetails from './components/EventDetails';
import Countdown from './components/Countdown';
import DressCode from './components/DressCode';
import RSVP from './components/RSVP';
import Guestbook from './components/Guestbook';
import Gift from './components/Gift';
import FloatingNav from './components/FloatingNav';
import MusicPlayer from './components/MusicPlayer';
import { invitation } from './data/invitation';

function App() {
  const [isOpened, setIsOpened] = useState(false);
  
  useEffect(() => {
    const root = document.documentElement;
    if (invitation.theme) {
      root.style.setProperty('--bg-color', invitation.theme.background);
      root.style.setProperty('--text-color', invitation.theme.text);
      root.style.setProperty('--accent-color', invitation.theme.accent);
      root.style.setProperty('--muted-color', invitation.theme.muted);
    }
    
    if (!isOpened) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isOpened]);

  return (
    <div className="app-container" id="home">
      <MusicPlayer isOpened={isOpened} />
      
      {!isOpened && (
        <InvitationOpening 
          data={invitation} 
          onOpen={() => setIsOpened(true)} 
        />
      )}
      
      {isOpened && (
        <main>
          <Hero data={invitation} />
          <Quote quote={invitation.quote} />
          <LoveStory story={invitation.story} />
          <EventDetails events={invitation.events} />
          <Countdown events={invitation.events} />
          <DressCode config={invitation.dressCode} />
          <RSVP />
          <Gift />
          <Guestbook />
          <FloatingNav />
        </main>
      )}
    </div>
  );
}

export default App;
