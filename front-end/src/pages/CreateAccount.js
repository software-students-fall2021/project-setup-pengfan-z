import { useState } from "react";
import { Button, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../css/createAccount.css";

const CreateAccount = () => {
  const [newUserName, setUserName] = useState("");
  const [newPassword, setPassWord] = useState("");
  return (
    <div>
      <h4 className='title'>Create Account</h4>
      <Container fluid className='form justify-content-top'>
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
              className='input'
            ></input>
          </Col>
        </Row>
        <Row>
          <Col>
            <label className='input'>Password: </label>
          </Col>
        </Row>
        <Row>
          <Col>
            <input
              type='password'
              onChange={(event) => setPassWord(event.target.value)}
              className='input'
            ></input>
          </Col>
        </Row>
        <Row>
          <Col>
            <Button className='button' variant='outline-primary'>
              <Link to='/create-account' className='navLink'>
                Create Account
              </Link>
            </Button>
          </Col>
        </Row>
        {/* </form> */}
      </Container>
    </div>
  );
};

export default CreateAccount;
