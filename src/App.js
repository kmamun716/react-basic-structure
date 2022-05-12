import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Footer from "./Components/Shared/Footer/Footer";
import Header from "./Components/Shared/Header/Header";
import Home from "./Pages/Home";
import Login from "./Pages/Login/Login";
import NotMatched from "./Pages/NotMatched";
import Registration from "./Pages/Registration/Registration";

function App() {
  return (
    <div className="container">
      <Router>
        <Header/>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Registration/>} />
          <Route path="*" element={<NotMatched/>} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
