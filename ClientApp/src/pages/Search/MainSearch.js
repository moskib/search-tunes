import React from 'react';
import { useHistory } from 'react-router-dom';
import { Col, Row } from 'reactstrap';
import SearchField from '../../core/components/inputs/SearchField';

const MainSearch = props => {
  const history = useHistory();

  const handleOnSearchClick = () => history.push('/search-results');

  return (
    <>
      <Row>
        <Col className='mx-auto'>
          <h1 className='text-center text-gray-800 mt-5'>Search Tunes</h1>
        </Col>
      </Row>
      <Row className='mt-3'>
        <Col xs='8' md='6' className='mx-auto'>
          <SearchField click={() => handleOnSearchClick()} />
        </Col>
      </Row>
    </>
  );
};

export default MainSearch;
