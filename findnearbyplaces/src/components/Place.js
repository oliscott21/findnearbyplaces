import { Row, Col, Container, Form, Button, Card } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from "react-router-dom";

import apiAccess from '../communication/APIAccess';

const Place = () => {

    const [search, setSearch] = useState("");
    const [results, setResults] = useState();

    const navigate = useNavigate();
    let { id } = useParams();

    let getCategories = () => {
        let temp = JSON.parse(localStorage.getItem("results"));
        setResults(temp);
    }

    let temp = (name) => {
        console.log(name);
    }

    let updatePlace = (place_id) => {
        navigate(`/updatePlace/${place_id}/${id}`);
    }

    let deletePlace = (place_id) => {
        apiAccess.deletePlace(place_id, id)
        .then(x => {
            navigate(`/${id}`);
        });
    }

    useEffect(
        getCategories,
        []
    );

    return (
        <Container>
          {
              results ?
              <>
              {
                  results.result.map((option, index) => {
                      return (<Card key={option.id} onClick={() => temp(option.id)}>
                        <Card.Body>
                            <Card.Title>
                              {option.name}
                            </Card.Title>
                            <Card.Text>
                              {option.description}
                            </Card.Text>
                            <Button>Write Review</Button>
                            { option.customer_id == id && (
                              <>
                              <Button onClick={() => updatePlace(option.id)}>Edit Place</Button>
                              <Button onClick={() => deletePlace(option.id)}>Delete Review</Button>
                              </>
                            )}
                         </Card.Body>
                      </Card>);
                  })
                }
              </>

              :

              <>
                No Places Found with the Given Filter
              </>
          }
        </Container>
    );
}

export default Place;
