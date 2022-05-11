import { Form, Button } from 'react-bootstrap';
import { useState  } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from "react-router-dom";

import apiAccess from '../communication/APIAccess';

const Login = (props) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { user_id } = useParams();

    let onEmailChanged = (e) => {
        setEmail(e.target.value);
    }

    let onPasswordChanged = (e) => {
        setPassword(e.target.value);
    }

    let onSubmitHandler = (e) => {
        e.preventDefault();
        apiAccess.login(email, password)
        .then(x => {
            if(x.done) {
                props.customerLoggedIn(email, x.id);
                navigate(`/${user_id}`);
            } else {
                alert('The credentials are not valid!');
            }
        })
        .catch(e => {
            console.log(e);
            alert('Something went wrong!');
        });
    }

    return (
        <Form onSubmit={onSubmitHandler}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" value={email} onChange={onEmailChanged}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" value={password} onChange={onPasswordChanged}/>
            </Form.Group>
            <Button variant="primary" type="submit">
                Sign in
            </Button>
        </Form>
    );
}

export default Login;
