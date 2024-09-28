import { useState, useEffect } from 'react';
import '../App.css';

// Importer bybildene
import Bergen from '../Images/Byer/Bergen.jpg';
import Bodo from '../Images/Byer/Bodø.jpg';
import Kirkenes from '../Images/Byer/Kirkenes.jpg';
import Kristiansand from '../Images/Byer/Kristiansand.jpg';
import Oslo from '../Images/Byer/Oslo.jpg';
import Sandnessjoen from '../Images/Byer/Sandnessjøen.jpg';
import Tromso from '../Images/Byer/tromsø.jpg';
import Trondheim from '../Images/Byer/Trondheim.jpg';
import Alesund from '../Images/Byer/Ålesund.jpg';
import Stavanger from '../Images/Byer/Stavanger.jpg';

// Opprett mapping mellom bynavn og bilder
const cityImages = {
  Bergen: Bergen,
  Bodø: Bodo,
  Kirkenes: Kirkenes,
  Kristiansand: Kristiansand,
  Oslo: Oslo,
  Sandnessjøen: Sandnessjoen,
  Tromsø: Tromso,
  Trondheim: Trondheim,
  Ålesund: Alesund,
  Stavanger: Stavanger,
};

const fetchWeatherForCity = async (lat: number, lon: number) => {
  const response = await fetch(
    `/weatherapi/weatherapi/locationforecast/2.0/compact?lat=${lat}&lon=${lon}&altitude=90`,
  );
  if (!response.ok) {
    throw new Error(`API call failed with status: ${response.status}`);
  }
  const data = await response.json();
  return data;
};

interface WeatherDataPoint {
  time: string; // or Date if the data is returned as a Date object
  data: {
    instant: {
      details: {
        air_temperature: number;
      };
    };
    next_1_hours?: {
      details?: {
        precipitation_amount?: number;
      };
    };
  };
}

interface City {
  name: string;
  lat: string;
  lon: string;
  region: string;
}

interface CitiesListViewProps {
  cities: City[];
  onCitySelect: (lat: number, lon: number, cityName: string) => void;
}

const CitiesListView = ({ cities, onCitySelect }: CitiesListViewProps) => {
  const [filter, setFilter] = useState<string>('');
  const [showRainCities, setShowRainCities] = useState<boolean>(false);
  const [rainCities, setRainCities] = useState<string[]>([]);
  const [averageTemperatures, setAverageTemperatures] = useState<{ [key: string]: number }>({});
  const [sortedCities, setSortedCities] = useState<City[]>(cities);
  const [isSorting, setIsSorting] = useState<boolean>(false);
  const [favoriteCities, setFavoriteCities] = useState<string[]>([]);
  const [isListSorted, setIsListSorted] = useState<boolean>(false); // Sjekk om listen er sortert

  useEffect(() => {
    const fetchData = async () => {
      const avgTemps: { [key: string]: number } = {};
      const rainCitiesTemp: string[] = [];
      const today = new Date().toLocaleDateString();

      for (const city of cities) {
        try {
          const weatherData = await fetchWeatherForCity(Number(city.lat), Number(city.lon));
          const timeseries = weatherData.properties.timeseries;

          // Beregn gjennomsnittstemperatur
          const temperatures = timeseries.map(
            (dataPoint: WeatherDataPoint) => dataPoint.data.instant.details.air_temperature,
          );
          const sumTemp = temperatures.reduce((acc: number, temp: number) => acc + temp, 0);
          const avgTemp = sumTemp / temperatures.length;
          avgTemps[city.name] = parseFloat(avgTemp.toFixed(1));

          // Sjekk om det er regn i dag
          const hasRainToday = timeseries.some((dataPoint: WeatherDataPoint) => {
            const date = new Date(dataPoint.time).toLocaleDateString();
            const precipitation = dataPoint.data.next_1_hours?.details?.precipitation_amount || 0;
            return date === today && precipitation > 0;
          });

          if (hasRainToday) {
            rainCitiesTemp.push(city.name);
          }
        } catch (error) {
          console.error(`Feil ved henting av værdata for ${city.name}:`, error);
        }
        // Henter favoritter fra localStorage
        const savedFavorites = localStorage.getItem('favoriteCities');
        if (savedFavorites) {
          setFavoriteCities(JSON.parse(savedFavorites));
        }
      }

      setAverageTemperatures(avgTemps);
      setRainCities(rainCitiesTemp);

      const selectedFilter = sessionStorage.getItem('filter');
      if (selectedFilter) {
        setFilter(selectedFilter);
      }
      const selectedRainFilter = sessionStorage.getItem('rainFilter');
      if (selectedRainFilter) {
        setShowRainCities(JSON.parse(selectedRainFilter));
      }
      const selectedTempSorting = sessionStorage.getItem('tempSorting');
      const selectedSortedCities = sessionStorage.getItem('sortedCities');
      if (selectedTempSorting && selectedSortedCities) {
        setIsListSorted(JSON.parse(selectedTempSorting));
        setSortedCities(JSON.parse(selectedSortedCities));
      }
    };

    fetchData();
  }, [cities]);

  const handleRainFilterClick = () => {
    setShowRainCities((prev) => {
      const newValue = !prev;
      sessionStorage.setItem('rainFilter', JSON.stringify(newValue));
      return newValue;
    });
  };

  const handleSortOrResetClick = () => {
    if (isListSorted) {
      // Tilbakestill til opprinnelig liste og tilstand
      setSortedCities(cities);
      setIsListSorted(false);
      sessionStorage.setItem('tempSorting', JSON.stringify(false));
      sessionStorage.removeItem('sortedCities');

      // Tilbakestill filtrering
      setFilter('');
      sessionStorage.removeItem('filter');
      setShowRainCities(false);
      sessionStorage.removeItem('rainFilter');
    } else {
      // Start sortering med animasjon
      setIsSorting(true);

      const tempCities = [...sortedCities];
      let i = 0;

      const sortStep = () => {
        if (i >= tempCities.length - 1) {
          setIsSorting(false);
          setIsListSorted(true);
          return;
        }

        for (let j = 0; j < tempCities.length - i - 1; j++) {
          const tempA = averageTemperatures[tempCities[j].name];
          const tempB = averageTemperatures[tempCities[j + 1].name];

          // Sorter fra høyest til lavest temperatur
          if (tempA < tempB) {
            [tempCities[j], tempCities[j + 1]] = [tempCities[j + 1], tempCities[j]];
          }
        }

        setSortedCities([...tempCities]);
        i++;
        sessionStorage.setItem('tempSorting', JSON.stringify(true));
        sessionStorage.setItem('sortedCities', JSON.stringify(tempCities));

        setTimeout(sortStep, 300); // Animasjonens steg
      };

      sortStep();
    }
  };

  // Filtrer byene basert på valg
  const filteredCities = sortedCities.filter((city) => {
    // Viser favoritter
    if (filter === 'Favoritter') {
      return favoriteCities.includes(city.name) && (!showRainCities || rainCities.includes(city.name));
    }
    // Normal filtering basert på region og regnvalg
    return (filter === '' || city.region === filter) && (!showRainCities || rainCities.includes(city.name));
  });

  return (
    <div id="listDiv">
      <h1>Velg by</h1>

      {/* Dropdown for region-filtrering */}
      <select
        value={filter}
        onChange={(e) => {
          setFilter(e.target.value);
          sessionStorage.setItem('filter', e.target.value);
        }}
      >
        <option value="">Alle byer</option>
        <option value="Favoritter">Favoritter</option>
        <option value="Nord-Norge">Nord-Norge</option>
        <option value="Midt-Norge">Midt-Norge</option>
        <option value="Sør-Norge">Sør-Norge</option>
        <option value="Øst-Norge">Øst-Norge</option>
        <option value="Vestlandet">Vestlandet</option>
      </select>

      {/* Knapp for å vise byer med regn */}
      <button
        onClick={handleRainFilterClick}
        style={{
          backgroundColor: showRainCities ? '#2a9d8f' : '#007bff',
          color: 'white',
          display: 'block',
          margin: '10px auto',
        }}
      >
        Vis byer med regn i dag
      </button>

      {/* Knapp for å sortere eller tilbakestille listen */}
      <button
        onClick={handleSortOrResetClick}
        disabled={isSorting}
        style={{
          display: 'block',
          margin: '10px auto',
        }}
      >
        {isListSorted ? 'Tilbakestill listen' : 'Sorter etter Temperatur'}
      </button>

      <ul className="city-list">
        {filteredCities.length === 0 && filter === 'Favoritter' ? (
          <p style={{ textAlign: 'center' }}>Ingen favoritter funnet.</p>
        ) : (
          filteredCities.map((city) => (
            <li
              key={city.name}
              onClick={() => onCitySelect(Number(city.lat), Number(city.lon), city.name)}
              className="city-item show"
            >
              <img src={cityImages[city.name as keyof typeof cityImages]} alt={city.name} className="city-image" />
              <div>
                <span>{city.name}</span>
                {averageTemperatures[city.name] !== undefined && (
                  <p>Temperatur: {averageTemperatures[city.name]}°C</p>
                )}
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default CitiesListView;