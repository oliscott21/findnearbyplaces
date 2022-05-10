import { Row, Col, Container, Form, Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import apiAccess from '../communication/APIAccess';

const AddPlace = () => {

    const [name, setName] = useState("");

    const navigate = useNavigate();

    let onNameChanged = (e) => {
        setName(e.target.value);
    }

    let onCancelHandler = (e) => {
        navigate('/add');
    }

    let onSubmitHandler = (e) => {
        e.preventDefault();
        apiAccess.addCat(name)
        .then(x => navigate("/add"))
        .catch(e =>
            {
                console.log(e);
                alert('Registeration failed.');
            }
        );
    }

    return (
        <Container>
            <Form onSubmit={onSubmitHandler}>
                <Form.Group className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="search" placeholder="Enter Category" value={name} onChange={onNameChanged} required/>
                </Form.Group>

                <Button variant="primary" onClick={onCancelHandler}>
                    Cancel
                </Button>

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </Container>
    );
}

export default AddPlace;
