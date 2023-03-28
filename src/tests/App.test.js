import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';


test('Teste app', async () => {
  render(<App />);

 
  const colunaInput = screen.getByText('Coluna');
  expect(colunaInput).toBeInTheDocument();
  const table = screen.getByRole('table');
  expect(table).toBeInTheDocument();
  const valueInput = screen.getByRole('spinbutton', {
    name: /value/i
  });
  
  expect(await screen.findAllByRole('row')).toHaveLength(1);
  expect(valueInput).toBeInTheDocument();
  const filterButton = screen.getByRole('button', {
    name: /filter/i
  });
  userEvent.type(valueInput, '10000')
  expect(valueInput).toHaveValue(10000);
  userEvent.click(filterButton)
  expect(await screen.findAllByRole('row')).toHaveLength(1);
  const textInput = screen.getByRole('textbox');
  expect(textInput).toBeInTheDocument();
  userEvent.type(textInput, 'Ta');
  const removeAllButton = screen.getByRole('button', {
    name: /rm all/i
  });
  userEvent.click(removeAllButton);
});
