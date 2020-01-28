import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Col, Row, Button, Table } from 'reactstrap';
import SearchField from '../../../../core/components/inputs/SearchField';
import auth from '../../../../core/services/authService';
import TopSearchesComponent from './components/TopSearchesTable';
import searchResultsService from '../../../shared/services/searchResultsService';

const MainSearch = () => {
  const [input, setInput] = useState('');
  const [user, setUser] = useState(null);
  const [topSearchesClicked, setTopSearchesClicked] = useState(false);
  const [topSearches, setTopSeaches] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const loggedInUser = auth.getCurrentUser();
    if (loggedInUser) {
      setUser(loggedInUser);
      getTopSearches();
    }
  }, []);

  const getTopSearches = async () => {
    const { data: topSer } = await searchResultsService.getTopSearches();
    setTopSeaches(topSer);
  };

  const handleOnSearchClick = async () => {
    if (user) {
      await searchResultsService.submitSearchForUser(input);
    }
    if (input) history.push(`/search-results?input=${input}`);
  };

  const handleTopSearchesClicked = async () => {
    setTopSearchesClicked(!topSearchesClicked);
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
      {user && topSearches && (
        <Row className='mt-3'>
          <Col className='mx-auto text-center'>
            <Button color='primary' onClick={handleTopSearchesClicked}>
              View top searches
            </Button>
          </Col>
        </Row>
      )}
      {topSearchesClicked && topSearches && (
        <Row className='mt-3'>
          <Col sm='6' className='mx-auto'>
            <TopSearchesComponent topSearches={topSearches} />
          </Col>
        </Row>
      )}
    </>
  );
};

export default MainSearch;
