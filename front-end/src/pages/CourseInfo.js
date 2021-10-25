import { Button, Container, Row, Col } from "react-bootstrap";
import { useParams } from 'react-router-dom';
//import "../css/courseInfo.css";

//TODO: move to components folder
const UserReview = ( {username, rating, comment} ) => {
    return (
        <Row>
            
        </Row>
    );
}

const CourseInfo = () => {
    const { college, courseId } = useParams();
    //TODO: get data from database/mockaroo using courseId
    const courseInfo = {};
    return (
        <div>
            <Container fluid className='justify-content-center'>
                <Row>
                    <label>{college}</label>
                </Row>
                <Row>
                    <label>{courseId}</label>
                </Row>

                {courseInfo.userReviews.map(review => (
                    <UserReview key={review.id} details={review} />
                ))}
                
            </Container>
        </div>
    );
};

export default CourseInfo;