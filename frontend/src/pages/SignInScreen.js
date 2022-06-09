import React from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

export default function SignInScreen() {
  const { search } = useLocation();

  // To access Query string in URL
  const redirectInUrl = new URLSearchParams(search).get('redirect');

  // If there's
  const redirect = redirectInUrl ? redirectInUrl : '/';

  return (
    <div>
      <Container className="small-container">
        <Helmet>
          <title>Sign in</title>
        </Helmet>
        <h1 className="my-3">Sign In</h1>
        <Form>
          <Form.Group className="mb-3" controlId="email">
            <Form.Label> Email </Form.Label>
            <Form.Control type="email" required></Form.Control>
          </Form.Group>
          <Form.Group className="mb-3" controlId="password">
            <Form.Label> Password </Form.Label>
            <Form.Control type="password" required></Form.Control>
          </Form.Group>
          <div className="mb-3">
            <Button type="submit"> Sign In</Button>
          </div>
          <div className="mb-3">
            New Customer?
            <Link to={`/signup?redirect=${redirect}`}>
              {' '}
              Create your account{' '}
            </Link>
          </div>
        </Form>
      </Container>
    </div>
  );
}
