import React from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../components/LoginForm';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  const handleLoginSuccess = () => {
    navigate('/products');
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <LoginForm onSuccess={handleLoginSuccess} />
      <p className="mt-4 text-sm">
        Don't have an account? <a href="/register" className="text-blue-500">Register here</a>
      </p>
    </div>
  );
};

export default LoginPage;
