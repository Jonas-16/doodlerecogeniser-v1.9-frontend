import React from 'react';
import styled from '@emotion/styled';

const Doodle = styled.div`
  position: absolute;
  opacity: 0.1;
  pointer-events: none;
  z-index: 0;
  animation: float 15s ease-in-out infinite;
  
  @keyframes float {
    0%, 100% { transform: translateY(0) rotate(${Math.random() * 10 - 5}deg); }
    50% { transform: translateY(-20px) rotate(${Math.random() * 10 - 5}deg); }
  }
`;

const Doodle1 = styled(Doodle)`
  top: 10%;
  left: 10%;
  font-size: 120px;
  animation-delay: 0s;
`;

const Doodle2 = styled(Doodle)`
  top: 70%;
  right: 15%;
  font-size: 100px;
  animation-delay: -3s;
`;

const Doodle3 = styled(Doodle)`
  bottom: 10%;
  left: 20%;
  font-size: 80px;
  animation-delay: -5s;
`;

const Doodle4 = styled(Doodle)`
  top: 20%;
  right: 20%;
  font-size: 90px;
  animation-delay: -2s;
`;

const Doodle5 = styled(Doodle)`
  bottom: 30%;
  right: 25%;
  font-size: 70px;
  animation-delay: -4s;
`;

const DoodleBackground = () => {
  return (
    <>
      <Doodle1>✏️</Doodle1>
      <Doodle2>🎨</Doodle2>
      <Doodle3>🖌️</Doodle3>
      <Doodle4>✒️</Doodle4>
      <Doodle5>🖍️</Doodle5>
    </>
  );
};

export default DoodleBackground;
