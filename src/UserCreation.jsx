import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function UserCreation() {
  // set the initial state of the username and password
  // to empty strings
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const apiUrl = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  // create a function that will handle the submission of the form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    let dataToSend = {
      username,
      password,
    };

    try {
      // send a POST request to the backend with the dataToSend
      const response = await fetch(`${apiUrl}/create/user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });

      const result = await response?.json();

      console.log("res", result);
      if (result.msg) {
        return setErrorMessage(result?.msg);
      } else if (result?.success === true) {
        return navigate("/home");
      }
    } catch (error) {
      console.log(error);
      setErrorMessage("Something went wrong with User Creation");
    }
  };

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
        <p>{errorMessage}</p>
      </form>
    </>
  );
}
