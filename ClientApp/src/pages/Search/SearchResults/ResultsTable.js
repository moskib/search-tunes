import React from 'react';
import { Table, Button } from 'reactstrap';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import searchService from '../services/searchResultsService';

const ResultsTable = props => {
  const handleOnClick = item => {
    console.log(item);
  };

  return (
    <>
      <Table hover>
        <thead>
          <tr>
            <th></th>
            <th>Title</th>
            <th>By</th>
            <th>Released</th>
            <th>View</th>
          </tr>
        </thead>
        <tbody>
          {props.results.map(result => (
            <tr key={result.trackId}>
              <td>
                <FontAwesomeIcon
                  icon={searchService.getIconByKind(result.kind)}
                />
              </td>
              <td>{result.trackName}</td>
              <td>{result.artistName}</td>
              <td>{moment(result.releaseDate).format('MMMM Do YYYY')}</td>
              <td>
                <Button color='primary' onClick={() => handleOnClick(result)}>
                  View
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default ResultsTable;
