import { Row, Col } from "react-bootstrap";
import "../css/courseInfo.css";

const UserReview = (props) => {
  return (
    <div className="comment-divider">
      <Row className="pt-3">
        <Col>
          <p className="text-start">{props.details.commenter}</p>
        </Col>
        <Col>
          <p className="text-end">Rating: {props.details.rating}</p>
        </Col>
      </Row>
      <Row className="text-center">
        <Col>
          <p>{props.details.comment}</p>
        </Col>
      </Row>
    </div>
  );
};

export default UserReview;
