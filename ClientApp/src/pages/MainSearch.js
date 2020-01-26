import React from 'react';
import {
  Row,
  InputGroup,
  Input,
  InputGroupAddon,
  Button,
  Col
} from 'reactstrap';

const MainSearch = props => {
  return (
    <>
      <Row>
        <Col className='mx-auto'>
          <h1 className='text-center text-gray-800 mt-5'>Search Tunes</h1>
        </Col>
      </Row>
      <Row className='mt-3'>
        <Col xs='8' md='6' className='mx-auto'>
          <form className='user'>
            <InputGroup>
              <Input placeholder='Search...' className='form-control-user' />
              <InputGroupAddon addonType='append'>
                <Button color='primary' className='btn-user'>
                  Search
                </Button>
              </InputGroupAddon>
            </InputGroup>
          </form>
        </Col>
      </Row>
    </>
  );
};

export default MainSearch;
