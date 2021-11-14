import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";

const Test = (props) => {
  let history = useHistory();

  useEffect(() => {
    axios
      .get("/user/secret", {
        headers: {
          Authorization: localStorage.getItem("JWT_TOKEN"),
        },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.error(err.message);
        history.push("/");
      });
  }, []);

  return (
    <div>
      <h1>secret route</h1>
    </div>
  );
};

export default Test;
