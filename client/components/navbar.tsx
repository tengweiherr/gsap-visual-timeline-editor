import {
    Container,
    Navbar,
    Nav,
    NavDropdown,
    Button
} from "react-bootstrap";

const NavBar = () => {
  return (
    <Navbar collapseOnSelect expand="lg">
      <Container>
        <Navbar.Brand>GSAP Visual Timeline Editor</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <span className="version">Beta Version</span>
          </Nav>
          <Nav>
            <Button className="navbar-button">
              Add New
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;