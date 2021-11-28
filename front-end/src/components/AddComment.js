import { Modal, Button, Form, Alert } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";

const AddComment = (props) => {
  //   const [comment, setComment] = useState({
  //     comment: {
  //       rating: 0,
  //       comment: "",
  //     },
  //   });
  const [text, setText] = useState("");
  const [rating, setRating] = useState(0);
  const [alert, setAlert] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const handleSubmit = () => {
    if (text === "" || rating === 0) {
      setAlert("All fields are required");
      setShowAlert(true);
    } else {
      //   setComment((prevComment) => ({
      //     ...prevComment,
      //     rating: rating,
      //     comment: text,
      //   }));
      const userId = props.user.username;
      axios
        .post(`/comments/${props.courseId}/${userId}`, {
          comment: {
            rating: rating,
            comment: text,
          },
        })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.error(err);
        });
      props.handleClose();
    }
  };

  return (
    <>
      <Alert
        variant='danger'
        onClose={() => setShowAlert(false)}
        show={showAlert}
        dismissible
      >
        <p>{alert}</p>
      </Alert>
      <Modal show={props.show} onHide={props.handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Comment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Label>Comment</Form.Label>
          <Form.Control
            as='textarea'
            onChange={(event) => setText(event.target.value)}
          ></Form.Control>
          <Form.Label>Rating</Form.Label>
          <Form.Select
            value={rating}
            onChange={(e) => {
              setRating(parseInt(e.target.value));
              //   console.log(typeof parseInt(e.target.value));
            }}
          >
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
          </Form.Select>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={props.handleClose}>
            Close
          </Button>
          <Button variant='primary' onClick={handleSubmit}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddComment;
