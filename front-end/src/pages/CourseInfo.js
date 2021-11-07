import { Container, Row, Col } from "react-bootstrap";
import { useParams, useHistory, Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from "axios";
import "../css/courseInfo.css";

const UserReview = props => {
    return (
        <div>
            <Row>
                <Col>
                    <p className='text-start'>{props.details.username}</p>
                </Col>
                <Col>
                    <p className='text-end'>Rating: {props.details.rating}</p>
                </Col>
            </Row>
            <Row className='text-center'>
                <Col>
                    <p>{props.details.comment}</p>
                </Col>
            </Row>
        </div>
    );
}

const CourseInfo = () => {
    const { schoolId, subjectId, courseId } = useParams();
    const [courseInfo, setCourseInfo] = useState();
    const [showMore, setShowMore] = useState(false);
    const history = useHistory()

    const fetchData = async() => {
        let response = await axios(
            `/courses/${schoolId}/${subjectId}`
        );

        let data = response.data.filter(course => course.deptCourseId == courseId);
        if (data.length === 0) {
            history.push(`/school/${schoolId}/${subjectId}`);
            return null;
        }
        data = data[0]
        if (data.sections.length > 0) {
            data.prerequisite = data.sections[0].prerequisite;
        }

        console.log(data);

        response = await axios(`/comments/${courseId}`);
        data.userReviews = response.data;
        data.avgRating = 0
        if (data.userReviews.length > 0) {
            data.avgRating = Math.round(data.userReviews.reduce((sum, review) => sum + review.rating, 0) / data.userReviews.length);
        }

        return data;
    }

    const getCourseInfo = async() => {
        let data = await fetchData();
        setCourseInfo(data);
    }

    useEffect(() => { getCourseInfo(); }, []);

    const formatDescriptionText = (description) => {
        if (description === undefined) return description;
        if (description.length <= 70) {
            return <p>Description: {description}</p>;
        }
        if (description.length > 70 && showMore) {
            return (
                <p>
                    <a onClick={() => setShowMore(false)}>Description: {description} <i>Show less</i></a>
                </p>
            )
        }
        if (description.length > 70) {
            return (
                <p>
                    <a onClick={() => setShowMore(true)}>Description: {description.slice(0, 70)} <i>...show more</i></a>
                </p>
            )
        }
    }

    if (courseInfo === undefined) {
        return null;
    }
    else {
        return (
            <div>
                <Container fluid className='course-container justify-content-center'>
                    <Row className='text-center'>
                        <Col>
                            <Link to={`/school/${schoolId}/${subjectId}`}><i>Return to Courses</i></Link>
                        </Col>
                    </Row>
                    <Row className='text-center'>
                        <Col>
                            <h1>{schoolId + " - " + courseInfo.name}</h1>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <p className='text-start'>Status: {courseInfo.status ? "Open" : "Closed"}</p>
                        </Col>
                        <Col>
                            <p className='text-end'>Rating: {courseInfo.avgRating}</p>
                        </Col>
                    </Row>
                    <Row className='text-center'>
                        <Col>
                            <p>Prerequisite: {courseInfo.prerequisite}</p>
                        </Col>
                    </Row>
                    <Row className='text-center'>
                        <Col>
                            {formatDescriptionText(courseInfo.description)}
                        </Col>
                    </Row>
    
                    {courseInfo.userReviews?.map(review => (
                        <UserReview key={review.id['$oid']} details={review} />
                    ))}
                    
                </Container>
            </div>
        );
    }
};

export default CourseInfo;