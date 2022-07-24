import {
  Container,
  Navbar,
  Offcanvas,
  Nav,
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
                <Link className='burgerLink' to='/school/UA'>
                  CAS
                </Link>

                <Link className='burgerLink' to='/school/UD'>
                  Dentistry
                </Link>
                <Link className='burgerLink' to='/school/UG'>
                  Gallatin
                </Link>
                <Link className='burgerLink' to='/school/UB'>
                  Stern
                </Link>
                <Link className='burgerLink' to='/school/GP'>
                  Wagner
                </Link>
                <Link className='burgerLink' to='/school/UN'>
                  Nursing
                </Link>
                <Link className='burgerLink' to='/school/UU'>
                  Global Public Health
                </Link>
                <Link className='burgerLink' to='/school/US'>
                  Silver
                </Link>
                <Link className='burgerLink' to='/school/UE'>
                  Steinhardt
                </Link>
                <Link className='burgerLink' to='/school/UY'>
                  Tandon
                </Link>
                <Link className='burgerLink' to='/school/UT'>
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
