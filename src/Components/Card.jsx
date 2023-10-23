import React, { useEffect, useState } from 'react';

function Card() {
  const [data, setData] = useState(null);

  const getMoonPhaseEmoji = (moonPhase) => {
    if (moonPhase === 0) return '🌑';
    if (moonPhase > 0 && moonPhase < 0.2) return '🌒';
    if (moonPhase >= 0.2 && moonPhase < 0.3) return '🌓';
    if (moonPhase >= 0.3 && moonPhase < 0.7) return '🌔';
    if (moonPhase >= 0.7 && moonPhase < 1) return '🌕';
    return '';
  };

  const convertTimestampToTime = (timestamp) => {
    const date = new Date(timestamp * 1000); // Convert to milliseconds
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${hours}:${minutes.toString().padStart(2, '0')}`;
  };
  

  useEffect(() => {
    fetch(`https://api.weatherbit.io/v2.0/forecast/daily?postal_code=93117&days=1&key=${import.meta.env.VITE_WEATHERBIT_API_KEY}`)
      .then(response => response.json())
      .then(data => setData(data.data[0]));
  }, []);

  if (!data) return <div>Loading...</div>;

  return (
    <div className="card">
      <h2>Isla Vista, CA</h2>
      <p>Moon Rise: {convertTimestampToTime(data.moonrise_ts)}</p>
      <p>Air Quality: {data.aqi} AQI</p>
      <p>Moon Phase: {getMoonPhaseEmoji(data.moon_phase)}</p>
    </div>
  );
}

export default Card;