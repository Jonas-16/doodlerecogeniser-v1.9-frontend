import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Button } from './components/UIComponents';

const SigninContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: linear-gradient(135deg, #180146ff, #2d0e48ff);
  color: #f8fafc;
`;

const FormBox = styled.div`
  background: rgba(30, 30, 50, 0.9);
  padding: 32px;
  border-radius: 16px;
  min-width: 300px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export default function Signin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignin = async () => {
    // Replace with real API call
    if (email && password.length >= 4) {
      localStorage.setItem('token', 'mock-token');
      navigate('/');
    } else {
      setError('Please enter valid credentials');
    }
  };

  return (
    <SigninContainer>
      <h1>Create Account</h1>
      <FormBox>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ padding: '8px', borderRadius: '6px', border: 'none' }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ padding: '8px', borderRadius: '6px', border: 'none' }}
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
