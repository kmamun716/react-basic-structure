import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const Login = () => {
    const [user, setUser] = useState({
        email:"",
        password:""
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
        </div>
    );
};

export default Login;