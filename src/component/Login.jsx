import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import apiClient from '../utils/apiClient';
import '../../src/style/Login.css';
import { useAuth } from '../Context/AuthContext'; 

export default function Login() {
  const { login } = useAuth();

  const [form, setForm]   = useState({ username: '', password: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  
  const handleChange = e => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    // basic front-end check
    const errs = {};
    if (!form.username) errs.username = 'Required';
    if (!form.password) errs.password = 'Required';
    if (Object.keys(errs).length) return setErrors(errs);

    setLoading(true);
    try {
      // your backend wants URL-encoded
      const params = new URLSearchParams(form);
      const resp = await apiClient.post('/auth/login', params, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      });

      const token = resp.data.access_token;
      if (!token) throw new Error('No token returned');

      // HAND-OFF to AuthContext
      login(token);

      // AuthContext.redirects you, but just in case:
    } catch (err) {
      console.error(err);
      setErrors({ form: err.response?.data?.message || err.message });
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
       <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form-container">
        <h1>Log In</h1>
        {errors.form && <p className="error-message">{errors.form}</p>}

        <label>Username
          <input
            name="username"
            value={form.username}
            onChange={handleChange}
            disabled={loading}
          />
          {errors.username && <small>{errors.username}</small>}
        </label>

        <label>Password
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            disabled={loading}
          />
          {errors.password && <small>{errors.password}</small>}
        </label>

        <button type="submit" disabled={loading}>
          {loading ? 'Logging in…' : 'Log In'}
        </button>
        <p>
          Don’t have an account? <Link to="/register">Register</Link>
        </p>
      </form>
      </div>
    </div>
  );
}
