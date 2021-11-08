import { useState } from "react";
import { Button, Container, Row, Col } from "react-bootstrap";
import "../css/contact.css";

const Contact = (props) => {

    

    return (
        <div class="row mt-2">
        

        <Container fluid className = "form justify-content-top">
            <Row>
            <Col>
                <h4 className='text'>Feel free to tell us what you think!</h4>
            </Col>
            </Row>
            


            <Row>
            <Col className='d-flex justify-content-center align-items-center'>

                <input
                type='text'
                className='input'>

                </input>

            </Col>
            </Row>
            
            <Row>
            <Col className='d-flex justify-content-center align-items-center'>

                <Button
                variant= 'primary'
                >
                Submit
                </Button>

            </Col>
            </Row>
            {/* </form> */}
        </Container>
        </div>
    )
}

export default Contact;
