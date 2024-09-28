import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import CitiesListView from './citiesListView'; // Importer CitiesListView
import '../App.css';

import unfavoritedStar from '../Images/png/unfavoritedStar.png';
import favoritedStar from '../Images/png/favoritedStar.png';
import clearskyDay from '../Images/png/clearsky_day.png';
import clearskyNight from '../Images/png/clearsky_night.png';
import clearskyPolartwilight from '../Images/png/clearsky_polartwilight.png';
import cloudy from '../Images/png/cloudy.png';
import fairDay from '../Images/png/fair_day.png';
import fairNight from '../Images/png/fair_night.png';
import fairPolartwilight from '../Images/png/fair_polartwilight.png';
import fog from '../Images/png/fog.png';
import heavyrain from '../Images/png/heavyrain.png';
import heavyrainAndThunder from '../Images/png/heavyrainandthunder.png';
import heavyrainshowersDay from '../Images/png/heavyrainshowers_day.png';
import heavyrainshowersNight from '../Images/png/heavyrainshowers_night.png';
import heavyrainshowersPolartwilight from '../Images/png/heavyrainshowers_polartwilight.png';
import heavyrainshowersAndThunderDay from '../Images/png/heavyrainshowersandthunder_day.png';
import heavyrainshowersAndThunderNight from '../Images/png/heavyrainshowersandthunder_night.png';
import heavyrainshowersAndThunderPolartwilight from '../Images/png/heavyrainshowersandthunder_polartwilight.png';
import heavysleet from '../Images/png/heavysleet.png';
import heavysleetAndThunder from '../Images/png/heavysleetandthunder.png';
import heavysleetshowersDay from '../Images/png/heavysleetshowers_day.png';
import heavysleetshowersNight from '../Images/png/heavysleetshowers_night.png';
import heavysleetshowersPolartwilight from '../Images/png/heavysleetshowers_polartwilight.png';
import heavysleetshowersAndThunderDay from '../Images/png/heavysleetshowersandthunder_day.png';
import heavysleetshowersAndThunderNight from '../Images/png/heavysleetshowersandthunder_night.png';
import heavysleetshowersAndThunderPolartwilight from '../Images/png/heavysleetshowersandthunder_polartwilight.png';
import heavysnow from '../Images/png/heavysnow.png';
import heavysnowAndThunder from '../Images/png/heavysnowandthunder.png';
import heavysnowshowersDay from '../Images/png/heavysnowshowers_day.png';
import heavysnowshowersNight from '../Images/png/heavysnowshowers_night.png';
import heavysnowshowersPolartwilight from '../Images/png/heavysnowshowers_polartwilight.png';
import heavysnowshowersAndThunderDay from '../Images/png/heavysnowshowersandthunder_day.png';
import heavysnowshowersAndThunderNight from '../Images/png/heavysnowshowersandthunder_night.png';
import heavysnowshowersAndThunderPolartwilight from '../Images/png/heavysnowshowersandthunder_polartwilight.png';
import lightrain from '../Images/png/lightrain.png';
import lightrainAndThunder from '../Images/png/lightrainandthunder.png';
import lightrainshowersDay from '../Images/png/lightrainshowers_day.png';
import lightrainshowersNight from '../Images/png/lightrainshowers_night.png';
import lightrainshowersPolartwilight from '../Images/png/lightrainshowers_polartwilight.png';
import lightrainshowersAndThunderDay from '../Images/png/lightrainshowersandthunder_day.png';
import lightrainshowersAndThunderNight from '../Images/png/lightrainshowersandthunder_night.png';
import lightrainshowersAndThunderPolartwilight from '../Images/png/lightrainshowersandthunder_polartwilight.png';
import lightsleet from '../Images/png/lightsleet.png';
import lightsleetAndThunder from '../Images/png/lightsleetandthunder.png';
import lightsleetshowersDay from '../Images/png/lightsleetshowers_day.png';
import lightsleetshowersNight from '../Images/png/lightsleetshowers_night.png';
import lightsleetshowersPolartwilight from '../Images/png/lightsleetshowers_polartwilight.png';
import lightsnow from '../Images/png/lightsnow.png';
import lightsnowAndThunder from '../Images/png/lightsnowandthunder.png';
import lightsnowshowersDay from '../Images/png/lightsnowshowers_day.png';
import lightsnowshowersNight from '../Images/png/lightsnowshowers_night.png';
import lightsnowshowersPolartwilight from '../Images/png/lightsnowshowers_polartwilight.png';
import lightssleetshowersAndThunderDay from '../Images/png/lightssleetshowersandthunder_day.png';
import lightssleetshowersAndThunderNight from '../Images/png/lightssleetshowersandthunder_night.png';
import lightssleetshowersAndThunderPolartwilight from '../Images/png/lightssleetshowersandthunder_polartwilight.png';
import lightssnowshowersAndThunderDay from '../Images/png/lightssnowshowersandthunder_day.png';
import lightssnowshowersAndThunderNight from '../Images/png/lightssnowshowersandthunder_night.png';
import lightssnowshowersAndThunderPolartwilight from '../Images/png/lightssnowshowersandthunder_polartwilight.png';
import partlycloudyDay from '../Images/png/partlycloudy_day.png';
import partlycloudyNight from '../Images/png/partlycloudy_night.png';
import partlycloudyPolartwilight from '../Images/png/partlycloudy_polartwilight.png';
import rain from '../Images/png/rain.png';
import rainAndThunder from '../Images/png/rainandthunder.png';
import rainshowersDay from '../Images/png/rainshowers_day.png';
import rainshowersNight from '../Images/png/rainshowers_night.png';
import rainshowersPolartwilight from '../Images/png/rainshowers_polartwilight.png';
import rainshowersAndThunderDay from '../Images/png/rainshowersandthunder_day.png';
import rainshowersAndThunderNight from '../Images/png/rainshowersandthunder_night.png';
import rainshowersAndThunderPolartwilight from '../Images/png/rainshowersandthunder_polartwilight.png';
import sleet from '../Images/png/sleet.png';
import sleetAndThunder from '../Images/png/sleetandthunder.png';
import sleetshowersDay from '../Images/png/sleetshowers_day.png';
import sleetshowersNight from '../Images/png/sleetshowers_night.png';
import sleetshowersPolartwilight from '../Images/png/sleetshowers_polartwilight.png';
import sleetshowersAndThunderDay from '../Images/png/sleetshowersandthunder_day.png';
import sleetshowersAndThunderNight from '../Images/png/sleetshowersandthunder_night.png';
import sleetshowersAndThunderPolartwilight from '../Images/png/sleetshowersandthunder_polartwilight.png';
import snow from '../Images/png/snow.png';
import snowAndThunder from '../Images/png/snowandthunder.png';
import snowshowersDay from '../Images/png/snowshowers_day.png';
import snowshowersNight from '../Images/png/snowshowers_night.png';
import snowshowersPolartwilight from '../Images/png/snowshowers_polartwilight.png';
import snowshowersAndThunderDay from '../Images/png/snowshowersandthunder_day.png';
import snowshowersAndThunderNight from '../Images/png/snowshowersandthunder_night.png';
import snowshowersAndThunderPolartwilight from '../Images/png/snowshowersandthunder_polartwilight.png';
import Logo from '../Images/Logo.jpg';

// Mapping symbol codes to images
const weatherIcons: Record<string, string> = {
  clearsky_day: clearskyDay,
  clearsky_night: clearskyNight,
  clearsky_polartwilight: clearskyPolartwilight,
  cloudy: cloudy,
  fair_day: fairDay,
  fair_night: fairNight,
  fair_polartwilight: fairPolartwilight,
  fog: fog,
  heavyrain: heavyrain,
  heavyrainandthunder: heavyrainAndThunder,
  heavyrainshowers_day: heavyrainshowersDay,
  heavyrainshowers_night: heavyrainshowersNight,
  heavyrainshowers_polartwilight: heavyrainshowersPolartwilight,
  heavyrainshowersandthunder_day: heavyrainshowersAndThunderDay,
  heavyrainshowersandthunder_night: heavyrainshowersAndThunderNight,
  heavyrainshowersandthunder_polartwilight: heavyrainshowersAndThunderPolartwilight,
  heavysleet: heavysleet,
  heavysleetandthunder: heavysleetAndThunder,
  heavysleetshowers_day: heavysleetshowersDay,
  heavysleetshowers_night: heavysleetshowersNight,
  heavysleetshowers_polartwilight: heavysleetshowersPolartwilight,
  heavysleetshowersandthunder_day: heavysleetshowersAndThunderDay,
  heavysleetshowersandthunder_night: heavysleetshowersAndThunderNight,
  heavysleetshowersandthunder_polartwilight: heavysleetshowersAndThunderPolartwilight,
  heavysnow: heavysnow,
  heavysnowandthunder: heavysnowAndThunder,
  heavysnowshowers_day: heavysnowshowersDay,
  heavysnowshowers_night: heavysnowshowersNight,
  heavysnowshowers_polartwilight: heavysnowshowersPolartwilight,
  heavysnowshowersandthunder_day: heavysnowshowersAndThunderDay,
  heavysnowshowersandthunder_night: heavysnowshowersAndThunderNight,
  heavysnowshowersandthunder_polartwilight: heavysnowshowersAndThunderPolartwilight,
  lightrain: lightrain,
  lightrainandthunder: lightrainAndThunder,
  lightrainshowers_day: lightrainshowersDay,
  lightrainshowers_night: lightrainshowersNight,
  lightrainshowers_polartwilight: lightrainshowersPolartwilight,
  lightrainshowersandthunder_day: lightrainshowersAndThunderDay,
  lightrainshowersandthunder_night: lightrainshowersAndThunderNight,
  lightrainshowersandthunder_polartwilight: lightrainshowersAndThunderPolartwilight,
  lightsleet: lightsleet,
  lightsleetandthunder: lightsleetAndThunder,
  lightsleetshowers_day: lightsleetshowersDay,
  lightsleetshowers_night: lightsleetshowersNight,
  lightsleetshowers_polartwilight: lightsleetshowersPolartwilight,
  lightsnow: lightsnow,
  lightsnowandthunder: lightsnowAndThunder,
  lightsnowshowers_day: lightsnowshowersDay,
  lightsnowshowers_night: lightsnowshowersNight,
  lightsnowshowers_polartwilight: lightsnowshowersPolartwilight,
  lightssleetshowersandthunder_day: lightssleetshowersAndThunderDay,
  lightssleetshowersandthunder_night: lightssleetshowersAndThunderNight,
  lightssleetshowersandthunder_polartwilight: lightssleetshowersAndThunderPolartwilight,
  lightssnowshowersandthunder_day: lightssnowshowersAndThunderDay,
  lightssnowshowersandthunder_night: lightssnowshowersAndThunderNight,
  lightssnowshowersandthunder_polartwilight: lightssnowshowersAndThunderPolartwilight,
  partlycloudy_day: partlycloudyDay,
  partlycloudy_night: partlycloudyNight,
  partlycloudy_polartwilight: partlycloudyPolartwilight,
  rain: rain,
  rainandthunder: rainAndThunder,
  rainshowers_day: rainshowersDay,
  rainshowers_night: rainshowersNight,
  rainshowers_polartwilight: rainshowersPolartwilight,
  rainshowersandthunder_day: rainshowersAndThunderDay,
  rainshowersandthunder_night: rainshowersAndThunderNight,
  rainshowersandthunder_polartwilight: rainshowersAndThunderPolartwilight,
  sleet: sleet,
  sleetandthunder: sleetAndThunder,
  sleetshowers_day: sleetshowersDay,
  sleetshowers_night: sleetshowersNight,
  sleetshowers_polartwilight: sleetshowersPolartwilight,
  sleetshowersandthunder_day: sleetshowersAndThunderDay,
  sleetshowersandthunder_night: sleetshowersAndThunderNight,
  sleetshowersandthunder_polartwilight: sleetshowersAndThunderPolartwilight,
  snow: snow,
  snowandthunder: snowAndThunder,
  snowshowers_day: snowshowersDay,
  snowshowers_night: snowshowersNight,
  snowshowers_polartwilight: snowshowersPolartwilight,
  snowshowersandthunder_day: snowshowersAndThunderDay,
  snowshowersandthunder_night: snowshowersAndThunderNight,
  snowshowersandthunder_polartwilight: snowshowersAndThunderPolartwilight,
};

const fetchWeatherData = async (lat: number, lon: number) => {
  const headers: HeadersInit = {
    'User-Agent': 'NTNU-webutvikling-prosjekt/1.0 Jonathlo@stud.ntnu.no',
  };

  const response = await fetch(
    `/weatherapi/weatherapi/locationforecast/2.0/compact?lat=${lat}&lon=${lon}&altitude=90`,
    {
      headers,
    },
  );

  if (!response.ok) {
    throw new Error(`API call failed with status: ${response.status}`);
  }

  const data = await response.json();
  return data;
};

interface WeatherDetails {
  air_temperature: number;
  precipitation_amount?: number;
  wind_speed?: number;
  wind_from_direction?: number;
}

interface WeatherDataPoint {
  time: string;
  data: {
    instant: {
      details: WeatherDetails;
    };
    next_1_hours?: {
      details?: {
        precipitation_amount?: number;
      };
      summary?: {
        symbol_code: string;
      };
    };
  };
}

// Filtrer værdata til kun 5 dager
const splitWeatherDataByDay = (data: WeatherDataPoint[]): Record<string, WeatherDataPoint[]> => {
  const days: Record<string, WeatherDataPoint[]> = {};

  data.forEach((item: WeatherDataPoint) => {
    const date = new Date(item.time).toLocaleDateString();
    if (!days[date]) {
      days[date] = [];
    }
    days[date].push(item);
  });

  return Object.keys(days)
    .slice(0, 5)
    .reduce(
      (acc, date) => {
        acc[date] = days[date];
        return acc;
      },
      {} as Record<string, WeatherDataPoint[]>,
    );
};

const WeatherTable = () => {
  const [lat, setLat] = useState<number>(63.446827); // Trondheim lat
  const [lon, setLon] = useState<number>(10.421906); // Trondheim lon
  const [cityName, setCityName] = useState<string>('Trondheim');
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [favoriteCities, setFavoriteCities] = useState<string[]>(() => {
    // Henter favoritter fra localStorage og bruker en tom "dependency array" for å kun hente når siden først laster
    const storedFavorites = localStorage.getItem('favoriteCities');
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  });

  const { data, error, isLoading } = useQuery({
    queryKey: ['weatherData', lat, lon],
    queryFn: () => fetchWeatherData(lat, lon),
    staleTime: 10 * 60 * 1000,
    enabled: !!lat && !!lon, // Ikke kjør spørringen før lat og lon er satt
  });

  const handleCitySelect = (selectedLat: number, selectedLon: number, selectedCityName: string) => {
    setLat(selectedLat);
    setLon(selectedLon);
    setCityName(selectedCityName);
  };

  // Funksjon for å favorisere en by
  const toggleFavoriteCity = (cityName: string) => {
    if (favoriteCities.includes(cityName)) {
      // Fjerner fra favoritter
      const updatedFavorites = favoriteCities.filter((fav) => fav !== cityName);
      setFavoriteCities(updatedFavorites);
      localStorage.setItem('favoriteCities', JSON.stringify(updatedFavorites));
    } else {
      // Legger til i favoritter
      const updatedFavorites = [...favoriteCities, cityName];
      setFavoriteCities(updatedFavorites);
      localStorage.setItem('favoriteCities', JSON.stringify(updatedFavorites));
    }
  };

  const handleNextDay = (availableDates: string[]) => {
    const currentIndex = availableDates.indexOf(selectedDate || availableDates[0]);
    if (currentIndex < availableDates.length - 1) {
      setSelectedDate(availableDates[currentIndex + 1]);
    }
  };

  const handlePreviousDay = (availableDates: string[]) => {
    const currentIndex = availableDates.indexOf(selectedDate || availableDates[0]);
    if (currentIndex > 0) {
      setSelectedDate(availableDates[currentIndex - 1]);
    }
  };

  const handleNextCity = () => {
    const currentIndex = cityList.findIndex((city) => city.name === cityName);

    if (currentIndex === cityList.length - 1) {
      setLat(Number(cityList[0].lat));
      setLon(Number(cityList[0].lon));
      setCityName(cityList[0].name);
    } else {
      setLat(Number(cityList[currentIndex + 1].lat));
      setLon(Number(cityList[currentIndex + 1].lon));
      setCityName(cityList[currentIndex + 1].name);
    }
  };

  const handlePreviousCity = () => {
    const currentIndex = cityList.findIndex((city) => city.name === cityName);

    if (currentIndex === 0) {
      setLat(Number(cityList[cityList.length - 1].lat));
      setLon(Number(cityList[cityList.length - 1].lon));
      setCityName(cityList[cityList.length - 1].name);
    } else {
      setLat(Number(cityList[currentIndex - 1].lat));
      setLon(Number(cityList[currentIndex - 1].lon));
      setCityName(cityList[currentIndex - 1].name);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {(error as Error).message}</div>;

  const weatherDataByDay = splitWeatherDataByDay(data.properties.timeseries);
  const availableDates = Object.keys(weatherDataByDay);
  const today = new Date().toLocaleDateString();
  const currentDay = selectedDate || availableDates[0];
  const todayData = weatherDataByDay[currentDay] || [];

  const isToday = today === currentDay;
  const isFirstDay = currentDay === availableDates[0];
  const isLastDay = currentDay === availableDates[availableDates.length - 1];

  const cityList = [
    { name: 'Sandnessjøen', lat: '66.02166', lon: '12.63158', region: 'Nord-Norge' },
    { name: 'Trondheim', lat: '63.446827', lon: '10.421906', region: 'Midt-Norge' },
    { name: 'Oslo', lat: '59.911491', lon: '10.757933', region: 'Øst-Norge' },
    { name: 'Bergen', lat: '60.39299', lon: '5.32415', region: 'Vestlandet' },
    { name: 'Stavanger', lat: '58.969975', lon: '5.733107', region: 'Vestlandet' },
    { name: 'Bodø', lat: '67.280357', lon: '14.404916', region: 'Nord-Norge' },
    { name: 'Tromsø', lat: '69.6489', lon: '18.95508', region: 'Nord-Norge' },
    { name: 'Ålesund', lat: '62.472229', lon: '6.149482', region: 'Vestlandet' },
    { name: 'Kristiansand', lat: '58.14671', lon: '7.9956', region: 'Sør-Norge' },
    { name: 'Kirkenes', lat: '69.72706', lon: '30.04578', region: 'Nord-Norge' },
  ];

  return (
    <>
      <div className="Container">
        <div id="weathertableDiv" style={{ position: 'relative' }}>
          <h1>Værvarsel for {cityName}</h1>
          <div>
            <img className="logoImage" src={Logo} alt="Yr typen Norsk" style={{ width: '15%', height: 'auto' }} />
            <button onClick={handlePreviousCity}>Forrige by</button>
            <button
              onClick={() => toggleFavoriteCity(cityName)}
              className="favoritt-knapp"
              title="Legg til i Favoritter"
            >
              <img
                src={favoriteCities.includes(cityName) ? favoritedStar : unfavoritedStar}
                alt={favoriteCities.includes(cityName) ? 'Fjern fra favoritter' : 'Favoriser'}
                style={{ width: '24px', height: '24px', cursor: 'pointer' }}
              />
            </button>
            <button onClick={handleNextCity}>Neste by</button>
          </div>
          <div>
            <button onClick={() => handlePreviousDay(availableDates)} disabled={isFirstDay}>
              Forrige dag
            </button>
            <button onClick={() => handleNextDay(availableDates)} disabled={isLastDay}>
              Neste dag
            </button>
          </div>
          <h2>{isToday ? 'I dag' : currentDay}</h2>
          <table>
            <thead>
              <tr>
                <th>Tid</th>
                <th>Vær</th>
                <th>Temp.</th>
                <th>Nedbør mm</th>
                <th>Vind m/s</th>
                <th className='vindbeskrivelse'>Vindbeskrivelse</th>
              </tr>
            </thead>
            <tbody>
              {todayData.map((item: WeatherDataPoint, index: number) => {
                const symbolCode = item.data.next_1_hours?.summary?.symbol_code || 'clearsky_day';
                const time = new Date(item.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                const precipitation = item.data.next_1_hours?.details?.precipitation_amount?.toFixed(1) || '0.0';

                return (
                  <tr key={index}>
                    <td>{time}</td>
                    <td>
                      <img
                        src={weatherIcons[symbolCode] || weatherIcons['clearsky_day']}
                        alt={symbolCode}
                        style={{ width: '50px', height: '50px' }}
                      />
                    </td>
                    <td>{item.data.instant.details.air_temperature}°</td>
                    <td>{precipitation}</td>
                    <td>{item.data.instant.details.wind_speed} m/s</td>
                    <td className='vindbeskrivelse'>{`Lett bris fra ${item.data.instant.details.wind_from_direction} grader`}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <CitiesListView onCitySelect={handleCitySelect} cities={cityList} />
      </div>
    </>
  );
};

export default WeatherTable;
