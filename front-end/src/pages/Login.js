import { useState } from "react";
import { Button, Container, Row, Col, Alert, Form } from "react-bootstrap";
import "../css/login.css";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";

function Login(props) {
  const [username, setUserName] = useState("");
  const [password, setPassWord] = useState("");
  const [alert, setAlert] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [data, setData] = useState([]);
  const [isValid, setIsValid] = useState(false);

  // const handleLogin = () => {
  const handleLogin = async (e) => {
    if (username === "" || password === "") {
      setAlert("Every field is required.");
      setShowAlert(true);
    } else {
      try {
        const requestData = {
          username,
          password,
        };
        const response = await axios.post("/user/signin", requestData);
        console.log(response.data);

        setData(response.data);
        setAlert("Success!");
        setShowAlert(true);
        setIsValid(true);
      } catch (err) {
        console.log(err.message, err.name);
        setAlert("Account or password is wrong.");
        setShowAlert(true);
        //throw new Error(err)
      }
    }
  };

  useEffect(() => {
    // if the login was a success, call the setuser function that was passed to this component as a prop
    if (data.token) {
      // Store the token in local storage
      localStorage.setItem("JWT_TOKEN", data.token);
      //console.log(`User successfully logged in: ${data.username}`)
      props.setUser(data.user);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  if (isValid) {
    props.SetLoginState({ name: username, path: "/user" });
    return <Redirect to='/user' />;
  } else {
    return (
      <div>
        {/* <h2>{password}</h2> */}
        {/* <form> */}
        <Alert
          variant='danger'
          onClose={() => setShowAlert(false)}
          show={showAlert}
          dismissible
        >
          <p>{alert}</p>
        </Alert>
        <Container fluid className='loginForm'>
          <Row>
            <Col className='d-flex justify-content-center align-items-center'>
              <Form.Group>
                <Form.Label>Username:</Form.Label>
                <Form.Control
                  type='text'
                  onChange={(event) => setUserName(event.target.value)}
                ></Form.Control>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col className='d-flex justify-content-center align-items-center'>
              <Form.Group>
                <Form.Label className='input'>Password: </Form.Label>
                <Form.Control
                  type='password'
                  onChange={(event) => setPassWord(event.target.value)}
                ></Form.Control>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col className='d-flex justify-content-center align-items-center'>
              <Button
                variant='outline-primary'
                className='button'
                onClick={handleLogin}
              >
                Login
              </Button>
            </Col>
          </Row>
          <Row>
            <Col className='d-flex justify-content-center align-items-center'>
              <Button className='button' variant='outline-primary'>
                <Link to='/create-account' className='btnLink'>
                  Create Account
                </Link>
              </Button>
            </Col>
          </Row>
          {/* </form> */}
        </Container>
      </div>
    );
  }
}

export default Login;
