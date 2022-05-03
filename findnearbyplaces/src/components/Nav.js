import { Navbar, Nav } from "react-bootstrap";
import apiAccess from '../communication/APIAccess';

const NavMenu = (props) => {

  let logout = () => {
    apiAccess.logout()
    .then(x => {
      props.customerLoggedOut()
    })
    .catch(e => console.log(e));
  }

  return (
    <Navbar bg="light" className="na">
        <Navbar.Brand href="#">React</Navbar.Brand>
        <Nav className="ms-auto">
            {
                props.user ?
                <>
                    <Navbar.Text>
                        Signed in as {props.user}
                    </Navbar.Text>
                    <Nav.Link href="#/" onClick={logout}>
                        Logout
                    </Nav.Link>
                </>
                :
                <>
                    <Nav.Link href="#/register">
                        Register
                    </Nav.Link>
                    <Nav.Link href={"#/login"}>
                        Login
                    </Nav.Link>
                </>
            }
      </Nav>
    </Navbar>
  );
}

export default NavMenu;
