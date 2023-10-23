import React from "react";
import { LineChart, Line, BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from "recharts";

const CombinedChart = ({ data }) => {
  const formattedData = data.map(item => ({
    ...item,
    date: item.datetime.split(":")[0]  // Extract only the date part
  }));

  return (
    <LineChart width={500} height={300} data={formattedData}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="date"  stroke="rgb(255, 95, 191)" />
      <YAxis domain={[0, 1]} orientation="left" stroke="rgb(255, 95, 191)" />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="moon_phase" stroke="rgb(255, 95, 191)" activeDot={{ r: 8 }} />
    </LineChart>
  );
};

const TemperatureBarChart = ({ data }) => {
    const formattedData = data.map(item => ({
      ...item,
      date: item.datetime.split(":")[0]  // Extract only the date part
    }));
  
    return (
      <BarChart width={500} height={300} data={formattedData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" stroke="rgb(255, 95, 191)" />
        <YAxis orientation="left" stroke="rgb(255, 95, 191)" />
        <Tooltip />
        <Legend />
        <Bar dataKey="temp" fill="rgb(255, 95, 191)" />
      </BarChart>
    );
  };

const VisualizationToggle = ({ data }) => {
  return (
    <div className="visualization-container">
      <h3>Weather Visualization</h3>
      <CombinedChart data={data} />
      <h3> </h3>
      <h3> </h3>
      <h3>Temperature Visualization</h3>
      <TemperatureBarChart data={data} />
    </div>
  );
};

export default VisualizationToggle;
