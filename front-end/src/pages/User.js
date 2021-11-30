import { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
// import React, { Component } from "react";
import "../css/user.css";
import axios from "axios";
import { useEffect } from "react";
import { useHistory } from "react-router";
import CourseModal from "../components/CourseModal";

const User = (props) => {
  let history = useHistory();
  const [courses, setCourses] = useState();
  const [comments, setComments] = useState([]);
  const [isValidated, setIsValidated] = useState(false);

  // for Course Modal (pop-out window)
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [courseId, setCourseId] = useState("");

  useEffect(() => {
    // TODO: need to change the endpoint to the username
    if (props.user === null) {
      history.push("/login");
    } else {
      axios
        .get(`/userportal/${props.user.username}`, {
          headers: {
            Authorization: localStorage.getItem("JWT_TOKEN"),
          },
        })
        .then((res) => {
          // TODO: Also need to change in the future to store array instead
          setCourses(res.data[0].courses);
          setComments(res.data[0].comments);
          setIsValidated(true);
        })
        .catch((err) => {
          console.error(err.message);
          history.push("/login");
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const seeComment = () => {
    setShow(true);
  };

  if (isValidated) {
    return (
      <>
        <CourseModal
          show={show}
          handleShow={handleShow}
          handleClose={handleClose}
          courseId={courseId}
        />
        <Container fluid>
          <Row className="user">Hello! {props.user.username}</Row>
          <Row className="cartHeading">Your Cart:</Row>
          {courses.map((courseObj) => (
            <Row key={courseObj}>
              <Col
                xs="12"
                className="d-flex justify-content-center align-items-center py-2 box"
              >
                <Button
                  variant="link"
                  onClick={() => {
                    setCourseId(courseObj);
                    seeComment();
                  }}
                >
                  {courseObj}
                </Button>
              </Col>
            </Row>
          ))}
          <Row className="commentHeading">Comments:</Row>
          {comments.map((commentObj) => (
            <Row key={commentObj._id}>
              <Col
                xs="12"
                className="d-flex justify-content-center align-items-center py-2 box"
              >
                <Button
                  variant="link"
                  onClick={() => {
                    setCourseId(commentObj.courseId);
                    seeComment();
                  }}
                >
                  {commentObj.courseId}
                </Button>
                : {commentObj.comment}
              </Col>
            </Row>
          ))}
        </Container>
      </>
    );
  } else {
    return <div></div>;
  }
};

export default User;
