import React, { useState, useEffect } from 'react';
import { submitGuestbook, getGuestbook } from '../utils/api';
import { invitation } from '../data/invitation';

const formatRelativeDate = (isoString) => {
  try {
    if (!isoString) return '';
    const date = new Date(isoString);
    if (isNaN(date.getTime())) return '';
    return new Intl.DateTimeFormat('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      timeZone: 'Asia/Jakarta'
    }).format(date);
  } catch (error) {
    return '';
  }
};

const Guestbook = () => {
  const [entries, setEntries] = useState([]);
  const [formData, setFormData] = useState({ name: '', message: '' });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState('');

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const loadedEntries = await getGuestbook(invitation.backend.invitationId);
        setEntries(loadedEntries);
      } catch (err) {
        setFetchError('Gagal memuat ucapan.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchEntries();
  }, []);

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Nama wajib diisi.';
    if (!formData.message.trim()) {
      newErrors.message = 'Ucapan wajib diisi.';
    } else if (formData.message.length > 500) {
      newErrors.message = 'Ucapan terlalu panjang (maksimal 500 karakter).';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: null }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setFetchError('');
    
    try {
      const entry = {
        name: formData.name.trim(),
        message: formData.message.trim()
      };
      
      const newEntry = await submitGuestbook(invitation.backend.invitationId, entry);
      setEntries(prev => [newEntry, ...prev]);
      setFormData({ name: '', message: '' });
      setToast('Ucapan berhasil dikirim. Terima kasih!');
      setTimeout(() => setToast(''), 3000);
    } catch (err) {
      setToast(err.message || 'Maaf, terjadi kesalahan.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="guestbook-section slide-up">
      <div className="guestbook-container">
        <h2 className="section-title">Ucapan & Doa</h2>
        <p className="guestbook-subtitle">
          Kirimkan doa dan ucapan terbaik untuk kedua mempelai.
        </p>

        {toast && (
          <div className="toast-message fade-in">
            {toast}
          </div>
        )}

        <form className="guestbook-form" onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label htmlFor="gb-name">Nama</label>
            <input
              type="text"
              id="gb-name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Nama Anda"
              className={errors.name ? 'input-error' : ''}
            />
            {errors.name && <span className="error-text">{errors.name}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="gb-message">Ucapan</label>
            <textarea
              id="gb-message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Tulis ucapan dan doa..."
              rows="4"
              className={errors.message ? 'input-error' : ''}
            ></textarea>
            <div className="char-counter">
              {formData.message.length} / 500
            </div>
            {errors.message && <span className="error-text">{errors.message}</span>}
          </div>

          <button type="submit" className="btn-solid" disabled={isSubmitting}>
            {isSubmitting ? 'Mengirim...' : 'Kirim Ucapan'}
          </button>
        </form>

        <div className="guestbook-list">
          {isLoading ? (
            <div className="empty-state fade-in">
              <p>Memuat ucapan...</p>
            </div>
          ) : fetchError ? (
            <div className="empty-state fade-in">
              <p>{fetchError}</p>
            </div>
          ) : entries.length === 0 ? (
            <div className="empty-state fade-in">
              <h4>Belum ada ucapan</h4>
              <p>Jadilah salah satu yang pertama memberikan doa untuk kedua mempelai.</p>
            </div>
          ) : (
            entries.map(entry => (
              <div key={entry.id} className="guestbook-card fade-in">
                <div className="card-header">
                  <span className="card-name">{entry.name}</span>
                  <span className="card-date">{formatRelativeDate(entry.createdAt)}</span>
                </div>
                {/* Render as plain text to avoid XSS */}
                <p className="card-message">{entry.message}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default Guestbook;
