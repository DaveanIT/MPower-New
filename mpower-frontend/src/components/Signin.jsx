import React, { useState } from 'react';
import '../assets/static/css/signin.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    const userData = { username, password };
    console.log(userData);

    setTimeout(async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/v1/login/', {
          params: {
            username,
            password
          }
        });

        console.log(response.data);

        sessionStorage.setItem('UserId', response.data.data.UserId);
        sessionStorage.setItem('UserName', response.data.username);
        navigate('/branch');
      } catch (error) {
        console.log("Invalid credentials");
        setError("Invalid Credentials");
        sessionStorage.setItem('UserId', null);
      } finally {
        setLoading(false);
      }
    }, 1000);
  };

  return (
    <div className="container d-flex align-items-center justify-content-center vh-100">
      <div className="card shadow" style={{ width: '400px' }}>
        <div className="card-body">
          <h3 className="text-center mb-4">Login</h3>
          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">Username</label>
              <input
                type="text"
                className="form-control"
                id="username"
                placeholder="Enter Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                autoComplete="username"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
              />
            </div>
            <div className="d-grid gap-2">
              {error && <div className="text-danger">{error}</div>}
              {loading ? (
                <button className="btn btn-primary" disabled>
                  <FontAwesomeIcon icon={faSpinner} spin />
                  Logging in...
                </button>
              ) : (
                <button className="btn btn-primary">Login</button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signin;
