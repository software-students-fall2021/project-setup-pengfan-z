import { useState } from "react";

function Login() {
  const [username, setUserName] = useState("");
  const [password, setPassWord] = useState("");

  const handleLogin = () => {
    console.log(`Username: ${username}; Password: ${password}`);
  };

  return (
    <div>
      <h1>Login</h1>
      {/* <h2>{password}</h2> */}
      {/* <form> */}
      <label>
        Username:
        <input
          type='text'
          onChange={(event) => setUserName(event.target.value)}
        ></input>
      </label>
      <label>
        Password:
        <input
          type='password'
          onChange={(event) => setPassWord(event.target.value)}
        ></input>
      </label>
      <button onClick={handleLogin}>Login</button>
      <button>Create Account</button>
      {/* </form> */}
    </div>
  );
}

export default Login;
