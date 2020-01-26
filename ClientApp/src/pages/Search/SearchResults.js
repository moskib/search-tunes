import React from 'react';
import { Col, Row, Table } from 'reactstrap';
import SearchField from '../../core/components/inputs/SearchField';

const SearchResults = props => {
  return (
    <>
      <Row className='pt-4'>
        <Col xs='7' sm='5' md='4'>
          <SearchField />
        </Col>
      </Row>
      <Row className='pt-4'>
        <Col>
          <Table hover>
            <thead>
              <tr>
                <th>#</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Username</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope='row'>1</th>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
              </tr>
              <tr>
                <th scope='row'>2</th>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>@fat</td>
              </tr>
              <tr>
                <th scope='row'>3</th>
                <td>Larry</td>
                <td>the Bird</td>
                <td>@twitter</td>
              </tr>
            </tbody>
          </Table>
        </Col>
      </Row>
    </>
  );
};

export default SearchResults;
