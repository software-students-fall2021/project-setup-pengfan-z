import { Link } from "react-router-dom";
import "../css/home.css";

function Home() {
  return (
    <div id = "collegeList">
      <Link id = "CAS" className = "college" to ="/cas"> College of Arts and Sciences </Link>
      <Link id = "DNT" className = "college" to ="/dentistry"> College of Dentistry </Link>
      <Link id = "CRT" className = "college" to = "/courant"> Courant Institute of Mathematics</Link>
      <Link id = "GLT" className = "college" to = "/gallatin"> Gallatin School of Individualized Study</Link>
      <Link id = "STN" className = "college" to = "/stern"> Leonard N. Stern School of Business</Link>
      <Link id = "WGR" className = "college" to = "/wagner"> Robert F. Wagner Graduate School of Public Service</Link>
      <Link id = "NUR" className = "college" to = "/nursing"> Rory Meyers College of Nursing</Link>
      <Link id = "GPH" className = "college" to = "/globalpublichealth"> School of Global Public Health</Link>
      <Link id = "LAW" className = "college" to = "/law"> School of Law</Link>
      <Link id = "SIL" className = "college" to = "/silver"> Silver School of Social Work</Link>
      <Link id = "STD" className = "college" to = "/steinhardt"> Steinhardt School of Culture, Education, and Human Development</Link>
      <Link id = "TDN" className = "college" to = "/tandon"> Tandon School of Engineering</Link>
      <Link id = "TIS" className = "college" to = "/tisch"> Tisch School of the Arts</Link>
    </div>
  );
}

export default Home;