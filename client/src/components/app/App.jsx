import React from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import Routes from "../../routes";

function App() {
  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/">Inicio</Link>
          </li>
          <li>
            <Link to="/find">Buscar</Link>
          </li>
        </ul>

        <hr />
        <Routes />
      </div>
    </Router>
  );
}

export default App;
