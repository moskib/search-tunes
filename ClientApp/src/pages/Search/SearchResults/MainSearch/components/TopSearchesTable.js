import React from 'react';
import { Table } from 'reactstrap';

const TopSearchesComponent = props => {
  return (
    <Table>
      <thead>
        <tr>
          <th>Search Term</th>
          <th>Amount</th>
        </tr>
      </thead>
      <tbody>
        {props.topSearches.map(search => (
          <tr key={search.id}>
            <td>{search.term}</td>
            <td>{search.amountOfSearchTimes}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default TopSearchesComponent;
