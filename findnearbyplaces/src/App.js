import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { Row, Col, Container } from "react-bootstrap";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/Home";
import NavMenu from "./components/Nav";
import Login from "./components/Login";
import Register from "./components/Register";
import AddPlace from "./components/AddPlace";
import MyPlaces from "./components/MyPlaces";
import AddCat from "./components/AddCat";
import Place from "./components/Place";
import UpdatePlace from "./components/UpdatePlace";
import { useState } from "react";
import { useParams } from "react-router-dom";

function App() {

    const [user, setUser] = useState(localStorage.getItem("user"));
    const [id, setId] = useState(localStorage.getItem("id"));


    let customerLoggedInHandler = (customerEmail, id) => {
        localStorage.setItem("user", customerEmail);
        localStorage.setItem("id", id)
        setUser(customerEmail);
        setId(id);
    }

    let customerLoggedOutHandler = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("id");
        setUser(undefined);
        setId(undefined);
    }

    return (
        <div className="App">
            <HashRouter>
                <Container>
                    <Row>
                        <Col>
                            <NavMenu user={user} id={id} customerLoggedOut={customerLoggedOutHandler}/>
                        </Col>
                    </Row>

                    <Routes>
                        <Route path="/:id" element={<Home />} />
                        <Route path="/login/:from" element={<Login customerLoggedIn={customerLoggedInHandler} />}>
                        </Route>
                        <Route path="/login" element={<Login customerLoggedIn={customerLoggedInHandler} />}>
                        </Route>
                        <Route path="/register" element={<Register />}>
                        </Route>
                        <Route path={`/add/:id`} element={<AddPlace />}>
                        </Route>
                        <Route path="/places" element={<MyPlaces />}>
                        </Route>
                        <Route path="/addCat" element={<AddCat />}>
                        </Route>
                        <Route path="/place/:id" element={<Place />}>
                        </Route>
                        <Route path="/updatePlace/:place_id/:user_id" element={<UpdatePlace />}>
                        </Route>
                    </Routes>
                </Container>
            </HashRouter>
        </div>
    );
}


export default App;
