import React, { useState, useMemo } from "react";
import styled from "styled-components";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import bg from "./img/bg.png";
import { MainLayout } from "./styles/Layouts";
import Orb from "./Components/Orb/Orb";
import Navigation from "./Components/Navigation/Navigation";
import Dashboard from "./Components/Dashboard/Dashboard";
import Income from "./Components/Income/Income";
import Expenses from "./Components/Expenses/Expenses";
import Signup from "./Components/Authentication/signup";
import Login from "./Components/Authentication/login";
import Transactions from "./Components/Transactions/Transactions";

function App() {
  const [active, setActive] = useState(1);
  const isLoggedIn = !!localStorage.getItem("token"); // simple auth check

  const orbMemo = useMemo(() => <Orb />, []);

  const displayData = () => {
    switch (active) {
      case 1:
        return <Dashboard />;
      case 2:
        return <Transactions />;
      case 3:
        return <Income />;
      case 4:
        return <Expenses />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <Router>
      <AppStyled bg={bg}>
        {orbMemo}
        <Routes>
          {/* Default route: Go to login if not logged in */}
          <Route
            path="/"
            element={isLoggedIn ? <Navigate to="/dashboard" /> : <Navigate to="/login" />}
          />

          {/* Auth routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Protected dashboard */}
          <Route
            path="/dashboard"
            element={
              isLoggedIn ? (
                <MainLayout>
                  <Navigation active={active} setActive={setActive} />
                  <main>{displayData()}</main>
                </MainLayout>
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
        </Routes>
      </AppStyled>
    </Router>
  );
}

const AppStyled = styled.div`
  height: 100vh;
  background-image: url(${(props) => props.bg});
  position: relative;
  main {
    flex: 1;
    background: rgba(252, 246, 249, 0.78);
    border: 3px solid #ffffff;
    backdrop-filter: blur(4.5px);
    border-radius: 32px;
    overflow-x: hidden;
    &::-webkit-scrollbar {
      width: 0;
    }
  }
`;

export default App;
