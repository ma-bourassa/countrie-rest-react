import { render, screen, waitFor } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import CountryDetails from 'pages/Country-details';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { bordersStub } from './data/bordersStub';
import { franceStub } from './data/franceStub';

describe('Country Page', () => {
  const server = setupServer(
    rest.get('https://restcountries.com/v2/alpha/FRA', (req, res, ctx) => {
      return res(ctx.json(franceStub));
    }),
    rest.get('https://restcountries.com/v2/alpha', (req, res, ctx) => {
      return res(ctx.json(bordersStub));
    })
  );

  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  beforeEach(() => {
    render(
      <MemoryRouter initialEntries={['/FRA']}>
        <Routes>
          <Route path='/:alpha3Code' element={<CountryDetails />} />
        </Routes>
      </MemoryRouter>
    );
  });

  it('render the title and name', async () => {
    await waitFor(() => {
      const country = screen.getAllByText('France');

      expect(country.length).toEqual(2);
    });
  });

  it('render the borders buttons', async () => {
    await waitFor(() => {
      const border = screen.getByText('Belgium');

      expect(border).toBeTruthy();
    });
  });

  it('render the back buttons', async () => {
    await waitFor(() => {
      const back = screen.getByText('Back');

      expect(back).toBeTruthy();
    });
  });
});
