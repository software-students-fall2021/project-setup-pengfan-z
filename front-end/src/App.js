// import logo from "./logo.svg";
// import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./pages/Login";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./pages/Home";
import Header from "./components/Header";
import CourseInfo from "./pages/CourseInfo";

function App() {
  return (
    <div className='App'>
      {/* Router for linking different pages */}
      <Router>
        <Header />
        <Switch>
          {/* Now type http://localhost:3000/login to go to the login page */}
          <Route path='/login'>
            <Login />
          </Route>

          <Route path='/:college/:courseId'>
            <CourseInfo />
          </Route>
    
          <Route path='/'>
            <Home /> 
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
