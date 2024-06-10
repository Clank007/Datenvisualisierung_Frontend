import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../assets/css/login.css';

const Login = () => {
    const navigate = useNavigate();

  const handleLogin = () => {
    // keine Authentifizierung nötig im Prototypen, einfaches Redirect
    navigate('/admin/kennzahlen');
  };

  return (
    <Container fluid className="login-container d-flex justify-content-center align-items-center">
      <Row className="w-100">
        <Col xs={12} sm={8} md={6} lg={4} className="mx-auto">
          <div className="login-form-container p-4 rounded">
            <h2 className="text-center mb-4">Anmelden</h2>
            <Form>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>E-Mail</Form.Label>
                <Form.Control type="email" placeholder="E-Mail" />
              </Form.Group>

              <Form.Group className="mt-3" controlId="formBasicPassword">
                <Form.Label>Passwort</Form.Label>
                <Form.Control type="password" placeholder="Passwort" />
              </Form.Group>

              <Button variant="primary" className="w-100 mt-3 custom-button" onClick={handleLogin}>
                Login
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;