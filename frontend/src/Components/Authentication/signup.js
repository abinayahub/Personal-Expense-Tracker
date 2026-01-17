import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import styled from "styled-components";
import API from "../../api";   // ✅ IMPORTANT

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
      // ✅ CORRECT API CALL (NO localhost)
      await API.post("/api/auth/signup", form);

      navigate("/login");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Signup failed. Please try again."
      );
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
              <label>Full Name</label>
              <input
                name="name"
                type="text"
                value={form.name}
                onChange={handleChange}
                required
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                required
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                required
                disabled={loading}
              />
            </div>

            <button type="submit" disabled={loading} className="submit-btn">
              {loading ? "Creating..." : "Create Account"}
            </button>
          </form>

          <div className="login-link">
            Already have an account? <Link to="/login">Sign in</Link>
          </div>
        </div>
      </SignupCard>
    </SignupContainer>
  );
}

export default Signup;

/* ===================== STYLES ===================== */

const SignupContainer = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #667eea, #764ba2);
`;

const SignupCard = styled.div`
  background: #fff;
  border-radius: 16px;
  width: 100%;
  max-width: 420px;
  padding: 2rem;

  .card-header {
    text-align: center;
    margin-bottom: 1rem;
  }

  .card-body {
    display: flex;
    flex-direction: column;
  }

  .error-message {
    color: red;
    margin-bottom: 1rem;
    text-align: center;
  }

  .form-group {
    display: flex;
    flex-direction: column;
    margin-bottom: 1rem;
  }

  .submit-btn {
    padding: 0.8rem;
    background: #667eea;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
  }

  .login-link {
    margin-top: 1rem;
    text-align: center;
  }
`;
