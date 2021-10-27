import { useState } from "react";
import { Button, Container, Row, Col } from "react-bootstrap";
import "../css/contact.css";

const Contact = (props) => {

    

    return (
        <div>
        
        

        <Container fluid className = "form justify-content-top">
            <Row>
            <Col>
                <h4 className='text'>Feel free to tell us what you think!</h4>
            </Col>
            </Row>
            


            <Row>
            <Col>
                <input
                type='text'
                className='input'>

                </input>
            </Col>
            </Row>
            
            <Row>
            <Col>

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
