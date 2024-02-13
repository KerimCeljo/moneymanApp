import React, {useState, useMemo} from 'react'
import styled from "styled-components";
import bg from './img/bg.png';
import {MainLayout} from './styles/Layouts'
import Orb from './Components/Orb/Orb'
import Navigation from "./Components/Navigation/Navigation";
import Dashboard from './Components/Dashboard/Dashboard';
import Income from './Components/Income/Income'
import Expenses from './Components/Expenses/Expenses';
import { useGlobalContext } from './context/globalContext';
import Registration from './Components/Registration/Registration';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Login from './Components/Login/Login';

function App() {
  const [active, setActive] = useState(1)
  const global = useGlobalContext()

  const displayData = () => {
    const jwtToken = localStorage.getItem('jwtToken');
  
    if (!jwtToken) {
      <Router>
        <Registration />;
      </Router>
    }
  
    switch (active) {
      case 1:
        return <Dashboard />;
      case 2:
        return <Dashboard />;
      case 3:
        return <Income />;
      case 4:
        return <Expenses />;
      default:
        return <Dashboard />;
    }
  };
  
  const orbMemo = useMemo(() => {
    return <Orb />;
  }, []);

  const jwtToken = localStorage.getItem('jwtToken');

  return (
    <Router>
      <AppStyled bg={bg} className="App">
      <Routes>
        <Route path="/register" element={<Registration />} />
        <Route path="/login" element={<Login />} />
      </Routes>
        {orbMemo}
        {jwtToken ? (
          <MainLayout>
            <Navigation active={active} setActive={setActive} />
            <main>{displayData()}</main>
          </MainLayout>
        ) : (
          <Registration />
        )}
      </AppStyled>
    </Router>
  );
}

const AppStyled = styled.div`
  height: 100vh;
  background-image: url(${props => props.bg});
  position: relative;

  main {
    flex: 1;
    background: rgba(252, 246, 249, 0.78);
    border: 3px solid #FFFFFF;
    backdrop-filter: blur(4.5px);
    border-radius: 32px;
    overflow-x: hidden;
    &::-webkit-scrollbar {
      width: 0;
    }
  }
`;

export default App;