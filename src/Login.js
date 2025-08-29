import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Button } from './components/UIComponents';
import { AuthContext } from './AuthContext';

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: linear-gradient(135deg, #4a00e0, #8e2de2);
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

export default function Login() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (response.ok && data.access_token) {
        // ✅ Save token in localStorage
        localStorage.setItem("token", data.access_token);

        // Optional: Save user info if backend sends it
        if (data.user) {
          localStorage.setItem("user", JSON.stringify(data.user));
        }

        // ✅ Redirect to home/dashboard
        window.location.href = "/";
      } else {
        alert(data.detail || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Something went wrong. Try again.");
    }
  };

  return (
    <LoginContainer>
      <h1>Doodle Recognizer</h1>
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
        <Button fullWidth primary onClick={handleLogin}>
          Login
        </Button>
        <Button fullWidth onClick={() => navigate('/signin')}>
          Sign Up
        </Button>
      </FormBox>
    </LoginContainer>
  );
}