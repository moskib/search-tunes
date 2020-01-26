import React from 'react';
import { InputGroup, Input, Button, InputGroupAddon } from 'reactstrap';

const SearchField = props => {
  return (
    <form className='user'>
      <InputGroup>
        <Input
          placeholder='Search...'
          className='form-control-user'
          value={props.value}
          onChange={props.handleChange}
        />
        <InputGroupAddon addonType='append'>
          <Button color='primary' className='btn-user' onClick={props.click}>
            Search
          </Button>
        </InputGroupAddon>
      </InputGroup>
    </form>
  );
};

export default SearchField;
