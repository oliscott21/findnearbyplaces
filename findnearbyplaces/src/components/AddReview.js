import { Row, Col, Container, Form, Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from "react-router-dom";

import apiAccess from '../communication/APIAccess';

const AddReview = () => {

    const [rating, setRating] = useState("");
    const [description, setDescription] = useState("");

    const navigate = useNavigate();
    let { place_id, user_id } = useParams();

    let onRatingChanged = (e) => {
        setRating(e.target.value);
    }

    let onDescriptionChanged = (e) => {
        setDescription(e.target.value);
    }


    let onSubmitHandler = (e) => {
        e.preventDefault();
        apiAccess.addReview(place_id, description, rating, user_id)
        .then(x => {
            navigate(`/${user_id}`);
        })
        .catch(e => {
            console.log(e);
            alert('Something went wrong!');
        });
    }

    return (
        <Container>
            <Form onSubmit={onSubmitHandler}>
                <Form.Group className="mb-3">
                    <Form.Label>Rating</Form.Label>
                    <Form.Control type="number" placeholder="Enter Rating" max={10} value={rating} onChange={onRatingChanged} required/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Description</Form.Label>
                    <Form.Control as="textarea" maxLength={512} rows={4} value={description} onChange={onDescriptionChanged} required/>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </Container>
    );
}

export default AddReview;
