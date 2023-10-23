import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function DetailView({ convertTimestampToTime }) {
  const { date } = useParams();
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(`https://api.weatherbit.io/v2.0/forecast/daily?postal_code=93117&days=16&key=${import.meta.env.VITE_WEATHERBIT_API_KEY}`)
      .then(response => response.json())
      .then(data => {
        setData(data.data);
      });
  }, []);

  // Find the specific data for the provided date
  const specificData = data?.find(item => item.datetime.startsWith(date));

  console.log("Data:", data);

  if (!specificData) return <div>No data available for the selected date.</div>;

  const getMoonPhaseEmoji = (moonPhase) => {
    if (!moonPhase) return 'Phase data not available';
  
    if (moonPhase === 0) return '🌑 New Moon';
    if (moonPhase > 0 && moonPhase < 0.2) return '🌒 Waxing Crescent';
    if (moonPhase >= 0.2 && moonPhase < 0.3) return '🌓 First Quarter';
    if (moonPhase >= 0.3 && moonPhase < 0.7) return '🌔 Waxing Gibbous';
    if (moonPhase >= 0.7 && moonPhase < 1) return '🌕 Full Moon';
    return '';
  };

  console.log("Specific Data:", specificData);
  console.log("Moon Phase Value:", specificData.moon_phase);

  const getMoonPhaseDescription = (moonPhase) => {
    if (!moonPhase) return 'No moon phase data available';
  
    if (moonPhase === 0) return 'The moon is not visible from Earth. This is the beginning of a new lunar cycle.';
    if (moonPhase > 0 && moonPhase < 0.2) return 'The moon is slightly visible. This phase signifies new beginnings.';
    if (moonPhase >= 0.2 && moonPhase < 0.3) return 'The area of illumination continues to increase. More than half of the moon\'s face appears to be getting sunlight.';
    if (moonPhase >= 0.3 && moonPhase < 0.7) return 'The moon is more than half illuminated but not full. It signifies refinement and growth.';
    if (moonPhase >= 0.7 && moonPhase < 1) return 'More than half of the moon\'s face appears to be getting sunlight, but the amount is decreasing.';
    return '';
  };


  return (
    <div className='detailview'>
      <h2>Date: {specificData.datetime.split(":")[0]}</h2>
      <p>Phase: {getMoonPhaseEmoji(specificData.moon_phase)}</p>
      <p>Visibility: {specificData.vis || 'N/A'}%</p>
      <p>Moonrise: {convertTimestampToTime(specificData.moonrise_ts) || 'N/A'}</p>
      <p>Moonset: {convertTimestampToTime(specificData.moonset_ts) || 'N/A'}</p>
      <p>Moon Phase Description: {getMoonPhaseDescription(specificData.moon_phase) || 'N/A'}</p>
    </div>
  );  
}

export default DetailView;
