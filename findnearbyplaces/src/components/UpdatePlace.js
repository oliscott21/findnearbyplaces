import { Row, Col, Container, Form, Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from "react-router-dom";

import apiAccess from '../communication/APIAccess';

const UpdatePlace = () => {

    const [name, setName] = useState("");
    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [cat, setCat] = useState([]);

    const navigate = useNavigate();
    let { id } = useParams();

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
        apiAccess.addPlace(name, category, latitude, longitude, description, id)
        .then(x => {
            console.log(x);
            navigate("/");
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
                    <Form.Control type="search" placeholder="Enter Search" value={name} onChange={onNameChanged} required/>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Category</Form.Label>
                    <Form.Control as="select" value={category} onChange={onCategoryChanged} required>
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
                    <Form.Control type="number" value={latitude} onChange={onLatitudeChanged} required/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Longitude</Form.Label>
                    <Form.Control type="number" value={longitude} onChange={onLongitudeChanged} required/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Description</Form.Label>
                    <Form.Control as="textarea" maxLength={256} rows={4} value={description} onChange={onDescriptionChanged} required/>
                </Form.Group>

                <Button variant="primary" onClick={addCatagoryHandler}>
                    Add Category
                </Button>

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </Container>
    );
}
//Caffe Luce
//32
//110
//House-roasted coffee & espresso drinks, along with pastries, served in modern, compact quarters.
export default UpdatePlace;
