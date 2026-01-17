import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import styled from "styled-components";
import API from "../../api";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/api/auth/login", form);
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch {
      setError("Invalid credentials");
    }
  };

  return (
    <LoginContainer>

      <LoginCard>

        <h1>Sign In</h1>
        {error && <div className="error">{error}</div>}
        <form onSubmit={submit}>
          <input type="email" placeholder="Email" onChange={e=>setForm({...form,email:e.target.value})}/>
          <input type="password" placeholder="Password" onChange={e=>setForm({...form,password:e.target.value})}/>
          <button>Login</button>
        </form>
        <Link to="/signup">Create account</Link>
      </LoginCard>

      </LoginContainer>

    
  );
}

export default Login;
