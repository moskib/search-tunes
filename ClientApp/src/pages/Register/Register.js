import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  FormGroup,
  Row
} from 'reactstrap';
import auth from '../../core/services/authService';
import { toast } from 'react-toastify';

const Register = props => {
  const history = useHistory();
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    const user = {
      email: emailInput,
      password: passwordInput
    };

    let response = await auth.register(user);

    if (response && response.status === 201) {
      auth.login(user.email, user.password).then(() => (window.location = '/'));
    } else {
      toast.error('One or more of the fields are incorrect');
    }
  };

  return (
    <Container>
      <Card>
        <CardBody>
          <Row>
            <Col className='col-lg-7 mx-auto'>
              <div className='p-5'>
                <div className='text-center'>
                  <h4 className='text-gray-900'>Join the search</h4>
                </div>
                <form className='user' onSubmit={handleSubmit}>
                  <FormGroup>
                    <input
                      type='email'
                      className='form-control form-control-user'
                      placeholder='Email Address'
                      value={emailInput}
                      onChange={e => setEmailInput(e.target.value)}
                    />
                  </FormGroup>
                  <div className='form-group row'>
                    <div className='col-sm-12 mb-3 mb-sm-0'>
                      <input
                        type='password'
                        className='form-control form-control-user'
                        placeholder='Password'
                        value={passwordInput}
                        onChange={e => setPasswordInput(e.target.value)}
                      />
                    </div>
                  </div>
                  <Button color='primary' className='btn-user btn-block'>
                    Register Account
                  </Button>
                </form>
              </div>
            </Col>
          </Row>
        </CardBody>
      </Card>
    </Container>
  );
};

export default Register;
