import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Calculator from "./pages/Calculator";
import Result from "./pages/Result";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Calculator />}></Route>
          <Route path="/result" element={<Result />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
