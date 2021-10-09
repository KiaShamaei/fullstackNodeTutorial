import React, { useState , useContext } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";


export const Login= ()=> {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  let history = useHistory();
  const {setAuth} = useContext(AuthContext)
  const login = () => {
	
    const data = { username: username, password: password };
    axios.post("http://localhost:3003/auth/login", data).then((response) => {

      if (response.data.error) {

        alert(response.data.error);
      } else {
        sessionStorage.setItem("accessToken", response.data.token);
		setAuth({status : true , username : response.data.username , id:response.data.id})
        history.push("/");
      }
    });
  };
  return (
    <div className="loginContainer">
      <label>Username:</label>
      <input
        type="text"
        onChange={(event) => {
          setUsername(event.target.value);
        }}
      />
      <label>Password:</label>
      <input
        type="password"
        onChange={(event) => {
          setPassword(event.target.value);
        }}
      />

      <button onClick={login}> Login </button>
    </div>
  );
}

