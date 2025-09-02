import React, { useEffect, useState } from 'react';
import { Modal, ModalContent, CloseButton } from './Styled';
import colors from '../constants/colors';
import Config from '../core/config/Config';

function HistoryModal({ open, onClose, username }) {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    async function fetchHistory() {
      const userId = localStorage.getItem("user_id");
      const resp = await fetch(`${Config.BACKEND_URL}/get_history/${userId}`);
      const data = await resp.json();
      setHistory(data);
    }
    fetchHistory();
  }, []);

  return (
    <Modal open={open} onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose} />

        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '24px' }}>
          <span style={{ color: colors.primary, fontSize: '32px', marginRight: '16px' }}>📜</span>
          <h2 style={{
            color: colors.primary,
            fontFamily: 'Inter, sans-serif',
            fontWeight: 700,
            background: 'linear-gradient(135deg, #34d399 0%, #10b981 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            margin: 0
          }}>
            Prediction History
          </h2>
        </div>

        {history.length === 0 ? (
          <p style={{ color: '#cbd5e1', marginTop: '16px' }}>
            No history found. Start drawing to build your history!
          </p>
        ) : (
          <ul style={{
            listStyle: 'none',
            padding: 0,
            margin: 0,
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
          }}>
            {history.map((item, idx) => (
              <li
                key={idx}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '12px 16px',
                  borderRadius: '8px',
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)'
                }}
              >
                <span style={{ color: '#f472b6', fontWeight: 600 }}>
                  {item.predicted_class}
                </span>
                <span style={{ color: '#a5b4fc', fontSize: '0.9rem' }}>
                  {new Date(item.created_at).toLocaleString()}
                </span>
              </li>
            ))}
          </ul>
        )}

        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          <button
            onClick={onClose}
            style={{
              background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
              color: '#ffffff',
              border: '1px solid rgba(255,255,255,0.12)',
              borderRadius: '9999px',
              padding: '12px 20px',
              fontSize: '0.95rem',
              fontWeight: 700,
              cursor: 'pointer',
              boxShadow: '0 8px 20px rgba(37, 99, 235, 0.35)'
            }}
          >
            Close
          </button>
        </div>
      </ModalContent>
    </Modal>
  );
}

export default HistoryModal;
