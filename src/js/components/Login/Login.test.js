import React from 'react';
import {fireEvent, render, screen } from '@testing-library/react';
import  Login  from './Login';
describe('<Login />', () => {
  const handleLoginClick = jest.fn();
    it('should render successfully', () => {
      const { container } = render(<Login handleLoginClick = {handleLoginClick}/>);
      expect(container).toMatchSnapshot();
    });  
    beforeEach( () => {
      render(<Login handleLoginClick = {handleLoginClick}/>);
    });
    it('should render username field successfully', () => {
    
        expect(screen.getByText('Username:')).toBeInTheDocument();
      });
      it('should render password field successfully', () => {
        
        expect(screen.getByText('Password:')).toBeInTheDocument();
      });
});