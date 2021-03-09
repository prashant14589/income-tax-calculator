import styled from 'styled-components';
import React from "react";
const SelectFrame = styled.select`
  width: 30%;
  height: 35px;
  background: papayawhip;
  color: gray;
  padding-left: 5px;
  font-size: 14px;
  border: none;
  margin-left: 10px;

  option {
    color: palevioletred;
    background: papayawhip;
    display: flex;
    white-space: pre;
    min-height: 20px;
    padding: 0px 2px 1px;
  }
`;
const Select =({value, handleChange, options}) => (
<SelectFrame data-testid="select" value={value} onChange={handleChange}>
{options.map(({ label, value }) => (
  <option key={value} value={value}>
    {label}
  </option>
))}
</SelectFrame>);
export default Select;
