import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import { Link } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";
import "../css/majors.css";

const Majors = () => {
  const [majors, setMajors] = useState({});
  const [majorsId, setMajorsId] = useState([]);

  let { schoolId } = useParams();

  useEffect(() => {
    axios
      .get(`/majors/${schoolId}`)
      .then((res) => {
        setMajors(res.data);
        setMajorsId(Object.keys(res.data).sort());
        console.log(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [schoolId]);

  return (
    <div>
      <h1>{schoolId}</h1>
      <Container fluid>
        <Row>
          {majorsId.map((id) => (
            <Col
              className='d-flex justify-content-center align-items-center py-2 box'
              key={id}
              xs='6'
            >
              <Link className='major' to={`/school/${schoolId}/${id}`}>
                {majors[id].name}
              </Link>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default Majors;
