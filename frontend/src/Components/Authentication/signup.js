import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import styled from "styled-components";

function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await axios.post(
  "https://personal-expense-tracker-backend-xp5p.onrender.com/api/auth/signup",
  form
);

      //await axios.post("http://localhost:5000/api/auth/signup", form);
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SignupContainer>
      <SignupCard>
        <div className="card-header">
          <h1>Create Account</h1>
          <p>Join our community</p>
        </div>

        <div className="card-body">
          <h2>Create Account</h2>
          <p className="subtitle">Start managing your finances today</p>

          {error && <div className="error-message">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="John Doe"
                value={form.name}
                onChange={handleChange}
                required
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="your@email.com"
                value={form.email}
                onChange={handleChange}
                required
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
                required
                disabled={loading}
              />
              <p className="helper-text">Minimum 6 characters recommended</p>
            </div>

            <button type="submit" disabled={loading} className="submit-btn">
              {loading ? "Creating account..." : "Create Account"}
            </button>
          </form>

          <div className="login-link">
            Already have an account?{" "}
            <Link to="/login">Sign in here</Link>
          </div>
        </div>

        <div className="card-footer">
          <p>🔒 Your data is secure and encrypted</p>
        </div>
      </SignupCard>
    </SignupContainer>
  );
}

const SignupContainer = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  font-family: 'Nunito', sans-serif;
  padding: 1rem;
`;

const SignupCard = styled.div`
  background: #fff;
  border-radius: 20px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  width: 100%;
  max-width: 420px;
  overflow: hidden;
  animation: slideUp 0.5s ease-out;

  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .card-header {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: #fff;
    padding: 2rem 1.5rem;
    text-align: center;

    h1 {
      font-size: 2rem;
      margin: 0;
      font-weight: 700;
    }

    p {
      font-size: 0.9rem;
      margin: 0.5rem 0 0 0;
      opacity: 0.9;
    }
  }

  .card-body {
    padding: 2rem 1.5rem;

    h2 {
      font-size: 1.5rem;
      color: #1a1f3a;
      margin: 0 0 0.5rem 0;
      font-weight: 700;
    }

    .subtitle {
      color: #9ca3af;
      font-size: 0.9rem;
      margin: 0 0 1.5rem 0;
    }

    .error-message {
      background: rgba(239, 68, 68, 0.1);
      color: #dc2626;
      padding: 1rem;
      border-radius: 10px;
      margin-bottom: 1.5rem;
      text-align: center;
      font-weight: 500;
      border-left: 4px solid #dc2626;
    }

    form {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    .form-group {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;

      label {
        font-size: 0.85rem;
        font-weight: 600;
        color: #1a1f3a;
        text-transform: uppercase;
        letter-spacing: 0.3px;
      }

      input {
        padding: 0.9rem 1rem;
        border: 2px solid #f0f0f0;
        border-radius: 10px;
        font-family: inherit;
        font-size: 0.95rem;
        color: #1a1f3a;
        background: #f9fafb;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

        &::placeholder {
          color: #d1d5db;
        }

        &:focus {
          outline: none;
          border-color: #667eea;
          background: #fff;
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
        }

        &:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
      }

      .helper-text {
        font-size: 0.75rem;
        color: #9ca3af;
        margin: 0;
      }
    }

    .submit-btn {
      padding: 1rem;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: #fff;
      border: none;
      border-radius: 10px;
      font-size: 1rem;
      font-weight: 700;
      cursor: pointer;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      margin-top: 0.5rem;

      &:hover:not(:disabled) {
        transform: translateY(-2px);
        box-shadow: 0 8px 20px rgba(102, 126, 234, 0.4);
      }

      &:active:not(:disabled) {
        transform: translateY(0);
      }

      &:disabled {
        opacity: 0.8;
        cursor: not-allowed;
      }
    }

    .login-link {
      text-align: center;
      font-size: 0.9rem;
      color: #6b7280;
      margin-top: 1.5rem;

      a {
        color: #667eea;
        text-decoration: none;
        font-weight: 600;
        transition: color 0.3s ease;

        &:hover {
          color: #764ba2;
          text-decoration: underline;
        }
      }
    }
  }

  .card-footer {
    background: #f9fafb;
    border-top: 1px solid #f0f0f0;
    padding: 1rem 1.5rem;
    text-align: center;
    font-size: 0.85rem;
    color: #9ca3af;
  }

  @media (max-width: 480px) {
    .card-header {
      padding: 1.5rem;

      h1 {
        font-size: 1.75rem;
      }
    }

    .card-body {
      padding: 1.5rem;

      h2 {
        font-size: 1.25rem;
      }

      form {
        gap: 1.25rem;
      }
    }
  }
`;

export default Signup;
