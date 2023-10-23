import React from 'react';
import './App.css';
import Header from "./Components/Header";
import Card from './Components/Card';
import List from './Components/List';
import NavBar from './Components/NavBar';
import DetailView from './Components/DetailView';
import VisualizationToggle from './Components/visualizationToggle';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  const [forecast, setForecast] = useState([]);

  const convertTimestampToTime = (timestamp) => {
    const date = new Date(timestamp * 1000); 
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${hours}:${minutes.toString().padStart(2, '0')}`;
  };
  
  useEffect(() => {
    fetch(`https://api.weatherbit.io/v2.0/forecast/daily?city=Raleigh,NC&days=16&key=${import.meta.env.VITE_WEATHERBIT_API_KEY}`)
      .then(response => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then(data => {
        setForecast(data.data);
      })
      .catch(error => {
        console.error("There was a problem with the fetch operation:", error.message);
      });
  }, []);
  
  return (
    <Router>
      <div className="App">
        <div className="left-section">
          <Header />
          <NavBar />
          <Card />
        </div>
        <div className="right-section">
          <Routes>
            <Route path="/detail/:date" element={<DetailView data={forecast} convertTimestampToTime={convertTimestampToTime} />} />
            <Route path="/" element={<List />} />
          </Routes>
        </div>
        <div className="rightright-section">
          <VisualizationToggle data={forecast} />
        </div>
      </div>
    </Router>
  );
}

export default App;


// import React from 'react';
// import './App.css';
// import Header from "./Components/Header";
// import Card from './Components/Card';
// import List from './Components/List';
// import NavBar from './Components/NavBar';
// import DetailView from './Components/DetailView';
// import VisualizationToggle from './Components/visualizationToggle';
// import { useEffect, useState } from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// function App() {
//   const [data, setData] = useState(null);

//   const convertTimestampToTime = (timestamp) => {
//     const date = new Date(timestamp * 1000); 
//     const hours = date.getHours();
//     const minutes = date.getMinutes();
//     return `${hours}:${minutes.toString().padStart(2, '0')}`;
//   };
  
  
//   useEffect(() => {
//     fetch(`https://api.weatherbit.io/v2.0/current?city=Raleigh,NC&key=${import.meta.env.VITE_WEATHERBIT_API_KEY}`)
//       .then(response => {
//         if (!response.ok) {
//           throw new Error("Network response was not ok");
//         }
//         return response.json();
//       })
//       .then(data => {
//         // Assuming the data is inside a property called 'data' in the response
//         setData(data.data);
//       })
//       .catch(error => {
//         console.error("There was a problem with the fetch operation:", error.message);
//       });
//   }, []);
  
  
//   return (
//     <Router>
//       <div className="App">
//         <div className="left-section">
//           <Header />
//           <NavBar />
//           <Card />
//         </div>
//         <div className="right-section">
//           <Routes>
//             <Route path="/detail/:date" element={<DetailView data={data} convertTimestampToTime={convertTimestampToTime} />} />
//             <Route path="/" element={<List />} />
//           </Routes>
//         </div>
//         <div className="rightright-section">
//           <VisualizationToggle data={data} />
//         </div>
//       </div>
//     </Router>
//   );
// }

// export default App;
