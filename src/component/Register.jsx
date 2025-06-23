import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import apiClient from '../utils/apiClient';
import '../../src/style/Register.css'; // Make sure the CSS file is still imported

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await apiClient.post('/api/users/registerUser', formData);

        console.log('Client created successfully:', response.data);
        alert('Registration successful!');
        navigate('/login');

        setFormData({
          username: '',
          email: '',
          phone: '',
          password: '',
          confirmPassword: '',
        });
        setErrors({});
      } catch (error) {
         console.error('Error creating client:', error.response ? error.response.data : error.message);
         // It's better to parse the error response if it's JSON
         let errorMessage = error.message;
         if (error.response && error.response.data) {
             try {
                 // Attempt to parse Spring's default error response structure
                 if (error.response.data.message) {
                      errorMessage = error.response.data.message;
                 } else {
                      errorMessage = JSON.stringify(error.response.data);
                 }
             } catch (jsonError) {
                 errorMessage = error.response.data.toString();
             }
         }
         alert(`Registration failed: ${errorMessage}`);
      }
    } else {
      console.log('Form has errors');
    }
  };

  const validateForm = (data) => {
    let errors = {};

    if (!data.username) {
      errors.username = 'Username is required';
    }
    if (!data.phone) {
      errors.phone = 'Phone Number is required';
    }
    if (!data.email) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      errors.email = 'Invalid email format';
    }
    if (!data.password) {
      errors.password = 'Password is required';
    } else if (data.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }
    if (!data.confirmPassword) {
      errors.confirmPassword = 'Confirm Password is required';
    } else if (data.password !== data.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    return errors;
  };

  return (
    <div className="register-page">
    <div className="register-container">
      <div className="register-form-container">
        <h1>Register</h1>
        <p>Create your account</p>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username">Username:</label>
            <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} />
            {errors.username && <p className="error-message">{errors.username}</p>}
          </div>

          
            <div>
              <label htmlFor="phone">Phone Number:</label>
              <input type="text" id="phone" name="phone" value={formData.phone} onChange={handleChange} />
              {errors.phone && <p className="error-message">{errors.phone}</p>}
            </div>
         

          <div>
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} />
            {errors.email && <p className="error-message">{errors.email}</p>}
          </div>

          <div className="two-inputs-row">
            <div>
              <label htmlFor="password">Password:</label>
              <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} />
              {errors.password && <p className="error-message">{errors.password}</p>}
            </div>
            <div>
              <label htmlFor="confirmPassword">Confirm Password:</label>
              <input type="password" id="confirmPassword" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} />
              {errors.confirmPassword && <p className="error-message">{errors.confirmPassword}</p>}
            </div>
          </div>

          <button type="submit">Register</button>
          <p>
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </form>
      </div>
      </div>
    </div>
  );
};

export default Register;