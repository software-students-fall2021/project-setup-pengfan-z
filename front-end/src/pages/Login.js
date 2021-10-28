import { useState } from "react";
import { Button, Container, Row, Col, Alert, Form } from "react-bootstrap";
import "../css/login.css";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";

function Login() {
  const [username, setUserName] = useState("");
  const [password, setPassWord] = useState("");
  const [alert, setAlert] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [data, setData] = useState([]);
  const [isValid, setIsValid] = useState(false);

  const handleLogin = () => {
    console.log(data);
    if (username === "" || password === "") {
      setAlert("Every field is required.");
      setShowAlert(true);
    } else if (!authentication()) {
      setAlert("Account or password is wrong.");
      setShowAlert(true);
    } else {
      console.log(`Username: ${username}; Password: ${password}`);
      // Should redirect to account page
      setIsValid(true);
    }
  };

  const authentication = () => {
    for (let i = 0; i < data.length; i++) {
      if (data[i].account === username) {
        if (data[i].password === password) {
          console.log(password);
          console.log(data[i].password);
          return true;
        }
        return false;
      }
    }
    return false;
  };

  useEffect(() => {
    async function fetchData() {
      // mockaroo api
      const result = await axios(
        "https://my.api.mockaroo.com/login?key=52caca70"
      );
      setData(result.data);
    }
    fetchData();
  }, []);

  if (isValid) {
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
