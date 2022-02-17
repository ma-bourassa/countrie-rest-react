import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Header from '../components/layout/Header';

describe('Header', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(() => ({
        matches: true,
      })),
    });

    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );
  });
  it('render the title', () => {
    const title = screen.getByText('Where in the world?');

    expect(title).toBeTruthy();
  });
});
