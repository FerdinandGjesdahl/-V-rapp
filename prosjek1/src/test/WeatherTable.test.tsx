//AI help ChatGPT o1
import { render, screen, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import WeatherTable from '../Components/WeatherTable';
import { vi } from 'vitest';

const queryClient = new QueryClient();

const mockedData = {
  properties: {
    timeseries: [
      {
        time: '2023-10-01T12:00:00Z',
        data: {
          instant: {
            details: {
              air_temperature: 15,
              wind_speed: 3,
              wind_from_direction: 90,
            },
          },
          next_1_hours: {
            summary: {
              symbol_code: 'clearsky_day',
            },
            details: {
              precipitation_amount: 0,
            },
          },
        },
      },
      // Add more timeseries data if needed
    ],
  },
};

beforeEach(() => {
  global.fetch = vi.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve(mockedData),
    })
  ) as unknown as typeof fetch;
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe('WeatherTable', () => {
  it('should render the loading state initially', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <WeatherTable />
      </QueryClientProvider>
    );

    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
  });

  it('should display the city name Trondheim initially', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <WeatherTable />
      </QueryClientProvider>
    );

    await waitFor(() =>
      expect(screen.getByText(/Værvarsel for Trondheim/i)).toBeInTheDocument()
    );
  });
});