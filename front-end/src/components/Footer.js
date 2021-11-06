import "../css/footer.css";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className='d-flex justify-content-center align-items-center footer fixed-bottom'>
      <Link to='/contact' className='navLink'>
        <h6>Contact Us</h6>
      </Link>
    </div>
  );
};

export default Footer;
