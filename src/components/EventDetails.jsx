import React from 'react';
import { MapPin, CalendarPlus } from 'lucide-react';

const formatEventDate = (dateString) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(date);
};

const generateGoogleCalendarUrl = (event) => {
  const formatTime = (date, time) => {
    const [hours, minutes] = time.split(':');
    const d = new Date(`${date}T${hours}:${minutes}:00+07:00`);
    return d.toISOString().replace(/-|:|\.\d\d\d/g, '');
  };

  const start = formatTime(event.date, event.startTime);
  const end = event.endTime ? formatTime(event.date, event.endTime) : start;
  
  const title = encodeURIComponent(`Pernikahan: ${event.type}`);
  const details = encodeURIComponent(`Acara ${event.type}`);
  const location = encodeURIComponent(`${event.venue}, ${event.address}`);
  
  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${start}/${end}&details=${details}&location=${location}`;
};

const EventDetails = ({ events }) => {
  if (!events || events.length === 0) return null;

  return (
    <section id="acara" className="event-section slide-up">
      <div className="event-container">
        <h2 className="section-title">Detail Acara</h2>
        
        <div className="events-grid">
          {events.map((event, index) => (
            <div key={index} className="event-card fade-in">
              <h3 className="event-type">{event.type}</h3>
              
              <div className="event-info">
                <p className="event-date">{formatEventDate(event.date)}</p>
                <p className="event-time">
                  {event.startTime} {event.endTime ? `- ${event.endTime}` : ''} WIB
                </p>
              </div>

              <div className="event-venue">
                <h4>{event.venue}</h4>
                <p>{event.address}</p>
              </div>

              <div className="event-actions">
                <a 
                  href={event.mapsUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn-solid"
                >
                  <MapPin size={18} />
                  Lihat Lokasi
                </a>
                <a 
                  href={generateGoogleCalendarUrl(event)} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn-outline calendar-btn"
                >
                  <CalendarPlus size={18} />
                  Tambah ke Kalender
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EventDetails;
