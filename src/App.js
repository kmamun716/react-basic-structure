import { createContext, Fragment, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import firebase from 'firebase/compat/app';
import { getAuth, signOut } from "firebase/auth";
import Footer from "./Components/Shared/Footer/Footer";
import Header from "./Components/Shared/Header/Header";
import Home from "./Pages/Home";
import Login from "./Pages/Login/Login";
import NotMatched from "./Pages/NotMatched";
import Registration from "./Pages/Registration/Registration";
import PrivateRoute from "./Components/PrivateRout";
import Test from "./Pages/Test";

export const userContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState({
    name:"",
    email : '',
    isLoggedIn : false,
    isError: false
  });
  //sign out
  const handleLogOut = ()=>{
    const auth = getAuth();
  signOut(auth)
    .then(()=>{
        const user = {
            name : '',
            email: '',
            isLoggedIn : false
        };
        setLoggedInUser(user);
    })
    .catch(err=>{
        console.log(err.message);
    });
};

  return (
    <div className="container">
      <userContext.Provider value={[loggedInUser, setLoggedInUser]}>
        <Router>
          <Fragment>
            <Header handleLogOut={ handleLogOut } />
            <Routes>
              <Route path="/" element={<Home/>} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Registration/>} />
              <Route path="/test" element={<PrivateRoute><Test/></PrivateRoute>} />
              <Route path="*" element={<NotMatched/>} />
            </Routes>
            <Footer />  
          </Fragment>
        </Router>
      </userContext.Provider>
    </div>
  );
}

export default App;
