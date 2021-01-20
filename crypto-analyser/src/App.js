import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/style.css";
import CurrencyTable from "./components/CurrencyTable";

// App component
function App() {
  return (
    <Router>
      <div className="outer">
        <h1>UTU Coding Test</h1>
        <div className="container">
          <Route path="/" exact component={CurrencyTable} />
        </div>
      </div>
    </Router>
  );
}

export default App;
