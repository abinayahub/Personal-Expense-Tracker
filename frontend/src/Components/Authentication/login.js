import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import styled from "styled-components";
import API from "../../api";   // ✅ IMPORTANT

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
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
      // ✅ CORRECT API CALL (NO axios, NO localhost)
      const res = await API.post("/api/auth/login", form);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      navigate("/dashboard");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Invalid credentials. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <LoginContainer>
      <LoginCard>
        <div className="card-header">
          <h1>Sign In</h1>
          <p>Your Personal Finance Manager</p>
        </div>

        <div className="card-body">
          <h2>Welcome Back</h2>
          <p className="subtitle">Sign in to your account</p>

          {error && <div className="error-message">{error}</div>}

          <form onSubmit={handleSubmit}>
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
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <div className="signup-link">
            Don't have an account? <Link to="/signup">Create one</Link>
          </div>
        </div>

        <div className="card-footer">
          <p>🔒 Your data is secure</p>
        </div>
      </LoginCard>
    </LoginContainer>
  );
}

export default Login;

/* ===================== STYLES ===================== */

const LoginContainer = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #667eea, #764ba2);
`;

const LoginCard = styled.div`
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

  .signup-link {
    margin-top: 1rem;
    text-align: center;
  }
`;
