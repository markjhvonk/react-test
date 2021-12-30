import React, { useRef } from 'react';
import styled from 'styled-components';
import { debounce } from 'lodash';

interface DropdownDataTypes {
  name: string;
  id: string;
}
interface SearchFieldTypes {
  dropdownData?: Array<DropdownDataTypes>,
  inputCallback?: Function,
  itemCallback?: Function
}

const StyledWrapper = styled.div`
  position: relative;
  height: 35px;
  overflow: visible;
`

const StyledField = styled.input`
  display: inline-block;
  border-radius: 4px;
  min-width: 150px;
  padding: 8px;
  margin: 8px 16px;
  border: 2px solid #fff;
  background: transparent;
  color: #fff;
  transition: all .1s ease;
`

const StyledDropdown = styled.ul`
  list-style-type: none;
  position: relative;
  bottom: 0;
  left: 20px;
  z-index: 99;
  max-width: 300px;
  margin: 0;
  padding: 0;
  border-radius: 4px;
  border: 2px solid #fff;
  background: #131318;
  color: #fff;
  transition: all .1s ease;
`

const StyledDropdownItem = styled.li`
  height: 40px;
  display: flex;
  justify-content: space-between;
  cursor: pointer;
  padding: 10px;
  border-bottom: 2px solid #fff;
  &:last-child {
    border-bottom: 0;
  }
  &:hover {
    font-weight: bold;
    &::after {
      content: '▷';
      text-decoration: none;
    }
  }
`


function SearchField({ dropdownData, inputCallback, itemCallback}: SearchFieldTypes) {
  const [inputValue, setInputValue] = React.useState("");
  const setDebounce = useRef(debounce( (value: string) => { if(inputCallback) inputCallback(value)}, 200));

  const handleInputChange = (event: any) => {
    setInputValue(event.target.value);
    if (inputCallback) setDebounce.current(event.target.value);
  }

  const itemClick = (value: any) => {
    if (itemCallback) itemCallback(value);
  }

  return (
    <StyledWrapper>
      <StyledField type="text" value={inputValue} onChange={handleInputChange} placeholder='Search for Artist' />
      {(dropdownData && dropdownData.length > 0) &&
        <StyledDropdown>
          {dropdownData?.map((item) => <StyledDropdownItem key={item.id} onClick={() => {itemClick(item)}}>{item.name}</StyledDropdownItem>)}
        </StyledDropdown>
      }
    </StyledWrapper>
  );
}

export default SearchField;