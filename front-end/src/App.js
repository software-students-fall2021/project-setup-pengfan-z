// import logo from "./logo.svg";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./pages/Login";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./pages/Home";
import Header from "./components/Header";
import User from "./pages/User";
import CreateAccount from "./pages/CreateAccount";
import CourseInfo from "./pages/CourseInfo";
import Contact from "./pages/Contact";
import Footer from "./components/Footer";
import { useState } from "react";
import Majors from "./pages/Majors";
import "./css/app.css";

function App() {
  const [loginState, setLoginState] = useState({
    name: "Login",
    path: "/login",
  });

  return (
    <div className='App'>
      {/* Router for linking different pages */}
      <Router>
        <Header LoginState={loginState} SetLoginState={setLoginState} />
        <Switch>
          {/* Now type http://localhost:3000/login to go to the login page */}
          <Route path='/login'>
            <Login LoginState={loginState} SetLoginState={setLoginState} />
          </Route>

          <Route path='/create-account'>
            <CreateAccount />
          </Route>

          <Route path='/user'>
            <User />
          </Route>

          <Route path='/school/:schoolId/:subjectId/:courseId'>
            <CourseInfo />
          </Route>

          <Route path='/school/:schoolId' component={Majors} />

          <Route path='/contact'>
            <Contact />
          </Route>

          <Route path='/'>
            <Home />
          </Route>
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
