import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Col, Row, Container } from 'reactstrap';
import SearchField from '../../../core/components/inputs/SearchField';
import { paginate } from '../../../utils/paginate';
import searchService from '../../shared/services/searchResultsService';
import Paginator from './components/Paginator';
import ResultsTable from './components/ResultsTable';

const SearchResults = props => {
  const history = useHistory();
  const query = new URLSearchParams(props.location.search);
  const [input, setInput] = useState(query.get('input'));
  const [results, setResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 15;

  useEffect(() => {
    fetchResults(input).then(res => setResults(res.data));
    window.onpopstate = e => {
      const query = new URLSearchParams(props.history.location.search);
      setInput(query.get('input'));
      fetchResults(query.get('input')).then(res => setResults(res.data));
    };
  }, []);

  const fetchResults = async val => {
    return await searchService.getSearchResults(val);
  };

  const handleInputChange = e => setInput(e.target.value);

  const handlePageChange = page => setCurrentPage(page);

  const handleRecordClick = record => {
    if (record) {
      history.push(`/record/${record.trackId}`);
    }
  };

  const handleOnSearchClick = () => {
    console.log('here');

    if (input) {
      console.log(input);

      history.push(`/search-results?input=${input}`);
      fetchResults(input).then(res => setResults(res.data));
    }
  };

  window.addEventListener('pageshow', event => {
    let historyTraversal =
      event.persisted ||
      (typeof window.performance != 'undefined' &&
        window.performance.navigation.type === 2);
    if (historyTraversal) {
      window.location.reload();
    }
  });

  const getPagedData = () => {
    const res = paginate(results, currentPage, pageSize);

    return { totalCount: results.length, data: res };
  };

  const { length: count } = results;

  if (count === 0) return <p>The search turned out with no results :(</p>;

  const { totalCount, data } = getPagedData();

  return (
    <Container>
      <Row className='pt-4'>
        <Col xs='12' sm='10' md='5'>
          <SearchField
            value={input}
            handleChange={e => handleInputChange(e)}
            click={() => handleOnSearchClick()}
          />
        </Col>
      </Row>
      <Row className='pt-4'>
        <Col>
          <ResultsTable results={data} onRecordClick={handleRecordClick} />
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
    </Container>
  );
};

export default SearchResults;
