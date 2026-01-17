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
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Card>
        <h1>Create Account</h1>

        {error && <p className="error">{error}</p>}

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

        <Link to="/login">Already have an account? Sign in</Link>
      </Card>
    </Container>
  );
}

export default Signup;

/* styles */
const Container = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #6b6fd6;
`;

const Card = styled.div`
  background: #fff;
  padding: 2rem;
  width: 350px;
  border-radius: 12px;
  text-align: center;

  input {
    width: 100%;
    padding: 10px;
    margin: 8px 0;
  }

  button {
    width: 100%;
    padding: 10px;
    margin-top: 10px;
  }

  .error {
    color: red;
    margin-bottom: 10px;
  }
`;
