import React, { useState, useEffect } from 'react';
import { Col, Row } from 'reactstrap';
import SearchField from '../../../core/components/inputs/SearchField';
import searchService from '../services/searchResultsService';
import ResultsTable from './ResultsTable';
import { paginate } from '../../../utils/paginate';
import Paginator from './Paginator';

const SearchResults = props => {
  const query = new URLSearchParams(props.location.search);
  const [input, setInput] = useState(query.get('input'));
  const [results, setResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 15;

  const fetchResults = async () => {
    return await searchService.getSearchResults(input);
  };

  useEffect(() => {
    fetchResults().then(res => setResults(res.data));
  }, []);

  const handleInputChange = e => setInput(e.target.value);

  const handlePageChange = page => setCurrentPage(page);

  const getPagedData = () => {
    const res = paginate(results, currentPage, pageSize);

    return { totalCount: results.length, data: res };
  };

  const { length: count } = results;

  if (count === 0) return <p>The search turned out with no results :(</p>;

  const { totalCount, data } = getPagedData();

  return (
    <>
      <Row className='pt-4'>
        <Col xs='12' sm='10' md='5'>
          <SearchField value={input} handleChange={e => handleInputChange(e)} />
        </Col>
      </Row>
      <Row className='pt-4'>
        <Col>
          <ResultsTable results={data} />
        </Col>
      </Row>
      <Row>
        <Col>
          <Paginator
            itemsCount={totalCount}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </Col>
      </Row>
    </>
  );
};

export default SearchResults;
