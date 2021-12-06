import {
  Container,
  Navbar,
  Offcanvas,
  Nav,
  Button,
  Dropdown,
  DropdownButton,
} from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import "../css/header.css";

// Reusable Header Component
const Header = (props) => {
  const history = useHistory();
  // create logout function, removing token from local storage
  const logout = () => {
    localStorage.removeItem("JWT_TOKEN");
    //clear userstate from username
    props.setUser(null);
    //redirect back to login, disable user page access
    history.push("/login");
  };

  const click = () => {
    document.getElementById("my_dropdown").classList.toggle("show");
  };
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
                
                <Link className='burgerLink' to='/UD'>
                  Dentistry
                </Link>
                <Link className='burgerLink' to='/UG'>
                  Gallatin
                </Link>
                <Link className='burgerLink' to='/UB'>
                  Stern
                </Link>
                <Link className='burgerLink' to='/GP'>
                  Wagner
                </Link>
                <Link className='burgerLink' to='/UN'>
                  Nursing
                </Link>
                <Link className='burgerLink' to='/UU'>
                  Global Public Health
                </Link>
                <Link className='burgerLink' to='/US'>
                  Silver
                </Link>
                <Link className='burgerLink' to='/UE'>
                  Steinhardt
                </Link>
                <Link className='burgerLink' to='/UY'>
                  Tandon
                </Link>
                <Link className='burgerLink' to='/UT'>
                  Tisch
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
            {props.user === null ? (
              <Link to='/login' className='navLink'>
                Login
              </Link>
            ) : (
              <>
                <DropdownButton
                  id='dropdown-basic-button'
                  title={props.user.username}
                >
                  <Dropdown.Item>
                    <Link className='accountLink' to='/user'>
                      My Account
                    </Link>
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={logout}>Logout</Dropdown.Item>
                </DropdownButton>
              </>
            )}
          </Navbar.Brand>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
