import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import Home from 'pages/Home';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { allCountriesStub } from 'tests/data/allCountriesStub';
import { americasStub } from './data/americasStub';

describe('Country Page', () => {
  const server = setupServer(
    rest.get('https://restcountries.com/v2/all', (req, res, ctx) => {
      return res(ctx.json(allCountriesStub));
    }),
    rest.get('https://restcountries.com/v2/region/americas', (req, res, ctx) => {
      return res(ctx.json(americasStub));
    })
  );

  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  beforeEach(() => {
    render(
      <MemoryRouter>
        <Routes>
          <Route path='/' element={<Home />} />
        </Routes>
      </MemoryRouter>
    );
  });

  it('render the cards', async () => {
    await waitFor(() => {
      const countries = screen.getAllByTestId('country-card');

      expect(countries.length).toEqual(250);
    });
  });

  it('render americas countries when selected', async () => {
    userEvent.click(screen.getAllByText('Filter by Region')[0]);
    userEvent.click(screen.getByText('America'));

    await waitFor(() => {
      const countries = screen.getAllByTestId('country-card');

      expect(countries.length).toEqual(57);
    });
  });

  it('render only Canada when searched', async () => {
    userEvent.type(screen.getByPlaceholderText('Search for a country...'), 'cana');

    await waitFor(() => {
      const countries = screen.getAllByTestId('country-card');
      const canada = screen.getByText('Canada');

      expect(countries.length).toEqual(1);
      expect(canada).toBeTruthy();
    });
  });
});
