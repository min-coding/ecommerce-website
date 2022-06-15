import React from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Axios from 'axios';
import { Helmet } from 'react-helmet-async';
import { Store } from '../Store';
import { toast } from 'react-toastify';
import { getError } from '../utils';

export default function SignUpScreen() {
  const navigate = useNavigate();
  const { search } = useLocation();
  // To access Query string in URL
  const redirectInUrl = new URLSearchParams(search).get('redirect');
  // If there's
  const redirect = redirectInUrl ? redirectInUrl : '/';

  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');

  const { state, dispatch: ctxDispatch } = React.useContext(Store);
  const { userInfo } = state;

  async function submitHandler(e) {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match')
      return;
    }

    try {
      const { data } = await Axios.post('/api/users/signup', {
        name,
        email,
        password,
      });
      // User sign up
      ctxDispatch({ type: 'USER_SIGNIN', payload: data });
      localStorage.setItem('userInfo', JSON.stringify(data));
      navigate(redirect || '/');
    } catch (error) {
      toast.error(getError(error));
    }
  }

  React.useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  return (
    <div>
      <Container className="small-container">
        <Helmet>
          <title>Sign Up</title>
        </Helmet>
        <h1 className="my-3">Sign Up</h1>

        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label> Name </Form.Label>
            <Form.Control
              type="text"
              required
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group className="mb-3" controlId="email">
            <Form.Label> Email </Form.Label>
            <Form.Control
              type="email"
              required
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group className="mb-3" controlId="password">
            <Form.Label> Password </Form.Label>
            <Form.Control
              type="password"
              required
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          {/* Confirm Password */}
          <Form.Group className="mb-3" controlId="confirmPassword">
            <Form.Label> Confirm password </Form.Label>
            <Form.Control
              type="password"
              required
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <div className="mb-3">
            <Button type="submit"> Sign Up</Button>
          </div>
          <div className="mb-3">
            Already have an account?{''}
            <Link to={`/signup?redirect=${redirect}`}>Sign-In</Link>
          </div>
        </Form>
      </Container>
    </div>
  );
}
