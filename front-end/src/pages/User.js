import { useState } from "react";
import { Button, Container, Row, Col } from "react-bootstrap";
import React, { Component } from "react";
import "../css/user.css";
import axios from "axios";
import { useEffect } from "react";
import { useHistory } from "react-router";

import { render } from "@testing-library/react";
import { Link } from "react-router-dom";
/* React JS table code taken from: https://dev.to/abdulbasit313/an-easy-way-to-create-a-customize-dynamic-table-in-react-js-3igg */

// TODO: get user portal info from server, display comments under courses
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
//         <Container fluid className='form justify-content-center'>
//           <h2 id='title'> Your Courses: </h2>
//           <table id='courses'>
//             <tbody>
//               <tr> {this.renderTableHeader()}</tr>
//               {this.renderTableData()}
//             </tbody>
//           </table>
//           <h2 id='title'> Your Ratings: </h2>
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

const User = () => {
  let history = useHistory();
  const [courses, setCourses] = useState();

  useEffect(() => {
    axios
      .get("/userportal/yf123456", {
        headers: {
          Authorization: localStorage.getItem("JWT_TOKEN"),
        },
      })
      .then((res) => {
        console.log(res);
        setCourses(res.data[0].comments);
      })
      .catch((err) => {
        console.error(err.message);
        history.push("/");
      });
  }, []);

  return <div>{courses}</div>;
};

export default User;
