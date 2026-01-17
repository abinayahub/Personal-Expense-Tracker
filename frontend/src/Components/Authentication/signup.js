import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import styled from "styled-components";
import API from "../../api";

function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
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
      await API.post("/api/auth/signup", form);
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SignupContainer>
      <SignupCard>
        <h1>Create Account</h1>
        <p className="subtitle">Start managing your finances</p>

        {error && <div className="error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <input
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            required
          />

          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />

          <button type="submit" disabled={loading}>
            {loading ? "Creating..." : "Create Account"}
          </button>
        </form>

        <Link className="login-link" to="/login">
          Already have an account? Sign in
        </Link>
      </SignupCard>
    </SignupContainer>
  );
}

export default Signup;

/* ================= STYLES ================= */

const SignupContainer = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #667eea, #764ba2);
`;

const SignupCard = styled.div`
  background: #ffffff;
  padding: 2rem;
  width: 350px;
  border-radius: 14px;
  text-align: center;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);

  h1 {
    margin-bottom: 0.3rem;
  }

  .subtitle {
    font-size: 0.9rem;
    color: #666;
    margin-bottom: 1rem;
  }

  .error {
    color: #dc2626;
    margin-bottom: 1rem;
    font-size: 0.9rem;
  }

  form {
    display: flex;
    flex-direction: column;
  }

  input {
    padding: 10px;
    margin: 8px 0;
    border-radius: 8px;
    border: 1px solid #ccc;
    font-size: 0.95rem;
  }

  button {
    margin-top: 12px;
    padding: 10px;
    border: none;
    border-radius: 8px;
    background: #667eea;
    color: #fff;
    font-weight: 600;
    cursor: pointer;
  }

  button:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  .login-link {
    display: block;
    margin-top: 1rem;
    font-size: 0.9rem;
    color: #667eea;
    text-decoration: none;
  }
`;
