import React from 'react';
import { InputGroup, Input, Button, InputGroupAddon } from 'reactstrap';

const SearchField = props => {
  const _handleKeyDown = e => {
    if (e.key === 'Enter') {
      props.click();
    }
  };

  return (
    <form className='user'>
      <InputGroup>
        <Input
          placeholder='Search...'
          className='form-control-user'
          value={props.value}
          onChange={props.handleChange}
          onKeyDown={_handleKeyDown}
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
