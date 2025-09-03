import React from 'react';
import styled from '@emotion/styled';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: #1e1b4b;
  padding: 24px;
  border-radius: 12px;
  width: 90%;
  max-width: 600px;
  max-height: 80vh;
  overflow-y: auto;
  position: relative;
  border: 1px solid #4f46e5;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(99, 102, 241, 0.3);
`;

const CloseButton = styled.button`
  position: absolute;
  top: 12px;
  right: 12px;
  background: none;
  border: none;
  color: #94a3b8;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 4px;
  
  &:hover {
    color: #ffffff;
    background: rgba(255, 255, 255, 0.1);
  }
`;

const Title = styled.h2`
  color: #ffffff;
  margin-top: 0;
  margin-bottom: 20px;
  font-size: 1.5rem;
`;

const HistoryList = styled.div`
  margin-top: 16px;
`;

const HistoryItem = styled.div`
  background: rgba(99, 102, 241, 0.1);
  border: 1px solid rgba(99, 102, 241, 0.3);
  border-radius: 8px;
  padding: 12px;
  margin-bottom: 12px;
  color: #e2e8f0;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const HistoryModal = ({ open, onClose, username }) => {
  if (!open) return null;

  // TODO: Replace with actual history data fetching
  const historyItems = [
    { id: 1, label: 'Cat', confidence: 0.92, timestamp: '2023-05-15 14:30' },
    { id: 2, label: 'Dog', confidence: 0.85, timestamp: '2023-05-15 13:45' },
    { id: 3, label: 'House', confidence: 0.78, timestamp: '2023-05-15 12:20' },
  ];

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        <Title>Drawing History</Title>
        {username && <p>Viewing history for: {username}</p>}
        
        <HistoryList>
          {historyItems.length > 0 ? (
            historyItems.map((item) => (
              <HistoryItem key={item.id}>
                <div><strong>Label:</strong> {item.label}</div>
                <div><strong>Confidence:</strong> {(item.confidence * 100).toFixed(1)}%</div>
                <div><small>{item.timestamp}</small></div>
              </HistoryItem>
            ))
          ) : (
            <p>No history available yet. Start drawing to see your history here!</p>
          )}
        </HistoryList>
      </ModalContent>
    </ModalOverlay>
  );
};

export default HistoryModal;
