import React from 'react';
import { useNavigate } from 'react-router-dom';
import RegisterForm from '../components/RegisterForm';

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();

  const handleRegisterSuccess = () => {
    navigate('/login');
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Register</h1>
      <RegisterForm onSuccess={handleRegisterSuccess} />
      <p className="mt-4 text-sm">
        Already have an account? <a href="/login" className="text-blue-500">Login here</a>
      </p>
    </div>
  );
};

export default RegisterPage;
