import { useState } from "react";
import { Button, Container, Row, Col, Alert, Form } from "react-bootstrap";
import axios from "axios";
import "../css/createAccount.css";
import { useHistory } from "react-router";

const CreateAccount = (props) => {
  let history = useHistory();
  const [newUserName, setUserName] = useState("");
  const [newPassword, setPassWord] = useState("");
  const [repeatedPassword, setRepeatedPassword] = useState("");
  const [alert, setAlert] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const handleSubmit = async () => {
    if (newPassword !== repeatedPassword) {
      setAlert(
        "Your reentered passwords does not match your original passwords."
      );
      setShowAlert(true);
    } else if (
      newUserName === "" ||
      newPassword === "" ||
      repeatedPassword === ""
    ) {
      setAlert("Every field is required.");
      setShowAlert(true);
    } else {
      setShowAlert(false);
      axios
        .post("/user/register", {
          username: newUserName,
          password: newPassword,
        })
        .then((res) => {
          console.log(res);
          const token = res.data.token;
          localStorage.setItem("JWT_TOKEN", token);
          props.setUser(res.data.user);
          history.push(`/user/${newUserName}`);
        })
        .catch((err) => {
          if (err.response.status === 403) {
            // console.log(err.response.data);
            setAlert(err.response.data.message);
          } else if (err.response.status === 400) {
            // console.log(err.response.status);
            setAlert(err.response.data.errors[0].msg);
          } else {
            setAlert(err.message);
          }
          setShowAlert(true);
        });
    }
  };

  return (
    <div>
      <h4 className='title'>Create Account</h4>
      <Alert
        variant='danger'
        onClose={() => setShowAlert(false)}
        show={showAlert}
        dismissible
      >
        <p>{alert}</p>
      </Alert>
      <Container fluid className='form'>
        <Row>
          <Col className='d-flex justify-content-center align-items-center'>
            <Form.Group>
              <Form.Label>Username:</Form.Label>
              <Form.Control
                type='text'
                onChange={(event) => setUserName(event.target.value)}
                className='input'
              ></Form.Control>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col className='d-flex justify-content-center align-items-center'>
            <Form.Group>
              <Form.Label>Password: </Form.Label>
              <Form.Control
                type='password'
                onChange={(event) => setPassWord(event.target.value)}
                className='input'
              ></Form.Control>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col className='d-flex justify-content-center align-items-center'>
            <Form.Group>
              <Form.Label className='input'>Confirm Password: </Form.Label>
              <Form.Control
                type='password'
                onChange={(event) => setRepeatedPassword(event.target.value)}
                className='input'
              ></Form.Control>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col className='d-flex justify-content-center align-items-center'>
            <Button
              className='button'
              variant='outline-primary'
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </Col>
        </Row>
        {/* </form> */}
      </Container>
    </div>
  );
};

export default CreateAccount;
