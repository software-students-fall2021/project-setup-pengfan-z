import { useState } from "react";
import { Table, Button, Container, Row, Col } from "react-bootstrap";
import React, { Component } from "react";
import "../css/user.css";
import axios from "axios";
import { useEffect } from "react";
import { useHistory } from "react-router";

// import { render } from "@testing-library/react";
// import { Link } from "react-router-dom";
/* React JS table code taken from: https://dev.to/abdulbasit313/an-easy-way-to-create-a-customize-dynamic-table-in-react-js-3igg */

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
  const [haveCourses, setHaveCourses] = useState(false);
  const [haveComments, setHaveComments] = useState(false);
  const [isValidated, setIsValidated] = useState(false);

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
          if (haveCourses.length) {
            setHaveCourses(true);
          }

          setComments(res.data[0].comments);
          if (haveComments.length) {
            setHaveComments(true);
          }

          setIsValidated(true);
        })
        .catch((err) => {
          console.error(err.message);
          history.push("/login");
        });
    }
  }, []);

  if (isValidated && (!haveCourses) && (!haveComments)) {
    return (
      <Container fluid>
        <Row className='user'>Hello! {props.user.username}</Row>

        <Row className='cartHeading'>Your Cart: You don't have any courses in your cart right now. </Row>
        
        <Row className='commentHeading'>Comments: You haven't commented on any class yet. </Row>
        
      </Container>
    );
  }

    else if (isValidated && (haveCourses) && (!haveComments)) {
      return (
        <Container fluid>
          <Row className='user'>Hello! {props.user.username}</Row>
          <Row className='cartHeading'>Your Cart:</Row>
          {courses.map((courseObj) => (
            <Row key={courseObj}>
              <Col
                xs='12'
                className='d-flex justify-content-center align-items-center py-2 box'
              >
                {courseObj}
              </Col>
            </Row>
          ))}
          <Row className='commentHeading'>Comments: You haven't commented on any class yet. </Row>

        </Container>
      );
    }

    else if (isValidated && (!haveCourses) && (haveComments)) {
      return (
        <Container fluid>
          <Row className='user'>Hello! {props.user.username}</Row>

          <Row className='cartHeading'>Your Cart: You don't have any courses in your cart right now. </Row>

          <Row className='commentHeading'>Comments:</Row>
          {comments.map((commentObj) => (
            <Row key={commentObj._id}>
              <Col
                xs='12'
                className='d-flex justify-content-center align-items-center py-2 box'
              >
                {commentObj.courseId}: {commentObj.comment}
              </Col>
            </Row>
          ))}
        </Container>
      );
    }

    else if (isValidated && (haveCourses) && (haveComments)) {
    return (
      <Container fluid>
        <Row className='user'>Hello123! {props.user.username}</Row>
        <Row className='cartHeading'>Your Cart123:</Row>
        {courses.map((courseObj) => (
          <Row key={courseObj}>
            <Col
              xs='12'
              className='d-flex justify-content-center align-items-center py-2 box'
            >
              {courseObj}
            </Col>
          </Row>
        ))}
        <Row className='commentHeading'>Comments123:</Row>
        {comments.map((commentObj) => (
          <Row key={commentObj._id}>
            <Col
              xs='12'
              className='d-flex justify-content-center align-items-center py-2 box'
            >
              {commentObj.courseId}: {commentObj.comment}
            </Col>
          </Row>
        ))}
      </Container>
    );

    
  } else {
    return <div></div>;
  }
};

export default User;
