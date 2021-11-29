import { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { Redirect } from "react-router";
const axios = require("axios");

const CourseModal = (props) => {
  const [data, setData] = useState({});
  const [moreDetail, setMoreDetail] = useState(false);

  useEffect(() => {
    axios
      .get(`/courseinfo/${props.courseId}`)
      .then((res) => {
        console.log(res.data);
        setData(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.show]);

  if (moreDetail === true) {
    return (
      <Redirect
        to={`/school/${data.subjectCode.school}/${data.subjectCode.code}/${data.deptCourseId}`}
      ></Redirect>
    );
  } else {
    return (
      <>
        <Modal show={props.show} onHide={props.handleClose} centered>
          <Modal.Header closeButton>
            <Modal.Title>{data.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h6>Description:</h6>
            <p>{data.description}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant='link' onClick={() => setMoreDetail(true)}>
              More detail
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
};

export default CourseModal;
