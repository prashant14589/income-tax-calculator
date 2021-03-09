import React from 'react';
import {fireEvent, render, screen } from '@testing-library/react';
import { TextInput } from './TextInput';
describe('Text Input', () => {
    test('calls the onChange callback handler', () => {
      const onChange = jest.fn();
   
      render(
        <TextInput id="age" value={20} onChange={onChange}>Age:</TextInput> 
      );
   
      fireEvent.change(screen.getByRole('textbox'), {
        target: { value: '60' },
      });
   
      expect(onChange).toHaveBeenCalledTimes(1);
    });
  });