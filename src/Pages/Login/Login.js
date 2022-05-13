import React, { useContext, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Link, useLocation, useNavigate  } from 'react-router-dom';
import { userContext } from '../../App';
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth, signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";
import firebaseConfig from '../../Components/FirebaseAuth/firebase.config';

initializeApp(firebaseConfig);
const Login = () => {
    const [loggedInUser, setLoggedInUser] = useContext(userContext);
    const [user, setUser] = useState({
        email:'',
        password: ""
    })
    const navigate = useNavigate ();
    const location = useLocation(); 
    const { from } = location.state || { from: { pathname: "/" } };
    const changeHandler = e =>{
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    };
    const handleSubmit=e=>{
        e.preventDefault();
        const auth = getAuth();
        const {email, password} = user;
        signInWithEmailAndPassword(auth, email, password)
        .then(result=>{
            const {email} = result.user;
            setLoggedInUser({
                email: email,
                isLoggedIn: true
            })
            navigate(from, { replace: true })
        })
    };
    const handleGoogleSignIn = ()=>{
        const provider = new GoogleAuthProvider();
        const auth = getAuth();
        signInWithPopup(auth, provider)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            /* const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken; */
            // The signed-in user info.
            const {displayName, email} = result.user;
            const signedInUser = {
                name : displayName,
                email : email,
                isLoggedIn : true
            };
            setLoggedInUser(signedInUser);
            navigate(from, { replace: true })
            // ...
        }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            console.log(credential)
        });
    }
    return (
        <div>
            <h2 className='text-center fw-light my-2 text-decoration-underline'>Login Here</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" name="email" onChange={changeHandler} placeholder="Enter email" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name="password" onChange={changeHandler} placeholder="Password" />
                </Form.Group>
                <Button variant="success" type="submit">
                    Login
                </Button>
            </Form>
            <p>Not Have Any Account? <Link to='/register'>Register Here</Link></p>
            <Button variant='primary' onClick={handleGoogleSignIn} >Login With Google</Button>
        </div>
    );
};

export default Login;