import React, { useState } from 'react';
import { submitRSVP } from '../utils/api';
import { invitation } from '../data/invitation';

const RSVP = () => {
  const [formData, setFormData] = useState({
    name: '',
    attendance: '',
    guests: 1,
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Nama wajib diisi.';
    }
    if (!formData.attendance) {
      newErrors.attendance = 'Kehadiran wajib dipilih.';
    }
    if (formData.attendance === 'hadir' && (formData.guests < 1 || formData.guests > 5 || isNaN(formData.guests))) {
      newErrors.guests = 'Jumlah tamu harus antara 1 sampai 5.';
    }
    if (formData.message && formData.message.length > 500) {
      newErrors.message = 'Pesan terlalu panjang (maksimal 500 karakter).';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
    setSubmitError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setSubmitError('');

    try {
      const payload = {
        name: formData.name.trim(),
        attendance: formData.attendance,
        guests: formData.attendance === 'tidak_hadir' ? 0 : parseInt(formData.guests, 10),
        message: formData.message.trim()
      };
      
      await submitRSVP(invitation.backend.invitationId, payload);
      setIsSuccess(true);
    } catch (err) {
      setSubmitError(err.message || 'Maaf, terjadi kesalahan. Silakan coba lagi.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      name: '',
      attendance: '',
      guests: 1,
      message: ''
    });
    setErrors({});
    setIsSuccess(false);
    setSubmitError('');
  };

  return (
    <section id="rsvp" className="rsvp-section slide-up">
      <div className="rsvp-container">
        <h2 className="section-title">Konfirmasi Kehadiran</h2>
        <p className="rsvp-subtitle">
          Merupakan suatu kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i dapat hadir dan memberikan doa restu.
        </p>

        {isSuccess ? (
          <div className="rsvp-success fade-in">
            <h3>Terima kasih!</h3>
            <p>Konfirmasi kehadiran Anda telah diterima.</p>
            <button className="btn-outline mt-2" onClick={handleReset}>
              Kirim Konfirmasi Lagi
            </button>
          </div>
        ) : (
          <form className="rsvp-form fade-in" onSubmit={handleSubmit} noValidate>
            
            {submitError && (
              <div className="error-text" style={{ textAlign: 'center', marginBottom: '1rem', fontSize: '1rem' }}>
                {submitError}
              </div>
            )}

            <div className="form-group">
              <label htmlFor="name">Nama Lengkap</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Masukkan nama Anda"
                className={errors.name ? 'input-error' : ''}
              />
              {errors.name && <span className="error-text">{errors.name}</span>}
            </div>

            <div className="form-group">
              <label>Konfirmasi Kehadiran</label>
              <div className="radio-group">
                <label className="radio-label">
                  <input
                    type="radio"
                    name="attendance"
                    value="hadir"
                    checked={formData.attendance === 'hadir'}
                    onChange={handleChange}
                  />
                  <span>Hadir</span>
                </label>
                <label className="radio-label">
                  <input
                    type="radio"
                    name="attendance"
                    value="tidak_hadir"
                    checked={formData.attendance === 'tidak_hadir'}
                    onChange={handleChange}
                  />
                  <span>Tidak Hadir</span>
                </label>
                <label className="radio-label">
                  <input
                    type="radio"
                    name="attendance"
                    value="ragu"
                    checked={formData.attendance === 'ragu'}
                    onChange={handleChange}
                  />
                  <span>Masih Ragu</span>
                </label>
              </div>
              {errors.attendance && <span className="error-text">{errors.attendance}</span>}
            </div>

            {formData.attendance !== 'tidak_hadir' && (
              <div className="form-group fade-in">
                <label htmlFor="guests">Jumlah Tamu</label>
                <input
                  type="number"
                  id="guests"
                  name="guests"
                  min="1"
                  max="5"
                  value={formData.guests}
                  onChange={handleChange}
                  className={errors.guests ? 'input-error' : ''}
                />
                {errors.guests && <span className="error-text">{errors.guests}</span>}
              </div>
            )}

            <div className="form-group">
              <label htmlFor="message">Pesan (Opsional)</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Tulis pesan untuk kedua mempelai..."
                rows="4"
                className={errors.message ? 'input-error' : ''}
              ></textarea>
              <div className="char-counter">
                {formData.message.length} / 500
              </div>
              {errors.message && <span className="error-text">{errors.message}</span>}
            </div>

            <button 
              type="submit" 
              className="btn-solid" 
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Mengirim...' : 'Kirim Konfirmasi'}
            </button>
          </form>
        )}
      </div>
    </section>
  );
};

export default RSVP;
