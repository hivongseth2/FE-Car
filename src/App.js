import React from "react";
import "./App.css";
import HomePage from "./views/HomePage";
import MainLayout from "./views/MainLayout";
import BangDetail from "./views/BangDetail";
function App() {
  return (
    <div className="App">
      <MainLayout>
        <HomePage></HomePage>
        <BangDetail></BangDetail>
      </MainLayout>
    </div>
  );
}
export default App;
