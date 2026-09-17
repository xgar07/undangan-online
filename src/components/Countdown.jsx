import React, { useState, useEffect } from 'react';

const Countdown = ({ events }) => {
  const [timeLeft, setTimeLeft] = useState(null);
  const [status, setStatus] = useState('loading'); // 'loading', 'active', 'ongoing', 'finished'

  useEffect(() => {
    if (!events || events.length === 0) return;

    // Convert event strings to actual Date objects
    // Assuming date format is YYYY-MM-DD and time is HH:MM
    const eventDates = events.map(event => {
      // Build ISO string ensuring it's treated correctly in local timezone
      const startString = `${event.date}T${event.startTime}:00+07:00`; // +07:00 for WIB
      const endString = event.endTime ? `${event.date}T${event.endTime}:00+07:00` : null;
      
      return {
        ...event,
        startObj: new Date(startString),
        endObj: endString ? new Date(endString) : new Date(new Date(startString).getTime() + 2 * 60 * 60 * 1000) // Default 2 hours if no end time
      };
    }).sort((a, b) => a.startObj - b.startObj);

    const calculateTimeLeft = () => {
      const now = new Date();
      let targetEvent = null;
      let currentState = 'finished';

      for (const event of eventDates) {
        if (now < event.startObj) {
          // Event hasn't started yet
          targetEvent = event;
          currentState = 'active';
          break;
        } else if (now >= event.startObj && now <= event.endObj) {
          // Event is currently ongoing
          currentState = 'ongoing';
          break;
        }
      }

      if (currentState === 'active' && targetEvent) {
        const difference = targetEvent.startObj - now;
        if (difference > 0) {
          setTimeLeft({
            Hari: Math.floor(difference / (1000 * 60 * 60 * 24)),
            Jam: Math.floor((difference / (1000 * 60 * 60)) % 24),
            Menit: Math.floor((difference / 1000 / 60) % 60),
            Detik: Math.floor((difference / 1000) % 60)
          });
          setStatus('active');
        }
      } else {
        setTimeLeft(null);
        setStatus(currentState);
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [events]);

  if (status === 'loading') return null;

  return (
    <section className="countdown-section">
      <div className="countdown-container fade-in">
        <h2 className="section-title">Menuju Hari Bahagia</h2>
        
        {/* Recap Information */}
        <div className="countdown-recap">
          <p className="recap-date">
            {events.length > 0 && new Intl.DateTimeFormat('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', timeZone: 'Asia/Jakarta' }).format(new Date(events[0].date))}
          </p>
          <div className="recap-events">
            {events.map((ev, i) => (
              <span key={i}>
                {ev.type}
                {i < events.length - 1 && <span className="recap-divider">•</span>}
              </span>
            ))}
          </div>
        </div>

        {status === 'active' && timeLeft ? (
          <div className="countdown-grid">
            {Object.entries(timeLeft).map(([unit, value]) => (
              <div key={unit} className="countdown-item">
                <span className="countdown-value">{String(value).padStart(2, '0')}</span>
                <span className="countdown-unit">{unit}</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="countdown-message">
            {status === 'ongoing' ? (
              <p className="countdown-finished">Acara sedang berlangsung</p>
            ) : (
              <p className="countdown-finished">Acara telah selesai</p>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default Countdown;
