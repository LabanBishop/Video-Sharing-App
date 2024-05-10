import Header from "../../Components/HeaderComp/Header"
import Sidebar from "../../Components/SidebarComp/Sidebar"
import Homescreen from "../../Screens/DifferentScreens/Homescreen"
import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap"
import "../../_App.scss"


const Home = () => {
  const [sidebar, toggleSidebar] = useState(false)

  const handleToggleSidebar = () => toggleSidebar(value => !value)

return(
    <>
      <Header handleToggleSidebar={handleToggleSidebar} />
      <div className="app__container">
          <Sidebar sidebar={sidebar} 
          handleToggleSidebar={handleToggleSidebar}/>
          <Container fluid className="app_main border border-warning">
              <Homescreen />
          </Container>
      </div>
    </>
  )
}


export default Home;