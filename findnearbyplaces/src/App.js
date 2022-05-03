import './App.css';
import { Row, Col, Container } from "react-bootstrap";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/Home";
import NavMenu from "./components/Nav";
import Login from "./components/Login";
import Register from "./components/Register";
import { useState } from "react";
import { useParams } from "react-router-dom";

function App() {

    const [user, setUser] = useState(localStorage.getItem("user"));

    let customerLoggedInHandler = (customerEmail) => {
        localStorage.setItem("user", customerEmail);
        setUser(customerEmail);
    }

    let customerLoggedOutHandler = () => {
        localStorage.removeItem("user");
        setUser(undefined);
    }

    return (
        <div className="App">
            <HashRouter>
                <Container>
                    <Row>
                        <Col>
                            <NavMenu user={user} customerLoggedOut={customerLoggedOutHandler}/>
                        </Col>
                    </Row>

                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/login/:from" element={<Login customerLoggedIn={customerLoggedInHandler} />}>
                        </Route>
                        <Route path="/login" element={<Login customerLoggedIn={customerLoggedInHandler} />}>
                        </Route>
                        <Route path="/register" element={<Register />}>
                        </Route>
                    </Routes>
                </Container>
            </HashRouter>
        </div>
    );
}

const ProtectedRoute = ({ user, children }) => {
    const { id } = useParams();
    if (user) {
        return children;
    } else {
        return <Navigate to={`/login/${id}`} />;
    }
}

export default App;
