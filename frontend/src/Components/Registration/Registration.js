import styled from 'styled-components';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Styled components
const RegistrationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(45deg, #3494e6, #ec6ead);
`;

const RegistrationForm = styled.form`
  width: 450px;
  padding: 40px;
  background-color: #f4f4f4;
  border-radius: 15px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
  color: #333;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
`;

const Button = styled.button`
  width: 100%;
  padding: 12px;
  background-color: black;
  color: #ffffff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 18px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #7f8c8d; 
  }
`;

const LoginLink = styled.p`
  margin-top: 20px;
  text-align: center;
  color: #333;
  font-size: 16px;

  a {
    color: #3498db;
    text-decoration: underline;
    cursor: pointer;
  }
`;

const Registration = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleRegistrationSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/v1/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Registration successful
        toast.success('Registration successful');
        setTimeout(() => navigate("/login"), 1500);
      } else {
        console.error('Registration failed');
      }
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };

  return (
    <RegistrationContainer>
      <RegistrationForm onSubmit={handleRegistrationSubmit}>
        <h2 style={{ textAlign: 'center', marginBottom: '30px', color: '#333' }}>
          Register
        </h2>
        <FormGroup>
          <Label htmlFor="firstName">First Name:</Label>
          <Input type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleInputChange} required />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="lastName">Last Name:</Label>
          <Input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleInputChange} required />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="email">Email:</Label>
          <Input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} required />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="password">Password:</Label>
          <Input type="password" id="password" name="password" value={formData.password} onChange={handleInputChange} required />
        </FormGroup>
        <Button type="submit">Register</Button>
        <LoginLink onClick={handleLoginClick}>
          <a>Already have an account? Login</a>
        </LoginLink>
      </RegistrationForm>
      <ToastContainer />
    </RegistrationContainer>
  );
};

export default Registration;