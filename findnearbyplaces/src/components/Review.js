import { Row, Col, Container, Form, Button, Card } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from "react-router-dom";

import apiAccess from '../communication/APIAccess';

const Review = () => {

    const [reviews, setReviews] = useState();

    const navigate = useNavigate();
    let { place_id, user_id } = useParams();

    let getCategories = () => {
      apiAccess.getReview(place_id)
      .then(x => {
          setReviews(x.id);
      });
    };

    let updateReview = (review_id) => {
        navigate(`/updateReview/${review_id}/${user_id}`);
    }

    let deleteReview = (review_id) => {
        apiAccess.deleteReview(review_id, user_id)
        .then(x => {
            navigate(`/${user_id}`);
        });
    }

    useEffect(
        getCategories,
        []
    );

    return (
        <Container>

        {
            reviews ?
            <>
            {
                reviews.map((option, index) => {
                  {console.log(option)}
                    return (<Card key={option.id}>
                      <Card.Body>
                          <Card.Title>
                            {option.text}
                          </Card.Title>
                          <Card.Text>

                            {option.rating}/10
                          </Card.Text>
                          { option.customer_id == user_id && (
                            <>
                            <Button onClick={() => updateReview(option.id)}>Edit Review</Button>
                            <Button onClick={() => deleteReview(option.id)}>Delete Review</Button>
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


export default Review;
