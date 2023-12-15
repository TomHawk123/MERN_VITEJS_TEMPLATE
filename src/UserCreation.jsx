import { signal } from "@preact/signals-react";

export default function UserCreation() {
  const username = signal("");
  const password = signal("");
  const errorMessage = signal("");
  const apiUrl = import.meta.env.VITE_API_URL;

  // function that will handle the submission of the UserCreation form
  const handleSubmit = (e) => {
    e.preventDefault();

    // variable that will hold the data to be sent to the backend
    let dataToSend = {
      username: username.value,
      password: password.value,
    };

    // send a POST request to the backend with the dataToSend
    fetch(`${apiUrl}/create/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataToSend),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.msg) {
          errorMessage.value = res.msg;
        }
      });
  };

  return (
    <>
      <h1>Create a User</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="username"
          value={username}
          onChange={(e) => (username.value = e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => (password.value = e.target.value)}
        />
        <button type="submit">Create User</button>
        <p>{errorMessage}</p>
      </form>
    </>
  );
}
