import React, { useState, useEffect } from 'react';
import { Col, Row } from 'reactstrap';
import SearchField from '../../../core/components/inputs/SearchField';
import searchService from '../services/searchResultsService';
import ResultsTable from './ResultsTable';

const SearchResults = props => {
  const query = new URLSearchParams(props.location.search);

  const [input, setInput] = useState(query.get('input'));
  const [results, setResults] = useState(null);

  useEffect(() => {
    fetchResults().then(res => setResults(res.data));
  }, []);

  const fetchResults = async () => {
    return await searchService.getSearchResults(input);
  };

  const hanldeOnInputChange = e => setInput(e.target.value);

  return (
    <>
      <Row className='pt-4'>
        <Col xs='12' sm='10' md='5'>
          <SearchField
            value={input}
            handleChange={e => hanldeOnInputChange(e)}
          />
        </Col>
      </Row>
      <Row className='pt-4'>
        <Col>
          <ResultsTable results={results ? results : []} />
        </Col>
      </Row>
    </>
  );
};

export default SearchResults;
