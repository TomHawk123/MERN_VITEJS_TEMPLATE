import { useState } from "react";

export default function UserCreation() {
  // set the initial state of the username and password
  // to empty strings
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [handleSubmitResponseMsg, setHandleSubmitResponseMsg] = useState("");
  const apiUrl = import.meta.env.VITE_API_URL;
  // create a function that will handle the submission of the form
  const handleSubmit = (e) => {
    e.preventDefault();
    // create a variable that will hold the data to be sent to the backend
    let dataToSend = {
      username,
      password,
    };
    // send a POST request to the backend with the dataToSend
    fetch(`${apiUrl}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataToSend),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log("res", res);
        if (res.msg) {
          setHandleSubmitResponseMsg(res.msg);
        }
      });
  };
  // //  create a function that will handle the submission of the form
  //   const handleLogin = (e) => {
  //     e.preventDefault();
  //     // create a variable that will hold the data to be sent to the backend
  //     let dataToSend = { username: username, password: password };
  //     // send a POST request to the backend with the dataToSend
  //     fetch("http://localhost:8000/api/token/", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(dataToSend),
  //     })
  //       .then((response) => response.json())
  //       .then((response) => {
  //         setToken("mytoken", response.access);
  //       })
  //       .catch((error) => console.log(error));
  //   };
  // return the JSX that will be rendered
  return (
    <>
      <h1>Create a User</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Create User</button>
        <p>{handleSubmitResponseMsg}</p>
      </form>
      {/* <button onClick={handleLogin}>Login</button> */}
      {/* <p>{errorMessage}</p> */}
    </>
  );
}
