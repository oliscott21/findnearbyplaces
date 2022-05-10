import { Row, Col, Container, Form, Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from "react-router-dom";

import apiAccess from '../communication/APIAccess';

const UpdatePlace = () => {

    const [name, setName] = useState(undefined);
    const [latitude, setLatitude] = useState(undefined);
    const [longitude, setLongitude] = useState(undefined);
    const [category, setCategory] = useState(undefined);
    const [description, setDescription] = useState(undefined);
    const [cat, setCat] = useState([]);

    const navigate = useNavigate();
    let { place_id, user_id } = useParams();

    let onNameChanged = (e) => {
        setName(e.target.value);
    }

    let onLatitudeChanged = (e) => {
        setLatitude(e.target.value);
    }

    let onLongitudeChanged = (e) => {
        setLongitude(e.target.value);
    }

    let onCategoryChanged = (e) => {
        setCategory(e.target.value);
    }

    let onDescriptionChanged = (e) => {
        setDescription(e.target.value);
    }

    let addCatagoryHandler = (e) => {
        navigate("/addCat");
    }

    let onSubmitHandler = (e) => {
        e.preventDefault();
        apiAccess.updatePlace(place_id, user_id, name, category, latitude, longitude, description)
        .then(x => {
            navigate(`/${user_id}`);

        })
        .catch(e => {
            console.log(e);
            alert('Something went wrong!');
        });
    }

    let getCategories = () => {
        apiAccess.getCategories()
        .then(x => {
            setCat(x.result);
        });
    }

    useEffect(
        getCategories,
        []
    );

    return (
        <Container>
            <Form onSubmit={onSubmitHandler}>
                <Form.Group className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="search" placeholder="Enter Search" value={name} onChange={onNameChanged}/>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Category</Form.Label>
                    <Form.Control as="select" value={category} onChange={onCategoryChanged}>
                        <option key="" value=""> </option>
                        {
                            cat.map((option, index) => {
                                return (<option key={index} value={option.id}>{option.name}</option>);
                            })
                        }
                    </Form.Control>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Latitude</Form.Label>
                    <Form.Control type="number" value={latitude} onChange={onLatitudeChanged}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Longitude</Form.Label>
                    <Form.Control type="number" value={longitude} onChange={onLongitudeChanged}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Description</Form.Label>
                    <Form.Control as="textarea" maxLength={256} rows={4} value={description} onChange={onDescriptionChanged}/>
                </Form.Group>

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </Container>
    );
}

export default UpdatePlace;
