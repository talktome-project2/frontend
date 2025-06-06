import React from "react";
import NavigationBar from "./Components/NavigationBar";
import RoutersManagement from "./Routes";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { RecoilRoot } from "recoil";

function App() {
  return (
    <RecoilRoot>
      <RoutersManagement />
    </RecoilRoot>
  );
}

export default App;
