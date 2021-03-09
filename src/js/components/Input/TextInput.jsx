import styled from 'styled-components';
import React from "react";
const Wrapper = styled.div`
display: block;
width: 50%;
`;

const Input = styled.input`
padding: 0.5em;
display: inline-block;
width: 30%;
margin: 0.5em;
color: ${props => props.inputColor || "palevioletred"};
background: papayawhip;
border: none;
border-radius: 3px;
`;
const TextInput = ({id, children, value, onChange = null, readOnly = false}) =>  (
    <div>
    <label htmlFor={id}>{children}</label>
    <Input
      id={id}
      type="text"
      value={value}
      onChange={onChange}
      readOnly = {readOnly}
    />
  </div>)


export  {Wrapper, TextInput};