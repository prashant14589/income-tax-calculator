import React from 'react';
import {fireEvent, render, screen } from '@testing-library/react';
import { App } from './App';

describe('<App />', () => {
  beforeEach(() => {
    Object.defineProperty(window, "localStorage", {
      value: {
        getItem: jest.fn(() => null),
        setItem: jest.fn(() => null)
      },
      writable: true
    });
    window.localStorage.setItem("user","A");
  });
  it('should render successfully', () => {
    const { container } = render(<App />);
    expect(container).toMatchSnapshot();
  });  
  beforeEach( () => {
    render(<App />);
  });
  it('should render select options successfully', () => {
    
    expect(screen.getByText('Year:')).toBeInTheDocument();
  });
  it('should render input fields successfully', () => {
    
    expect(screen.getByText('Age:')).toBeInTheDocument();
  });
  it('should render input fields successfully', () => {
    
    expect(screen.getByText('Income:')).toBeInTheDocument();
  });
  it('should render input fields successfully', () => {
    
    expect(screen.getByText('Investment:')).toBeInTheDocument();
  });
  it('should render input fields successfully', () => {
   
    expect(screen.getByText('Final Tax calculated:')).toBeInTheDocument();
  });
  
});
describe("expect valid output for calculated tax", () => {
  render(<App />);
  const age = screen.getByRole("textbox", { name: 'Age:'});
  const income = screen.getByRole("textbox", { name: 'Income:'});
  const investment = screen.getByRole("textbox", { name: 'Investment:'});
  const tax = screen.getByRole("textbox", { name: 'Final Tax calculated:'});
  fireEvent.change(screen.getByTestId("select"),{
    target: { value: '2020' },
  });
  fireEvent.change(age, {
    target: { value: '65' },
  });
  
  fireEvent.change(income, {
    target: { value: '3800000' },
  });
  fireEvent.change(investment, {
    target: { value: '100000' },
  });
  expect(tax.value).toBe("830812.5")
})
