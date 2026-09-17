import React, { useState, useEffect } from 'react';
import { Home, BookOpen, CalendarHeart, ClipboardCheck, Gift } from 'lucide-react';

const navItems = [
  { id: 'home', icon: Home, label: 'Home' },
  { id: 'kisah', icon: BookOpen, label: 'Kisah' },
  { id: 'acara', icon: CalendarHeart, label: 'Acara' },
  { id: 'rsvp', icon: ClipboardCheck, label: 'RSVP' },
  { id: 'gift', icon: Gift, label: 'Gift' },
];

const FloatingNav = () => {
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;

      for (const item of navItems) {
        const section = document.getElementById(item.id);
        if (section) {
          const offsetTop = section.offsetTop;
          const offsetHeight = section.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(item.id);
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="floating-nav">
      {navItems.map((item) => {
        const Icon = item.icon;
        return (
          <button
            key={item.id}
            onClick={() => scrollTo(item.id)}
            className={`nav-btn ${activeSection === item.id ? 'active' : ''}`}
            aria-label={item.label}
          >
            <Icon size={20} />
          </button>
        );
      })}
    </nav>
  );
};

export default FloatingNav;
