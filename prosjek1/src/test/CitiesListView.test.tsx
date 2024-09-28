////AI help ChatGPT o1

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CitiesListView from '../Components/citiesListView';
import { vi, expect, describe, it, beforeEach } from 'vitest';

// Mocking image imports
vi.mock('../Images/Byer/Bergen.jpg', () => ({ default: '' }));
vi.mock('../Images/Byer/Bodø.jpg', () => ({ default: '' }));
vi.mock('../Images/Byer/Kirkenes.jpg', () => ({ default: '' }));
vi.mock('../Images/Byer/Kristiansand.jpg', () => ({ default: '' }));
vi.mock('../Images/Byer/Oslo.jpg', () => ({ default: '' }));
vi.mock('../Images/Byer/Sandnessjøen.jpg', () => ({ default: '' }));
vi.mock('../Images/Byer/tromsø.jpg', () => ({ default: '' }));
vi.mock('../Images/Byer/Trondheim.jpg', () => ({ default: '' }));
vi.mock('../Images/Byer/Ålesund.jpg', () => ({ default: '' }));
vi.mock('../Images/Byer/Stavanger.jpg', () => ({ default: '' }));

const mockedWeatherData = {
  properties: {
    timeseries: [
      {
        time: '2023-10-01T12:00:00Z',
        data: {
          instant: {
            details: {
              air_temperature: 15,
            },
          },
          next_1_hours: {
            details: {
              precipitation_amount: 0,
            },
            summary: {
              symbol_code: 'clearsky_day',
            },
          },
        },
      },
      // Flere timeseries data om nødvendig
    ],
  },
};

const fetchMock = vi.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve(mockedWeatherData),
  })
);

// Kaster fetchMock til å matche global fetch type
global.fetch = fetchMock as unknown as typeof fetch;

const cities = [
  { name: 'Bergen', lat: '60.39299', lon: '5.32415', region: 'Vestlandet' },
  { name: 'Oslo', lat: '59.911491', lon: '10.757933', region: 'Øst-Norge' },
  { name: 'Trondheim', lat: '63.446827', lon: '10.421906', region: 'Midt-Norge' },
];

describe('CitiesListView', () => {
  const onCitySelect = vi.fn();

  beforeEach(() => {
    fetchMock.mockClear();
    onCitySelect.mockClear();
    localStorage.clear();
    sessionStorage.clear();
  });

  it('should render the component and display cities', async () => {
    const { container } = render(<CitiesListView cities={cities} onCitySelect={onCitySelect} />);

    expect(screen.getByText('Velg by')).toBeInTheDocument();

    // Vent til useEffect er ferdig
    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalled();
    });

    expect(screen.getByText('Bergen')).toBeInTheDocument();
    expect(screen.getByText('Oslo')).toBeInTheDocument();
    expect(screen.getByText('Trondheim')).toBeInTheDocument();

    // Snapshot-test med Vitest
    expect(container).toMatchSnapshot();
  });

  it('should update state when filter changes', () => {
    render(<CitiesListView cities={cities} onCitySelect={onCitySelect} />);

    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: 'Øst-Norge' } });

    // Test på state-endring
    expect(sessionStorage.getItem('filter')).toBe('Øst-Norge');
  });

  it('should filter cities based on region', async () => {
    render(<CitiesListView cities={cities} onCitySelect={onCitySelect} />);

    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalled();
    });

    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: 'Øst-Norge' } });

    expect(screen.queryByText('Bergen')).not.toBeInTheDocument();
    expect(screen.getByText('Oslo')).toBeInTheDocument();
    expect(screen.queryByText('Trondheim')).not.toBeInTheDocument();
  });

  it('should call onCitySelect when a city is clicked', async () => {
    render(<CitiesListView cities={cities} onCitySelect={onCitySelect} />);

    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalled();
    });

    const cityItem = screen.getByText('Oslo');
    fireEvent.click(cityItem);

    expect(onCitySelect).toHaveBeenCalledWith(
      Number(cities[1].lat),
      Number(cities[1].lon),
      cities[1].name
    );
  });

  it('should show a message when no favorite cities are selected', async () => {
    sessionStorage.setItem('filter', 'Favoritter');

    render(<CitiesListView cities={cities} onCitySelect={onCitySelect} />);

    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalled();
    });

    expect(screen.getByText('Ingen favoritter funnet.')).toBeInTheDocument();
  });

  it('should filter cities with rain today', async () => {
    const rainData = {
      ...mockedWeatherData,
      properties: {
        timeseries: [
          {
            time: new Date().toISOString(),
            data: {
              instant: {
                details: {
                  air_temperature: 10,
                },
              },
              next_1_hours: {
                details: {
                  precipitation_amount: 5, // Indikerer regn
                },
                summary: {
                  symbol_code: 'rain',
                },
              },
            },
          },
        ],
      },
    };

    fetchMock.mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(rainData),
      })
    );

    render(<CitiesListView cities={cities} onCitySelect={onCitySelect} />);

    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalled();
    });

    const rainButton = screen.getByText('Vis byer med regn i dag');
    fireEvent.click(rainButton);

    expect(screen.getByText('Bergen')).toBeInTheDocument();
    expect(screen.getByText('Oslo')).toBeInTheDocument();
    expect(screen.getByText('Trondheim')).toBeInTheDocument();

    // Sjekker at state er oppdatert
    expect(sessionStorage.getItem('rainFilter')).toBe('true');
  });

  it('should sort cities by average temperature', async () => {
    render(<CitiesListView cities={cities} onCitySelect={onCitySelect} />);

    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalled();
    });

    const sortButton = screen.getByText('Sorter etter Temperatur');

    fireEvent.click(sortButton);

    await waitFor(() => {
      expect(screen.getByText('Tilbakestill listen')).toBeInTheDocument();
    });

    const cityItems = screen.getAllByRole('listitem');
    expect(cityItems[0]).toHaveTextContent('Bergen');
    expect(cityItems[1]).toHaveTextContent('Oslo');
    expect(cityItems[2]).toHaveTextContent('Trondheim');

    // Sjekker at state er oppdatert
    expect(sessionStorage.getItem('tempSorting')).toBe('true');
  });

  it('should handle favorites', async () => {
    localStorage.setItem('favoriteCities', JSON.stringify(['Oslo']));

    sessionStorage.setItem('filter', 'Favoritter');

    render(<CitiesListView cities={cities} onCitySelect={onCitySelect} />);

    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalled();
    });

    expect(screen.getByText('Oslo')).toBeInTheDocument();
    expect(screen.queryByText('Bergen')).not.toBeInTheDocument();
    expect(screen.queryByText('Trondheim')).not.toBeInTheDocument();
  });
});