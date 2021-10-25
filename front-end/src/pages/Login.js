import { useState } from "react";
import { Button, Container, Row, Col } from "react-bootstrap";
import "../css/login.css";

function Login() {
  const [username, setUserName] = useState("");
  const [password, setPassWord] = useState("");

  const handleLogin = () => {
    console.log(`Username: ${username}; Password: ${password}`);
  };

  return (
    <div>
      <h1>Login</h1>
      {/* <h2>{password}</h2> */}
      {/* <form> */}
      <Container fluid className='form justify-content-center'>
        <Row>
          <Col>
            <label>Username:</label>
          </Col>
        </Row>
        <Row>
          <Col>
            <input
              type='text'
              onChange={(event) => setUserName(event.target.value)}
            ></input>
          </Col>
        </Row>
        <Row>
          <Col>
            <label>Password: </label>
          </Col>
        </Row>
        <Row>
          <Col>
            <input
              type='password'
              onChange={(event) => setPassWord(event.target.value)}
            ></input>
          </Col>
        </Row>
        <Row>
          <Col>
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
          <Col>
            <Button className='button' variant='outline-primary'>
              Create Account
            </Button>
          </Col>
        </Row>
        {/* </form> */}
      </Container>
    </div>
  );
}

export default Login;
