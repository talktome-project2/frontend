import React from "react";
import NavigationBar from "./Components/NavigationBar";
import RoutersManagement from "./Routes";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return <div>{RoutersManagement()}</div>;
}

export default App;
