import Home from '../components/Home';
import { expect, it, beforeEach, vi, beforeAll } from 'vitest';
import { render, screen } from '@testing-library/react';
import { mocks } from './mocks/index';

describe('Home screen renders expected displays', () => {
  beforeEach(() => {
    vi.mock('@clerk/clerk-react', () => ({
      useUser: vi.fn().mockImplementation(() => ({
        user: mocks.users[0],
      })),
    }));
    render(<Home />);
  });
  it('Should display add raft button', () => {
    expect(screen.getByTestId('add-family-btn')).toBeInTheDocument();
  });
});
