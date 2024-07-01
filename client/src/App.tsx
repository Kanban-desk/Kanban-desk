import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [text, setText] = useState("");
  useEffect(() => {
    fetch("/api/")
      .then((response) => response.text())
      .then((data) => setText(data));
  });
  return (
    <>
      <div>{text}</div>
    </>
  );
}

export default App;
