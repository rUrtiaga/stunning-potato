import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "../../routes";
import NavBar from "../navBar";

function App() {
  return (
    <Router>
      <div>
        <NavBar>
          <Routes />
        </NavBar>
      </div>
    </Router>
  );
}

export default App;
