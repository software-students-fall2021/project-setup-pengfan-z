import { Container, Navbar, Offcanvas, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../css/header.css";

// Reusable Header Component
const Header = (props) => {
  return (
    <div>
      <Navbar expand={false} className='background navbar-dark fixed-top'>
        <Container fluid>
          <Navbar.Toggle aria-controls='offcanvasNavbar' />
          <Navbar.Offcanvas id='offcanvasNavbar' className='burger'>
            <Offcanvas.Body>
              <Nav className='justify-content-end flex-grow-1 pe-3'>
                <Link className='burgerLink' to='/'>
                  Home
                </Link>
                <Link className='burgerLink' to='/cas'>
                  CAS
                </Link>
                <Link className='burgerLink' to='/user'>
                  My Account
                </Link>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
          <Navbar.Brand>
            <Link to='/' className='navLink'>
              Smart Choice
            </Link>
          </Navbar.Brand>
          <Navbar.Brand>
            {
              props.user === null ? <Link to="/login" className='navLink'>
              Login
            </Link> : 
            <Link to='/user'>{props.user.username}</Link>
            }
            {/* <Link to={props.LoginState.path} className='navLink'>
              {props.LoginState.name}
            </Link> */}
          </Navbar.Brand>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
