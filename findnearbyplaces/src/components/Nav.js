import { Navbar, Nav, Container } from "react-bootstrap";
import apiAccess from '../communication/APIAccess';

const NavMenu = (props) => {

  let logout = () => {
    apiAccess.logout()
    .then(x => {
      props.customerLoggedOut()
    })
    .catch(e => console.log(e));
  }


      //<Navbar.Brand href="#">React</Navbar.Brand>

  return (
    <Navbar bg="light" className="na">
        <Navbar.Brand href={`#/${props.id}`}>Yelp</Navbar.Brand>
        <Nav className="ml-auto">
            {

                props.user ?
                <>
                <Nav.Link href={`#/add/${props.id}`}>
                    Add Place
                </Nav.Link>
                <Nav.Link href={"#/places"}>
                    My Places
                </Nav.Link>
                </>
                :
                <>
                </>
            }
        </Nav>
        <Nav className="ms-auto">
            {
                props.user ?
                <>
                    <Navbar.Text>
                        Signed in as {props.user}
                    </Navbar.Text>
                    <Nav.Link href={`#/${props.id}`} onClick={logout}>
                        Logout
                    </Nav.Link>
                </>
                :
                <>
                    <Nav.Link href={"#/login"}>
                        Login
                    </Nav.Link>
                    <Nav.Link href="#/register">
                        Register
                    </Nav.Link>
                </>
            }
      </Nav>
    </Navbar>
  );
}

export default NavMenu;
