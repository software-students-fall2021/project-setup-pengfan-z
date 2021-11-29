import { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
// import React, { Component } from "react";
import "../css/user.css";
import axios from "axios";
import { useEffect } from "react";
import { useHistory } from "react-router";
import CourseModal from "../components/CourseModal";

// class User extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       courses: [
//         {
//           id: 1,
//           school: "CAS",
//           courseName: "484: Agile Software Engineering",
//           link: "/cas",
//         },
//         {
//           id: 2,
//           school: "CAS",
//           courseName: "467: Applied Internet Technology",
//           link: "/cas",
//         },
//       ],
//     };
//   }
//   renderTableData() {
//     return this.state.courses.map((course, index) => {
//       const { id, school, courseName, link } = course;
//       return (
//         <tr key={id}>
//           <td>{id}</td>
//           <td>
//             <Link to={link}>{school}</Link>
//           </td>
//           <td>{courseName}</td>
//         </tr>
//       );
//     });
//   }
//   renderTableHeader() {
//     let header = Object.keys(this.state.courses[0]).filter((i) => i !== "link");
//     return header.map((key, index) => {
//       return <th key={index}>{key.toUpperCase()}</th>;
//     });
//   }
//   render() {
//     return (
//       <div>
//         <Container fluid className="form justify-content-center">
//           <h2 id="title"> Your Courses: </h2>
//           <table id="courses">
//             <tbody>
//               <tr> {this.renderTableHeader()}</tr>
//               {this.renderTableData()}
//             </tbody>
//           </table>
//           <h2 id="title"> Your Ratings: </h2>
//           <table>
//             <tr>
//               <th>
//                 <h5>Course</h5>
//               </th>
//             </tr>
//             <tr>
//               <td>CAS Computer Science 484: Agile Software Engineering</td>
//             </tr>
//             <tr>
//               <th>
//                 <h5>Rating</h5>
//               </th>
//             </tr>
//             <tr>
//               <td>
//                 5/5 Professor Bloomberg is one of the best teachers I have ever
//                 had!
//               </td>
//             </tr>
//           </table>
//         </Container>
//       </div>
//     );
//   }
// }

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
          <Row className='user'>Hello! {props.user.username}</Row>
          <Row className='cartHeading'>Your Cart:</Row>
          {courses.map((courseObj) => (
            <Row key={courseObj}>
              <Col
                xs='12'
                className='d-flex justify-content-center align-items-center py-2 box'
              >
                <Button
                  variant='link'
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
          <Row className='commentHeading'>Comments:</Row>
          {comments.map((commentObj) => (
            <Row key={commentObj._id}>
              <Col
                xs='12'
                className='d-flex justify-content-center align-items-center py-2 box'
              >
                <Button
                  variant='link'
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
