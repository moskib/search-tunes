import React from 'react';
import {
  Table,
  Pagination,
  PaginationItem,
  PaginationLink,
  Button
} from 'reactstrap';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGuitar, faTicketAlt } from '@fortawesome/free-solid-svg-icons';

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
            <th>Released</th>
            <th>View</th>
          </tr>
        </thead>
        <tbody>
          {props.results.map(result => (
            <tr key={result.trackId}>
              <td>
                <FontAwesomeIcon
                  icon={result.kind === 'song' ? faGuitar : faTicketAlt}
                />
              </td>
              <td>{result.trackName}</td>
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
      <Pagination aria-label='Page navigation example'>
        <PaginationItem disabled>
          <PaginationLink first href='#' />
        </PaginationItem>
        <PaginationItem disabled>
          <PaginationLink previous href='#' />
        </PaginationItem>
        <PaginationItem active>
          <PaginationLink href='#'>1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href='#'>2</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href='#'>3</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href='#'>4</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href='#'>5</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink next href='#' />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink last href='#' />
        </PaginationItem>
      </Pagination>
    </>
  );
};

export default ResultsTable;
