import { Button, Container, Row, Col } from "react-bootstrap";
import { useParams, Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from "axios";
import "../css/courseInfo.css";

const UserReview = props => {
    console.log(props.details);
    return (
        <div>
            <Row>
                <Col>
                    <p className='text-start'>{props.details.username}:</p>
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

    //TODO: get course info from back-end
    const fetchData = async() => {
        let response = await axios(
            "https://my.api.mockaroo.com/course_info.json?key=eccb0b30"
        );

        //TODO: redirect to schoolId page if course doesn't exist

        const data = response.data;

        response = await axios(`/comments/${courseId}`);
        data.userReviews = response.data;

        return data;
    }

    const getCourseInfo = async() => {
        let data = await fetchData();
        console.log(data);
        setCourseInfo(data);
    }

    useEffect(() => { getCourseInfo(); }, []);
    console.log(courseInfo);
    if (courseInfo === undefined) {
        return null;
    }
    else {
        return (
            <div>
                <Container fluid className='course-container justify-content-center'>
                    <Row className='text-center'>
                        <Col>
                            <Link to={"/" + schoolId}><i>Return to Majors</i></Link>
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
                            <p>Brief description: {courseInfo.description}</p>
                        </Col>
                    </Row>
    
                    {courseInfo.userReviews?.map(review => (
                        <UserReview key={review.id} details={review} />
                    ))}
                    
                </Container>
            </div>
        );
    }
};

export default CourseInfo;