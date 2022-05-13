import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const Registration = () => {
    const [user, setUser] = useState({
        name:"",
        email:"",
        password:"",
        confirmPassword:"",
        gender:"",
    });
    const changeHandler = e =>{
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    };
    const handleSubmit=e=>{
        e.preventDefault();
        console.log(user);
        const {name, email, password, confirmPassword, gender} = user;
        console.log(email)
        const auth = getAuth();
        if(password===confirmPassword){
            createUserWithEmailAndPassword(auth, email, password, name, gender)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log(user)
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage)
            });
        }
    }
    return (
        <div>
            <h2 className='text-center fw-light my-2 text-decoration-underline'>Registration From Here</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicText">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" name="name" onChange={changeHandler} placeholder="Your Name" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" name="email" onChange={changeHandler} placeholder="Enter email" />
                    <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name="password" onChange={changeHandler} placeholder="Password" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type="password" name="confirmPassword" onChange={changeHandler} placeholder="Type Password Again" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicSelect">
                    <Form.Label>Gender:</Form.Label>
                    <Form.Select aria-label="Default select example" onChange={changeHandler} name="gender" size="sm">
                        <option>Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="others">Others</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Confirm Submition" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Register
                </Button>
            </Form>            
            <p>Allredady Have an Account? <Link to='/login'>Login Here</Link></p>
        </div>
    );
};

export default Registration;