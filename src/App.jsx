import { Routes, Route } from "react-router-dom";
import "./App.css";
import UserCreation from "./UserCreation";
import HomePageComponent from "./HomePage";

function App() {
  return (
    <>
      <h1>MERN Essentials h1</h1>
      <Routes>
        <Route exact path="/" element={<UserCreation />} />
        <Route exact path="/home" element={<HomePageComponent />} />
      </Routes>
    </>
  );
}

export default App;
