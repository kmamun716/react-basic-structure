import { createContext, Fragment, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import firebase from 'firebase/compat/app';
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
    password:'',
    isLoggedIn : false
  });
  //sign out
  const handleLogOut = ()=>{
    firebase.auth().signOut()
    .then(result=>{
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
              <Route path="/login" element={<Login handleLogOut={handleLogOut} />} />
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
