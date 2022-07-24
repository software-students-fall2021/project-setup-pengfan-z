import { Link } from "react-router-dom";
import "../css/home.css";

function Home() {
  return (
    <div id='collegeList'>
      <Link id='CAS' className='college' to='/school/UA'>
        {" "}
        College of Arts and Sciences{" "}
      </Link>
      <Link id='DNT' className='college' to='/school/UD'>
        {" "}
        College of Dentistry{" "}
      </Link>
      {/* <Link id='CRT' className='college' to='/courant'>
        {" "}
        Courant Institute of Mathematics
      </Link> */}
      <Link id='GLT' className='college' to='/school/UG'>
        {" "}
        Gallatin School of Individualized Study
      </Link>
      <Link id='STN' className='college' to='/school/UB'>
        {" "}
        Leonard N. Stern School of Business
      </Link>
      <Link id='WGR' className='college' to='/school/GP'>
        {" "}
        Robert F. Wagner Graduate School of Public Service
      </Link>
      <Link id='NUR' className='college' to='/school/UN'>
        {" "}
        Rory Meyers College of Nursing
      </Link>
      <Link id='GPH' className='college' to='/school/UU'>
        {" "}
        School of Global Public Health
      </Link>
      {/* <Link id='LAW' className='college' to='/law'>
        {" "}
        School of Law
      </Link> */}
      <Link id='SIL' className='college' to='/school/US'>
        {" "}
        Silver School of Social Work
      </Link>
      <Link id='STD' className='college' to='/school/UE'>
        {" "}
        Steinhardt School of Culture, Education, and Human Development
      </Link>
      <Link id='TDN' className='college' to='/school/UY'>
        {" "}
        Tandon School of Engineering
      </Link>
      <Link id='TIS' className='college' to='/school/UT'>
        {" "}
        Tisch School of the Arts
      </Link>
    </div>
  );
}

export default Home;
