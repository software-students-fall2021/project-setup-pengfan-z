// import logo from "./logo.svg";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory,
} from "react-router-dom";
import Login from "./pages/Login";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./pages/Home";
import Header from "./components/Header";
import User from "./pages/User";
import CreateAccount from "./pages/CreateAccount";
import CourseInfo from "./pages/CourseInfo";
import Contact from "./pages/Contact";
import Footer from "./components/Footer";
import { useState, useEffect } from "react";
import Majors from "./pages/Majors";
import "./css/app.css";
import Courses from "./pages/Courses";
import axios from "axios";
// import Auth from "./components/Auth";

function App() {
  const history = useHistory();
  const [loginState, setLoginState] = useState({
    name: "Login",
    path: "/login",
  });

  const [user, setUser] = useState(null);
  // If the user has a token, make sure that they stay logged in
  useEffect(() => {
    const token = localStorage.getItem("JWT_TOKEN");
    if (token) {
      axios
        .get("/user/me", {
          headers: {
            Authorization: token,
          },
        })
        .then((res) => {
          setUser(res.data.user);
        })
        .catch((err) => {
          console.error(err.message);
          history.push("/");
        });
    }
  }, []);

  return (
    <div className="App">
      {/* Router for linking different pages */}
      <Router>
        <Header
          user={user}
          setUser={setUser}
          LoginState={loginState}
          SetLoginState={setLoginState}
        />
        <Switch>
          {/* Now type http://localhost:3000/login to go to the login page */}
          <Route path="/login">
            <Login
              setUser={setUser}
              LoginState={loginState}
              SetLoginState={setLoginState}
            />
          </Route>

          <Route path="/create-account">
            <CreateAccount />
          </Route>

          <Route path="/user">
            {/* <Auth /> */}
            <User user={user} />
          </Route>

          <Route exact path="/school/:schoolId" component={Majors} />

          <Route
            exact
            path="/school/:schoolId/:subjectId"
            component={Courses}
          />

          <Route path="/school/:schoolId/:subjectId/:courseId">
            <CourseInfo />
          </Route>

          <Route path="/school/:schoolId" component={Majors} />

          <Route path="/contact">
            <Contact />
          </Route>

          <Route path="/">
            <Home />
          </Route>
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
