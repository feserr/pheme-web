import { useEffect, useState } from 'react';
import './App.css';
import Login from './pages/login';
import Nav from './components/nav';
import Home from './pages/home';
import Register from './pages/register';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    (
      async () => {
        const response = await fetch(`${process.env.REACT_APP_PHEME_AUTH_URL}/api/v1/auth/user`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });

        const content = await response.json();

        setUserName(content.userName);
      }
    )();
  });

  return (
    <div className="App">
      <BrowserRouter>
        <Nav userName={userName} setUserName={setUserName} />

        <main className="form-signin w-100 m-auto">
          <Routes>
            <Route path="/" element={<Home userName={userName} />} />
            <Route path="/login" element={<Login setUserName={setUserName} />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </main>
      </BrowserRouter>
    </div >
  );
}

export default App;
