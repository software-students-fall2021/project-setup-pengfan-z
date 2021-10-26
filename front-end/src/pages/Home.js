import { useState } from "react";
import { Link } from "react-router-dom";
import "../css/home.css";


function Home() {
  return (
    <div className = "classList">
      <Link className = "classCAS" to ="/cas"> College of Arts and Sciences </Link>
      <Link className = "classDNT" to ="/dentistry"> College of Dentistry </Link>
      <Link className = "classCRT" to = "/courant"> Courant Institute of Mathematics</Link>
      <Link className = "classGLT" to = "/gallatin"> Gallatin School of Individualized Study</Link>
      <Link className = "classSTN" to = "/stern"> Leonard N. Stern School of Business</Link>
      <Link className = "classWGR" to = "/wagner"> Robert F. Wagner Graduate School of Public Service</Link>
      <Link className = "classNUR" to = "/nursing"> Rory Meyers College of Nursing</Link>
      <Link className = "classGPH" to = "/globalpublichealth"> School of Global Public Health</Link>
      <Link className = "classLAW" to = "/law"> School of Law</Link>
      <Link className = "classSIL" to = "/silver"> Silver School of Social Work</Link>
      <Link className = "classSTD" to = "/steinhardt"> Steinhardt School of Culture, Education, and Human Development</Link>
      <Link className = "classTDN" to = "/tandon"> Tandon School of Engineering</Link>
      <Link className = "classTIS" to = "/tisch"> Tisch School of the Arts</Link>
    </div>
  );
}

export default Home;