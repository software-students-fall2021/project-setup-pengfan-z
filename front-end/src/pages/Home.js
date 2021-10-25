import { useState } from "react";
import { Link } from "react-router-dom";
import "../css/home.css";


function Home() {
  return (
    <div className = "classList">
      <Link className = "class" to ="/cas"> College of Arts and Sciences </Link>
      <Link className = "class" to ="/dentistry"> College of Dentistry </Link>
      <Link className = "class" to = "/courant"> Courant Institute of Mathematics</Link>
      <Link className = "class" to = "/gallatin"> Gallatin School of Individualized Study</Link>
      <Link className = "class" to = "/stern"> Leonard N. Stern School of Business</Link>
      <Link className = "class" to = "/wagner"> Robert F. Wagner Graduate School of Public Service</Link>
      <Link className = "class" to = "/nursing"> Rory Meyers College of Nursing</Link>
      <Link className = "class" to = "/globalpublichealth"> School of Global Public Health</Link>
      <Link className = "class" to = "/law"> School of Law</Link>
      <Link className = "class" to = "/silver"> Silver School of Social Work</Link>
      <Link className = "class" to = "/steinhardt"> Steinhardt School of Culture, Education, and Human Development</Link>
      <Link className = "class" to = "/tandon"> Tandon School of Engineering</Link>
      <Link className = "class" to = "/tisch"> Tisch School of the Arts</Link>
    </div>
  );
}

export default Home;