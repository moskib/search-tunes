import React from 'react';
import { Col, Row } from 'reactstrap';
import SearchField from '../../core/components/inputs/SearchField';

const SearchResults = props => {
  return (
    <>
      <Row className='pt-4'>
        <Col xs='7' sm='5' md='4'>
          <SearchField />
        </Col>
      </Row>
      <Row>
        <Col></Col>
      </Row>
    </>
  );
};

export default SearchResults;
