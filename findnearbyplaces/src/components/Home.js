import { Row, Col, Container, Form, Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import apiAccess from '../communication/APIAccess';

const Home = () => {

    const [search, setSearch] = useState("");
    const [results, setResults] = useState("");
    const [radius, setRadius] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("");
    const [sort, setSort] = useState("");
    const [cat, setCat] = useState([]);

    const navigate = useNavigate();

    let onSearchChanged = (e) => {
        setSearch(e.target.value);
    }

    let onResultsChanged = (e) => {
        setResults(e.target.value);
    }

    let onRadiusChanged = (e) => {
        setRadius(e.target.value);
    }

    let onCategoryFilterChanged = (e) => {
        setCategoryFilter(e.target.value);
        console.log(categoryFilter);
    }

    let onSortChanged = (e) => {
        setSort(e.target.value);
    }

    let onSubmitHandler = (e) => {
        e.preventDefault();
        window.navigator.geolocation.getCurrentPosition(getPos, console.log)
    }

    function getPos(pos) {
        let temp = "";
        temp += pos.coords.latitude + "," + pos.coords.longitude;
        let url = `/search?search_term=${search}&user_location=${temp}&radius_filter=${radius}&maximum_results_to_return=${results}&category_filter=${categoryFilter}&sort=${sort}`
        apiAccess.search(url);
    };

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
                    <Form.Label>Search</Form.Label>
                    <Form.Control type="search" placeholder="Enter Search" value={search} onChange={onSearchChanged} required/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Number of Results</Form.Label>
                    <Form.Control type="number" value={results} onChange={onResultsChanged} required/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Max Distance</Form.Label>
                    <Form.Control type="number" value={radius} onChange={onRadiusChanged}/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Category Filter</Form.Label>
                    <Form.Control as="select" value={categoryFilter} onChange={onCategoryFilterChanged}>
                        <option key="" value=""> </option>
                        {
                            cat.map((option, index) => {
                                return (<option key={index} value={option.name}>{option.name}</option>);
                            })
                        }
                    </Form.Control>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Sort Type</Form.Label>
                    <Form.Control as="select" value={sort} onChange={onSortChanged}>
                    <option value=""></option>
                    <option value="0">Best Matches</option>
                    <option value="1">Minimum Distance</option>
                    <option value="2">Highest Rated</option>
                    </Form.Control>
                </Form.Group>

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </Container>
    );
}

export default Home;
