import React, { useState } from 'react';
import './Generator.css';

const Generator = () => {
  const [inputText, setInputText] = useState('');
  const [links, setLinks] = useState([]);
  const [copiedIndex, setCopiedIndex] = useState(-1);
  const [copiedAll, setCopiedAll] = useState(false);

  const handleGenerate = () => {
    const names = inputText.split('\n')
      .map(name => name.trim())
      .filter(name => name.length > 0);
    
    const uniqueNames = [...new Set(names)];
    
    const origin = window.location.origin;
    
    const generated = uniqueNames.map(name => {
      const link = `${origin}/?kpd=${encodeURIComponent(name)}`;
      return { name, link };
    });
    
    setLinks(generated);
    setCopiedIndex(-1);
    setCopiedAll(false);
  };

  const copyToClipboard = async (text, index) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(-1), 2000);
    } catch (err) {
      alert('Gagal menyalin text. Browser Anda mungkin tidak mendukung fitur ini.');
    }
  };

  const copyAll = async () => {
    const textToCopy = links.map(l => `${l.name}\n${l.link}`).join('\n\n');
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopiedAll(true);
      setTimeout(() => setCopiedAll(false), 2000);
    } catch (err) {
      alert('Gagal menyalin text. Browser Anda mungkin tidak mendukung fitur ini.');
    }
  };

  const getWhatsAppLink = (name, link) => {
    const message = `Assalamu'alaikum ${name},

Dengan senang hati kami mengundang Bapak/Ibu/Saudara/i untuk hadir di acara pernikahan kami.

Berikut link undangannya:
${link}

Mohon maaf apabila terdapat kesalahan dalam penyebutan nama.
Terima kasih 🙏`;
    return `https://wa.me/?text=${encodeURIComponent(message)}`;
  };

  return (
    <div className="generator-container">
      <div className="generator-card">
        <h1 className="generator-title">Generate Link Undangan</h1>
        <p className="generator-subtitle">Buat link personal untuk setiap tamu.</p>
        
        <div className="generator-form">
          <label className="generator-label">Daftar Nama Tamu</label>
          <textarea 
            className="generator-textarea"
            placeholder="Bapak Figar&#10;Ibu Siti&#10;Bapak Budi & Keluarga&#10;Keluarga Bapak Ahmad"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            rows={8}
          ></textarea>
          <button className="generator-btn" onClick={handleGenerate}>
            Generate Links
          </button>
        </div>
        
        {links.length > 0 && (
          <div className="generator-results">
            <div className="generator-results-header">
              <p className="generator-count">{links.length} Link berhasil dibuat</p>
              <button className="generator-btn-secondary" onClick={copyAll}>
                {copiedAll ? '✓ Tersalin Semua' : 'Copy Semua Link'}
              </button>
            </div>
            
            <div className="generator-list">
              {links.map((item, index) => (
                <div key={index} className="generator-item">
                  <div className="generator-item-info">
                    <p className="generator-item-name">{item.name}</p>
                    <p className="generator-item-link">{item.link}</p>
                  </div>
                  <div className="generator-item-actions">
                    <button 
                      className={`generator-btn-copy ${copiedIndex === index ? 'copied' : ''}`}
                      onClick={() => copyToClipboard(item.link, index)}
                    >
                      {copiedIndex === index ? '✓ Tersalin' : 'Copy Link'}
                    </button>
                    <a 
                      href={getWhatsAppLink(item.name, item.link)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="generator-btn-wa"
                    >
                      WhatsApp
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Generator;
