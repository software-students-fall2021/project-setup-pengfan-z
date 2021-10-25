// import logo from "./logo.svg";
// import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./pages/Login";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./pages/Home";
import Header from "./components/Header";

function App() {
  return (
    <div className='App'>
      {/* Router for linking different pages */}
      <Router>
        <Switch>
          {/* Now type http://localhost:3000/login to go to the login page */}
          <Route path='/login'>
            <Header />
            <Login />
          </Route>
    
          <Route path='/'>
            <Header />
            <Home /> 
            </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
