// AppNavbar.js

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button'; // Import Button for a better logout action
import 'bootstrap/dist/css/bootstrap.min.css';

// Import the useAuth hook from your context file
import { useAuth } from '../Context/AuthContext'; // <-- IMPORTANT: Adjust the path to your AuthContext.js file

function AppNavbar() {
  // Get the user and logout function from the context
  const { user, logout } = useAuth();

  return (
    <Navbar expand="lg" className="bg-body-tertiary shadow-sm">
      <Container>
        <Navbar.Brand href="/">Hahn Crud Candidature</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {/* This Nav will be on the left */}
          <Nav className="me-auto">
            {/* Only show the Product link if the user is logged in */}
            {user && <Nav.Link href="/products">Products</Nav.Link>}
          </Nav>

          {/* This Nav will be on the right */}
          <Nav>
            {user ? (
              // If the user is logged in, show their name and a Logout button
              <>
                <Navbar.Text className="me-3">
                  Signed in as: {user.username}
                </Navbar.Text>
                {/* 
                  Use a Button with an onClick handler.
                  This calls the logout function from your AuthContext.
                */}
                <Button variant="outline-secondary" onClick={logout}>
                  Logout
                </Button>
              </>
            ) : (
              // If no user, you could show Login/Register links
              <Nav.Link href="/login">Login</Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AppNavbar;