import { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import { Accordion, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const Courses = () => {
  let { schoolId, subjectId } = useParams();
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(`/courses/${schoolId}/${subjectId}`)
      .then((res) => {
        setData(
          res.data.sort(
            (a, b) => parseInt(a.deptCourseId) - parseInt(b.deptCourseId)
          )
        );
        console.log(
          res.data.sort(
            (a, b) => parseInt(a.deptCourseId) - parseInt(b.deptCourseId)
          )
        );
      })
      .catch((err) => {
        console.error(err);
      });
  }, [schoolId, subjectId]);

  return (
    <div>
      <Container fluid>
        <Row>
          <Col
            xs='12'
            className='d-flex justify-content-center align-items-center py-2'
          >
            {`${subjectId}-${schoolId}`}
          </Col>
        </Row>

        {data.map((course) => (
          <Row key={course.deptCourseId}>
            <Col
              xs='12'
              className='d-flex justify-content-center align-items-center py-2'
            >
              <Link
                to={`/school/${schoolId}/${subjectId}/${course.deptCourseId}`}
              >
                {`${subjectId}-${schoolId} ${course.deptCourseId} ${course.name}`}
              </Link>
            </Col>
            <Col xs='12' className='d-flex justify-content-end'>
              <Accordion flush>
                <Accordion.Item eventKey='0'>
                  <Accordion.Header>Description</Accordion.Header>
                  <Accordion.Body>{course.description}</Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </Col>
          </Row>
        ))}
      </Container>
    </div>
  );
};

export default Courses;
