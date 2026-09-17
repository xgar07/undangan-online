import React, { useState } from 'react';
import { invitation } from '../data/invitation';
import { Copy, MapPin } from 'lucide-react';

const Gift = () => {
  const { gift } = invitation;
  const [toast, setToast] = useState('');

  if (!gift || !gift.enabled) return null;

  const handleCopy = (text, type) => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text)
        .then(() => {
          setToast(`${type} berhasil disalin!`);
          setTimeout(() => setToast(''), 3000);
        })
        .catch(() => {
          setToast('Gagal menyalin. Silakan salin manual.');
          setTimeout(() => setToast(''), 3000);
        });
    } else {
      setToast('Gagal menyalin. Browser tidak mendukung.');
      setTimeout(() => setToast(''), 3000);
    }
  };

  return (
    <section id="gift" className="gift-section slide-up">
      <div className="gift-container">
        <h2 className="section-title">Wedding Gift</h2>
        <p className="gift-subtitle">
          Bagi keluarga dan sahabat yang ingin memberikan tanda kasih, dapat mengirimkan melalui:
        </p>

        {toast && (
          <div className="toast-message fade-in">
            {toast}
          </div>
        )}

        <div className="gift-cards">
          {gift.accounts && gift.accounts.map((account, index) => (
            <div key={index} className="gift-card">
              <h3 className="bank-name">{account.bankName}</h3>
              <p className="account-number">{account.accountNumber}</p>
              <p className="account-name">a.n. {account.accountName}</p>
              <button 
                className="btn-outline copy-btn"
                onClick={() => handleCopy(account.accountNumber, 'Nomor rekening')}
              >
                <Copy size={16} />
                <span>Salin Rekening</span>
              </button>
            </div>
          ))}

          {gift.address && (
            <div className="gift-card address-card">
              <h3 className="bank-name">Kirim Hadiah</h3>
              <p className="address-text">{gift.address}</p>
              <button 
                className="btn-outline copy-btn"
                onClick={() => handleCopy(gift.address, 'Alamat')}
              >
                <MapPin size={16} />
                <span>Salin Alamat</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Gift;
