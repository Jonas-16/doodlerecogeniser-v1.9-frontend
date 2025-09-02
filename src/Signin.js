import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { Button } from './components/UIComponents';
import { AuthContext } from './AuthContext';

const SigninContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  position: relative;
  overflow: hidden;
  /* Premium layered gradient background with vignette */
  background:
    radial-gradient(1200px 600px at 20% -10%, rgba(99, 102, 241, 0.25), transparent 50%),
    radial-gradient(1000px 500px at 120% 10%, rgba(244, 114, 182, 0.18), transparent 45%),
    linear-gradient(135deg, #1f2937 0%, #0b1220 100%);
  color: #f8fafc;
  
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse at center, rgba(0,0,0,0) 40%, rgba(0,0,0,0.35) 100%);
    pointer-events: none;
  }
`;

const FormBox = styled.div`
  background: rgba(17, 24, 39, 0.6);
  padding: 32px;
  border-radius: 16px;
  min-width: 300px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  position: relative;
  z-index: 2;
  box-shadow: 0 20px 60px rgba(0,0,0,0.45), 0 0 0 1px rgba(99, 102, 241, 0.25);
  border: 1px solid rgba(148, 163, 184, 0.25);
  backdrop-filter: blur(12px);
`;

/* Decorative background elements */
const float = keyframes`
  0% { transform: translateY(0) translateX(0) rotate(0deg); }
  50% { transform: translateY(-8px) translateX(4px) rotate(2deg); }
  100% { transform: translateY(0) translateX(0) rotate(0deg); }
`;

const DecorativeBackground = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 1;
`;

const Blob = styled.div`
  position: absolute;
  width: ${props => props.size || 220}px;
  height: ${props => props.size || 220}px;
  border-radius: 50%;
  filter: blur(40px);
  opacity: ${props => props.opacity || 0.35};
  background: ${props => props.color || 'linear-gradient(135deg, #6366f1, #22d3ee)'};
  animation: ${float} ${props => props.duration || 12}s ease-in-out infinite;
`;

const Doodle = styled.div`
  position: absolute;
  font-size: ${props => props.size || 28}px;
  opacity: 0.6;
  filter: drop-shadow(0 4px 12px rgba(0,0,0,0.35));
  animation: ${float} ${props => props.duration || 10}s ease-in-out infinite;
`;

const NoiseOverlay = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: 0.06;
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="140" height="140" viewBox="0 0 140 140"><filter id="n"><feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="2" stitchTiles="stitch"/></filter><rect width="100%" height="100%" filter="url(%23n)" opacity="0.5"/></svg>');
  z-index: 1;
`;

const SVGDoodles = styled.svg`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  opacity: 0.14;
`;

const Title = styled.h1`
  position: relative;
  z-index: 2;
  font-weight: 800;
  letter-spacing: 0.4px;
  margin-bottom: 12px;
  background: linear-gradient(90deg, #a5b4fc, #60a5fa);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Input = styled.input`
  padding: 12px 14px;
  border-radius: 10px;
  border: 1px solid rgba(148, 163, 184, 0.25);
  background: rgba(15, 23, 42, 0.55);
  color: #e5e7eb;
  transition: box-shadow 0.2s ease, border-color 0.2s ease;
  &:focus {
    outline: none;
    border-color: rgba(99, 102, 241, 0.6);
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.25);
    background: rgba(15, 23, 42, 0.7);
  }
`;

export default function Signin() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignin = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const err = await response.json();
        setError(err.detail || "Signup failed");
        return;
      }

      // after signup, automatically login
      const loginRes = await fetch(`${process.env.REACT_APP_BACKEND_URL}/login`, { 
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (loginRes.ok) {
        const data = await loginRes.json();
        localStorage.setItem("token", data.access_token);
        if (data.user_id) {
          localStorage.setItem("user_id", data.user_id);
        }
        login(data.access_token);
        navigate("/");
      } else {
        setError("Signup succeeded, but auto-login failed");
      }
    } catch (err) {
      setError("Server error, try again later");
    }
  };

  return (
    <SigninContainer>
      <DecorativeBackground>
        {/* Glowing gradient blobs */}
        <Blob style={{ top: '-60px', left: '-60px' }} size={260} opacity={0.28} color={'linear-gradient(135deg, #a78bfa, #60a5fa)'} duration={16} />
        <Blob style={{ bottom: '-80px', right: '-80px' }} size={320} opacity={0.22} color={'linear-gradient(135deg, #f472b6, #fb7185)'} duration={18} />
        <Blob style={{ top: '30%', right: '15%' }} size={180} opacity={0.18} color={'linear-gradient(135deg, #22d3ee, #38bdf8)'} duration={14} />

        {/* Floating doodle icons */}
        <Doodle style={{ top: '12%', left: '8%' }} duration={9}>🖌️</Doodle>
        <Doodle style={{ top: '24%', right: '12%' }} duration={11}>✏️</Doodle>
        <Doodle style={{ bottom: '18%', left: '18%' }} duration={10}>⭐</Doodle>
        <Doodle style={{ bottom: '26%', right: '22%' }} duration={12}>🎨</Doodle>
        <Doodle style={{ top: '48%', left: '46%' }} duration={13}>🧠</Doodle>

        {/* Subtle line doodles (SVG) */}
        <SVGDoodles preserveAspectRatio="none">
          <defs>
            <linearGradient id="dl" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#94a3b8" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#c4b5fd" stopOpacity="0.2" />
            </linearGradient>
          </defs>
          <path d="M0 40 Q 120 120 280 60 T 560 120 T 840 80" stroke="url(#dl)" strokeWidth="1.8" fill="none"/>
          <path d="M0 220 Q 140 180 280 240 T 560 200 T 840 260" stroke="url(#dl)" strokeWidth="1.2" fill="none"/>
          <path d="M0 400 Q 160 460 320 420 T 640 460 T 960 440" stroke="url(#dl)" strokeWidth="1.4" fill="none"/>
          <circle cx="220" cy="160" r="4" fill="#a78bfa"/>
          <circle cx="480" cy="300" r="3" fill="#60a5fa"/>
          <circle cx="700" cy="120" r="3" fill="#f472b6"/>
        </SVGDoodles>
        <NoiseOverlay />
      </DecorativeBackground>

      <Title>Create Account</Title>
      <FormBox>
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <div style={{ color: '#f87171' }}>{error}</div>}
        <Button fullWidth primary onClick={handleSignin}>
          Sign Up
        </Button>
        <Button fullWidth onClick={() => navigate('/login')}>
          Back to Login
        </Button>
      </FormBox>
    </SigninContainer>
  );
}