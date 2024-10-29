import React from 'react';
import { render, screen, fireEvent  } from '@testing-library/react';
import App from './App';

test('create new expense and update the total', () =>{
  render(<App />)
  const name = screen.getByLabelText('Name');
  const cost = screen.getByLabelText('Cost');
  const save = screen.getByText('Save');

  fireEvent.change(name, { target: { value: 'tester' } });
  fireEvent.change(cost, {target: {value: '200'}});
  fireEvent.click(save);

  expect(screen.getByText('tester')).toBeInTheDocument();
  expect(screen.getByText('$200')).toBeInTheDocument();

  expect(screen.getByText(/Spent so far/i)).toHaveTextContent('200');
  expect(screen.getByText(/Remaining/i)).toHaveTextContent('800');

}
);

test('delete expense and check total spent and remaining', () =>{
  render(<App />)
  const name = screen.getByLabelText('Name');
  const cost = screen.getByLabelText('Cost');
  const save = screen.getByText('Save');

  fireEvent.change(name, { target: { value: 'tester' } });
  fireEvent.change(cost, { target: { value: '400' } });
  fireEvent.click(save);

  const del = screen.getByText('x');
  fireEvent.click(del)
  expect(screen.queryByText('tester')).not.toBeInTheDocument();
  expect(screen.getByText(/Spent so far/i)).toHaveTextContent('0');
  expect(screen.getByText(/Remaining/i)).toHaveTextContent('1000');

});

test('budget balance verification', ()=> {
  render(<App />)
  const name = screen.getByLabelText('Name');
  const cost = screen.getByLabelText('Cost');
  const save = screen.getByText('Save');

  fireEvent.change(name, {target: {value: 'tester1'}});
  fireEvent.change(cost, {target: {value: '300'}});
  fireEvent.click(save);

  expect(screen.getByText(/Remaining/i)).toHaveTextContent('700');

  fireEvent.change(name, {target: {value: 'tester2'}});
  fireEvent.change(cost, {target: {value: '400'}});
  fireEvent.click(save);
  expect(screen.getByText(/Remaining/i)).toHaveTextContent('300');

  fireEvent.change(name, {target: {value: 'tester3'}});
  fireEvent.change(cost, {target: {value: '200'}});
  fireEvent.click(save);
  expect(screen.getByText(/Remaining/i)).toHaveTextContent('100');

  expect(screen.getByText(/Spent So Far/i)).toHaveTextContent('900');
});