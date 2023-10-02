import {Button, Container, Navbar, Nav } from 'react-bootstrap';

const { REACT_APP_CLIENT_ID } = process.env;
const redirectUrl = process.env.NODE_ENV === "development"
    ? "http://localhost:3000/redirect"
    : "https://strava-app1998.web.app/redirect";

const handleLogin = () => {
    window.location.href = `http://www.strava.com/oauth/authorize?client_id=${REACT_APP_CLIENT_ID}&response_type=code&redirect_uri=${redirectUrl}/exchange_token&approval_prompt=force&scope=read_all,activity:read_all`;
};

// Main header for the website, also handles redirect to strava
function Header() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container >
        <Navbar.Brand href="/"> Strava App </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
            <Nav.Link href="/data">Workouts</Nav.Link>
          </Nav>
            <Button onClick={handleLogin} className="btn btn-primary rounded-full">Sign in with Strava</Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}


export default Header;