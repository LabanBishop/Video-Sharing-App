import Header from "./Components/HeaderComp/Header"
import Sidebar from "./Components/SidebarComp/Sidebar"
import Homescreen from "./Screens/DifferentScreens/Homescreen"
import Upload from "./Screens/Pages/Upload"
import Login from "./Components/Auth/Login"
import SignUp from "./Components/Auth/SignUp"
import Profile from "./Components/Auth/AuthDetails"
import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap"
import VideoPlayer from "./Components/VideoComp/VideoPlayer"
import "./_App.scss"

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { auth } from './Firebase';
import { onAuthStateChanged } from "firebase/auth";

const Layout = ({ children }) => {
  const [sidebar, toggleSidebar] = useState(false)

  const handleToggleSidebar = () => toggleSidebar(value => !value)

  return (
    <>
      <Header handleToggleSidebar={handleToggleSidebar} />
      <div className='app__container'>
        <Sidebar
          sidebar={sidebar}
          handleToggleSidebar={handleToggleSidebar}
        />
        <Container fluid className='app__main '>
          {children}
        </Container>
      </div>
    </>
  )
}

const App = () => {
  const [authUser, setAuthUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
      } else {
        setAuthUser(null);
      }
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <Routes>
        <Route path='/' element={authUser ? <Layout><Homescreen /></Layout> : <Navigate to="/Login" />} />
        <Route path='/Login' element={<Login />} />
        <Route path='/SignUp' element={<SignUp />} />
        <Route path='/Search' element={<Layout><h1>Search Results</h1></Layout>} />
        <Route path="/Upload" element={authUser ? <Layout><Upload /></Layout> : <Navigate to="/Login" />} />
        <Route path="/Profile" element={authUser ? <Layout><Profile /></Layout> : <Navigate to="/Login" />} />
        <Route exact path="/video/:id" element={<Layout><VideoPlayer /></Layout>} />
      </Routes>
    </Router>
  )
}

export default App;