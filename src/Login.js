import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { Button } from './components/UIComponents';
import { AuthContext } from './AuthContext';
import DoodleBackground from './components/DoodleBackground';

// Background gradient with subtle blobs
const LoginContainer = styled.div`
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  color: #fff;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
  overflow: hidden;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;

  /* subtle vignette overlay */
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    pointer-events: none;
    background:
      radial-gradient(120% 80% at 50% 10%, rgba(255,255,255,0.04), transparent 60%),
      radial-gradient(120% 100% at 50% 120%, rgba(0,0,0,0.35), transparent 60%);
    mix-blend-mode: soft-light;
  }
`;

const Blob = styled.div`
  position: absolute;
  filter: blur(80px);
  opacity: 0.3;
  border-radius: 50%;
  pointer-events: none;
`;

const BlobPurple = styled(Blob)`
  width: 420px; height: 420px;
  left: -120px; top: -80px;
  background: radial-gradient(circle at 30% 30%, rgba(139,92,246,0.7), rgba(139,92,246,0.12));
`;

const BlobBlue = styled(Blob)`
  width: 520px; height: 520px;
  right: -180px; bottom: -140px;
  background: radial-gradient(circle at 60% 60%, rgba(59,130,246,0.65), rgba(59,130,246,0.1));
`;

const glowPulse = keyframes`
  0% { opacity: 0.6; transform: scale(0.98); }
  50% { opacity: 1; transform: scale(1); }
  100% { opacity: 0.6; transform: scale(0.98); }
`;

// Soft glow behind card
const CardGlow = styled.div`
  position: absolute;
  inset: 0;
  margin: auto;
  width: min(560px, 92vw);
  height: 60%;
  filter: blur(40px);
  background: radial-gradient(closest-side, rgba(147, 197, 253, 0.25), transparent),
              radial-gradient(closest-side, rgba(196, 181, 253, 0.25), transparent);
  z-index: 0;
  animation: ${glowPulse} 6s ease-in-out infinite;
`;

const FormBox = styled.div`
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 420px;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 40px 32px;
  border-radius: 24px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  transform: translateY(8px);
  opacity: 0;
  animation: fadeInUp 600ms ease forwards;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(0);
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.4);
  }

  @keyframes fadeInUp {
    to { transform: translateY(0); opacity: 1; }
  }
`;

const Logo = styled.div`
  font-size: 48px;
  text-align: center;
  margin-bottom: 8px;
  background: linear-gradient(45deg, #6366f1, #8b5cf6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  filter: drop-shadow(0 4px 15px rgba(99, 102, 241, 0.4));
`;

const Title = styled.h1`
  margin: 0 0 8px 0;
  text-align: center;
  font-size: 2.2rem;
  font-weight: 800;
  letter-spacing: -0.5px;
  color: #fff;
  background: linear-gradient(90deg, #fff, #a5b4fc);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const Subtitle = styled.p`
  margin: 0 0 8px 0;
  text-align: center;
  color: #c7d2fe;
  opacity: 0.9;
  font-weight: 500;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const FieldWrapper = styled.div`
  position: relative;
`;

const InputIcon = styled.span`
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 16px;
  opacity: 0.9;
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 16px 16px 16px 48px;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.05);
  color: #fff;
  font-size: 15px;
  outline: none;
  transition: all 0.3s ease;
  backdrop-filter: blur(5px);
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }

  &:focus {
    border-color: rgba(59, 130, 246, 0.8);
    box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.2);
    background: rgba(30, 41, 59, 0.9);
  }
`;

const ErrorText = styled.div`
  color: #fca5a5;
  font-size: 0.9rem;
`;

const Actions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const PrimaryButton = styled(Button)`
  background: linear-gradient(45deg, #6366f1, #8b5cf6) !important;
  color: white !important;
  border: none !important;
  border-radius: 12px !important;
  padding: 16px 24px !important;
  font-size: 16px !important;
  font-weight: 600 !important;
  letter-spacing: 0.5px !important;
  text-transform: none !important;
  box-shadow: 0 4px 20px rgba(99, 102, 241, 0.3) !important;
  transition: all 0.3s ease !important;
  position: relative;
  overflow: hidden;
  z-index: 1;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(45deg, #8b5cf6, #6366f1);
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: -1;
  }
  
  &:hover {
    transform: translateY(-2px) !important;
    box-shadow: 0 8px 25px rgba(99, 102, 241, 0.5) !important;
    
    &::before {
      opacity: 1;
    }
  }
  
  &:active {
    transform: translateY(0) !important;
    box-shadow: 0 2px 10px rgba(99, 102, 241, 0.4) !important;
  }
`;

const SecondaryButton = styled(Button)`
  background: rgba(255,255,255,0.06) !important;
  color: #e5e7eb !important;
  border: 1px solid rgba(148,163,184,0.35) !important;
  border-radius: 12px !important;
  padding: 12px 16px !important;
  transition: transform 120ms ease, filter 120ms ease !important;
  &:hover { filter: brightness(1.05); transform: translateY(-1px); }
`;

/* Removed GoogleButton and Forgot Password link per request */

export default function Login() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      });
      const data = await response.json();

      if (response.ok && data.access_token) {
        login(data.access_token);   // ✅ use access_token now
        if (data.user_id) {
          localStorage.setItem("user_id", data.user_id);
        }
        localStorage.setItem("username", data.username);
        navigate("/");
      } else {
        setError(data.detail || "Login failed");
      }
    } catch (error) {
      setError("Something went wrong. Try again.");
    }
  };


  return (
    <LoginContainer>
      <DoodleBackground />
      <BlobPurple />
      <BlobBlue />
      <CardGlow />
      <FormBox>
        <Logo>🖌️</Logo>
        <Title>Doodle Recognizer</Title>
        <Subtitle>Draw. Recognize. Learn.</Subtitle>

        <InputGroup>
          <FieldWrapper>
            <InputIcon>👤</InputIcon>
            <StyledInput
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              aria-label="Username"
              required
            />
          </FieldWrapper>
          <FieldWrapper>
            <InputIcon>🔒</InputIcon>
            <StyledInput
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              aria-label="Password"
              required
            />
          </FieldWrapper>
        </InputGroup>

        {error && <ErrorText>{error}</ErrorText>}

        <Actions>
          <PrimaryButton fullWidth onClick={handleLogin}>Login</PrimaryButton>
          <SecondaryButton fullWidth onClick={() => navigate('/signin')}>Sign Up</SecondaryButton>
          <SecondaryButton
            fullWidth
            onClick={() => {
              localStorage.setItem("username", "Guest");
              navigate("/");
            }}
          >
            Skip for now
          </SecondaryButton>
        </Actions>
      </FormBox>
    </LoginContainer>
  );
}