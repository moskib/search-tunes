import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Col, Row } from 'reactstrap';
import SearchField from '../../core/components/inputs/SearchField';
import auth from '../../core/services/authService';
import searResultsService from '../shared/services/searchResultsService';

const MainSearch = props => {
  const [input, setInput] = useState('');
  const history = useHistory();

  const handleOnSearchClick = async () => {
    const currentUser = auth.getCurrentUser();
    console.log(currentUser);
    if (currentUser) {
      await searResultsService.submitSearchForUser(input);
    }
    if (input) history.push(`/search-results?input=${input}`);
  };

  const handleInputChange = e => setInput(e.target.value);

  return (
    <>
      <Row>
        <Col className='mx-auto'>
          <h1 className='text-center text-gray-800 mt-5'>Search Tunes</h1>
        </Col>
      </Row>
      <Row className='mt-3'>
        <Col xs='8' md='6' className='mx-auto'>
          <SearchField
            click={() => handleOnSearchClick()}
            value={input}
            handleChange={val => handleInputChange(val)}
          />
        </Col>
      </Row>
    </>
  );
};

export default MainSearch;
