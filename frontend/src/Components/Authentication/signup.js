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
      setError(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Wrapper>
      <Card>
        <h1>Create Account</h1>
        <p>Start managing your finances</p>

        {error && <div className="error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <input name="name" placeholder="Full Name" onChange={handleChange} required />
          <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
          <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
          <button disabled={loading}>{loading ? "Creating..." : "Create Account"}</button>
        </form>

        <Link to="/login">Already have an account? Sign in</Link>
      </Card>
    </Wrapper>
  );
}

export default Signup;

/* styles */
const Wrapper = styled.div`
  min-height:100vh;
  display:flex;
  justify-content:center;
  align-items:center;
  background:#6b6fd6;
`;
const Card = styled.div`
  background:#fff;
  padding:2rem;
  width:350px;
  border-radius:12px;
  text-align:center;
  input{width:100%;padding:10px;margin:8px 0;}
  button{width:100%;padding:10px;margin-top:10px;}
  .error{color:red;margin-bottom:10px;}
`;
