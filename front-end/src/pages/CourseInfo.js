import { Button, Container, Row, Col } from "react-bootstrap";
import { useParams, Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import "../css/courseInfo.css";

//TODO: move to components folder
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
    const { college, courseId } = useParams();
    //TODO: get data from database/mockaroo using courseId

    const [courseInfo, setCourseInfo] = useState();

    //TODO: get data from mongodb using courseId
    const fetchData = async() => {
        // hardcoded mock data, accidently went over the rate limit for mockaroo...
        return {"id":{"$oid":"61784016fc13ae7bc200152c"},"name":"Marketing","prerequisite":"Human Resources","description":"augue vel accumsan tellus nisi eu orci mauris lacinia sapien quis libero nullam sit amet turpis","status":true,"avgRating":0,
        "userReviews":[{"id": 1, "username": "user1234", "rating": 1, "comment": "I loved taking this course with Professor Bloomberg, the skills I leared here were immediately applicable to my computer science job search!"}, {"id": 2, "username": "user4321", "rating": 5, "comment": "Hated this course, too much work"}]};
        const myHeaders = new Headers({
            "X-API-Key": "eccb0b30"
        });

        let response = await fetch("https://my.api.mockaroo.com/course_info.json", {
            method: "GET",
            headers: myHeaders,
            mode: "cors"
        });

        const data = response.json();

        response = await fetch("https://my.api.mockaroo.com/user_review.json", {
            method: "GET",
            headers: myHeaders,
            mode: "cors"
        });

        data.userReviews = response.json();

        return data;
    }

    const getCourseInfo = async() => {
        let data = await fetchData();
        console.log(data);
        setCourseInfo(data);
    }

    //TODO: redirect to college page if course doesn't exist

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
                            <Link to={"/" + college}><i>Return to Majors</i></Link>
                        </Col>
                    </Row>
                    <Row className='text-center'>
                        <Col>
                            <h1>{college + " - " + courseInfo.name}</h1>
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