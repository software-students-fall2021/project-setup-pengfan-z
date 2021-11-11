import { Container, Row, Col, Button } from "react-bootstrap";
import { useParams, useHistory, Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/courseInfo.css";
import UserReview from "../components/UserReview";

const CourseInfo = () => {
  const { schoolId, subjectId, courseId } = useParams();
  const [courseInfo, setCourseInfo] = useState();
  const [showMore, setShowMore] = useState(false);
  const history = useHistory();

  const fetchData = async () => {
    let response = await axios(`/courses/${schoolId}/${subjectId}`);

    let data = response.data.filter(
      (course) => course.deptCourseId === courseId
    );
    if (data.length === 0) {
      history.push(`/school/${schoolId}/${subjectId}`);
      return null;
    }
    data = data[0];
    if (data.sections.length > 0) {
      data.prerequisite = data.sections[0].prerequisites;
    }

    console.log(data);

    response = await axios(`/comments/${schoolId}/${subjectId}/${courseId}`);
    data.userReviews = response.data;
    data.avgRating = 0;
    if (data.userReviews.length > 0) {
      data.avgRating = Math.round(
        data.userReviews.reduce((sum, review) => sum + review.rating, 0) /
          data.userReviews.length
      );
    }

    return data;
  };

  const getCourseInfo = async () => {
    let data = await fetchData();
    setCourseInfo(data);
  };

  const getDay = (date) => {
    let day = new Date(date);
    day = day.toString().substring(0, 4);
    return day;
  };

  const getEndTime = (time, duration) => {
    let hour = parseInt(time.substring(0, 2));
    let minute = parseInt(time.substring(3, 5));
    hour += Math.floor(duration / 60);
    minute += duration % 60;
    return `${hour.toString()}:${minute.toString()}`;
  };

  useEffect(() => {
    getCourseInfo();
  }, []);

  const formatDescriptionText = (description) => {
    if (description === undefined) return description;
    if (description.length <= 70) {
      return <p>Description: {description}</p>;
    }
    if (description.length > 70 && showMore) {
      return (
        <p>
          <a onClick={() => setShowMore(false)}>
            Description: {description} <i>Show less</i>
          </a>
        </p>
      );
    }
    if (description.length > 70) {
      return (
        <p>
          <a onClick={() => setShowMore(true)}>
            Description: {description.slice(0, 70)} <i>...show more</i>
          </a>
        </p>
      );
    }
  };

  if (courseInfo === undefined) {
    return null;
  } else {
    return (
      <div>
        <Container fluid className='course-container justify-content-center'>
          <Row className='text-center'>
            <Col>
              <Link to={`/school/${schoolId}/${subjectId}`}>
                <i>Return to Courses</i>
              </Link>
            </Col>
          </Row>
          <Row className='text-center'>
            <Col>
              <h1>{schoolId + " - " + courseInfo.name}</h1>
            </Col>
          </Row>
          <Row>
            <Col>
              <p className='text-start'>
                Average Rating: {courseInfo.avgRating}
              </p>
            </Col>
          </Row>
          <Row className='text-center comment-divider'>
            <Col>
              <p>Prerequisite: {courseInfo.prerequisite}</p>
            </Col>
          </Row>
          {courseInfo.sections.map((section) => (
            <Row className='comment-divider' key={section.registrationNumber}>
              <Col xs='12'>Name: {section.name}</Col>
              <Col xs='12'>Section: {section.code}</Col>
              <Col xs='12'>
                Instructor:{" "}
                {section.instructors.map((instructor, index) => (
                  <span key={instructor}>
                    {instructor}
                    {index === section.instructors.length - 1 ? " " : ", "}
                  </span>
                ))}
              </Col>
              <Col xs='12'>Location: {section.location}</Col>
              <Col xs='12'>Instruction Mode: {section.instructionMode}</Col>
              <Col xs='12'>Units: {section.maxUnits}</Col>
              <Col xs='12'>
                Dates: {section.meetings[0].beginDate.substring(0, 10)} -{" "}
                {section.meetings[0].endDate.substring(0, 10)}
              </Col>
              <Col xs='12'>
                Meets: {getDay(section.meetings[0].beginDate.substring(0, 10))}{" "}
                {section.meetings.length > 1
                  ? getDay(section.meetings[1].beginDate.substring(0, 10))
                  : ""}{" "}
                {section.meetings[0].beginDate.substring(11, 16)} -{" "}
                {getEndTime(
                  section.meetings[0].beginDate.substring(11, 16),
                  section.meetings[0].minutesDuration
                )}
              </Col>
              <Col xs='12'>
                Status:{" "}
                {section.status === "WaitList"
                  ? section.waitlistTotal
                  : section.status}
              </Col>
              <Col className='text-start' xs='6'>
                <Button variant='link'>Add to Cart</Button>
              </Col>
              <Col className='text-end' xs='6'>
                <Button variant='link'>Comment</Button>
              </Col>
            </Row>
          ))}
          <Row className='text-center divider pt-3'>
            <Col>{formatDescriptionText(courseInfo.description)}</Col>
          </Row>

          {courseInfo.userReviews?.map((review) => (
            <UserReview key={review.id["$oid"]} details={review} />
          ))}
        </Container>
      </div>
    );
  }
};

export default CourseInfo;
