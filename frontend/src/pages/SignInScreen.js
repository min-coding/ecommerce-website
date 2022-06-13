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

export default function SignInScreen() {
  const navigate = useNavigate();
  const { search } = useLocation();
  // To access Query string in URL
  const redirectInUrl = new URLSearchParams(search).get('redirect');
  // If there's
  const redirect = redirectInUrl ? redirectInUrl : '/';

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const { state, dispatch: ctxDispatch } = React.useContext(Store);
  const { userInfo } = state;

  async function submitHandler(e) {
    e.preventDefault();
    try {
      const { data } = await Axios.post('/api/users/signin', {
        email,
        password,
      });
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
          <title>Sign in</title>
        </Helmet>
        <h1 className="my-3">Sign In</h1>

        <Form onSubmit={submitHandler}>
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
