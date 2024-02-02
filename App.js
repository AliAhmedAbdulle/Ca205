import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Member from './pages/Member.jsx';
import Staff from './pages/Staff.jsx';
import Payment from './pages/Payment.jsx';
import Salary from './pages/Salary';
import Sidebar from './components/Sidebar.jsx';
import './css/main.css';
import './css/form.css';
import Login from './components/Login.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/*"
          element={
            <Sidebar>
              <Routes>
                <Route path="/home" element={<Home />} />
                <Route path="/member" element={<Member />} />
                <Route path="/staff" element={<Staff />} />
                <Route path="/payment" element={<Payment />} />
                <Route path="/salary" element={<Salary />} />
              </Routes>
            </Sidebar>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;