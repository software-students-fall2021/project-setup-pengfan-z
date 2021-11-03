import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router";
import axios from "axios";

const Majors = () => {
  const [majors, setMajors] = useState({});
  const [majorsId, setMajorsId] = useState([]);

  let { schoolId } = useParams();

  useEffect(() => {
    axios
      .get(`/majors/${schoolId}`)
      .then((res) => {
        setMajors(res.data);
        setMajorsId(Object.keys(res.data));
        console.log(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [schoolId]);

  return (
    <div>
      <h1>{schoolId}</h1>
      <ul>
        {majorsId.map((id) => (
          <li key={id}>{majors[id].name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Majors;
