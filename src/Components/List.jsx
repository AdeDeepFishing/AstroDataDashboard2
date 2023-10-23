import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function List() {
  const [forecast, setForecast] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchDate, setSearchDate] = useState('');
  const [selectedMoonPhase, setSelectedMoonPhase] = useState('');
  const [tempBounds, setTempBounds] = useState([0, 40]);

  const getMoonPhaseEmoji = (moonPhase) => {
    if (moonPhase === 0) return '🌑';
    if (moonPhase > 0 && moonPhase < 0.2) return '🌒';
    if (moonPhase >= 0.2 && moonPhase < 0.3) return '🌓';
    if (moonPhase >= 0.3 && moonPhase < 0.7) return '🌔';
    if (moonPhase >= 0.7 && moonPhase < 1) return '🌕';
    return '';
  };

  const convertTimestampToTime = (timestamp) => {
    const date = new Date(timestamp * 1000); 
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${hours}:${minutes.toString().padStart(2, '0')}`;
  };  
  

  useEffect(() => {
    fetch(`https://api.weatherbit.io/v2.0/forecast/daily?postal_code=93117&days=16&key=${import.meta.env.VITE_WEATHERBIT_API_KEY}`)
      .then(response => response.json())
      .then(data => {
        setForecast(data.data);
        setFilteredData(data.data);
      });
  }, []);

  const handleSearch = () => {
    let results = forecast;

    if (searchDate) {
      results = results.filter(item => item.datetime === searchDate);
    }

    if (selectedMoonPhase) {
      results = results.filter(item => getMoonPhaseEmoji(item.moon_phase) === selectedMoonPhase);
    }

    results = results.filter(item => item.temp >= tempBounds[0] && item.temp <= tempBounds[1]);

    setFilteredData(results);
  };

  if (forecast.length === 0) return <div>Loading...</div>;

  return (
    <div className="list">
      <div className="filters">
        <input type="date" value={searchDate} onChange={(e) => setSearchDate(e.target.value)} />
        <select value={selectedMoonPhase} onChange={(e) => setSelectedMoonPhase(e.target.value)}>
          <option value="">All Moon Phases</option>
          <option value="🌑">New Moon 🌑</option>
          <option value="🌒">Waxing Crescent 🌒</option>
          <option value="🌓">First Quarter 🌓</option>
          <option value="🌔">Waxing Gibbous 🌔</option>
          <option value="🌕">Full Moon 🌕</option>
        </select>
        <div className="temperature-filters">
          <label>
            Min Temperature:
            <input 
              type="range" 
              min="0" 
              max="40" 
              value={tempBounds[0]} 
              onChange={(e) => setTempBounds([e.target.value, tempBounds[1]])} 
            />
            {tempBounds[0]}°C
          </label>
          <label>
            Max Temperature:
            <input 
              type="range" 
              min="0" 
              max="40" 
              value={tempBounds[1]} 
              onChange={(e) => setTempBounds([tempBounds[0], e.target.value])} 
            />
            {tempBounds[1]}°C
          </label>
        </div>
        <button onClick={handleSearch}>Search</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Temperature (°C)</th>
            <th>Sunrise</th>
            <th>Moonrise</th>
            <th>Moon Phase</th>
            <th>Link</th>
          </tr>
        </thead>
        <tbody>
            {filteredData.map(day => (
                <tr key={day.datetime}>
                  <td>{day.datetime}</td>
                  <td>{day.temp}</td>
                  <td>{convertTimestampToTime(day.sunrise_ts)}</td>
                  <td>{convertTimestampToTime(day.moonrise_ts)}</td> 
                  <td>{getMoonPhaseEmoji(day.moon_phase)}</td>
                  <td><Link to={`/detail/${day.datetime}`}>🔗</Link></td>
                </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default List;