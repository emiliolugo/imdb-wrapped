import React from 'react';
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';

export default function ChartPage({ chartData, title }) {
  let chartInformation = [];
  let xKey = "name";
  let barKey = "value";
 

if(title==="Your Top 5 Directors") {
    console.log("Directors")
        if (chartData.length > 0 && Array.isArray(chartData[0])) {
          chartInformation = chartData.map(item => ({
            name: item[0],
            value: item[1],
          }));
        }
  }
  else if (chartData && Array.isArray(chartData)) {
    const baseRatings = {};
for (let i = 1; i <= 10; i++) {
  baseRatings[i] = 0;
}

chartData.forEach(item => {
    
  const rating = title === "Your Ratings" ? item["Your Rating"] :item["IMDb Rating"];
  baseRatings[rating] += item["Count"];
});

chartInformation = Object.keys(baseRatings)
  .map(key => ({
    name: Number(key),
    value: baseRatings[key],
  }))
  .sort((a, b) => a.name - b.name);

    
  } else if (chartData && typeof chartData === "object") {
    chartInformation = Object.keys(chartData)
      .map(key => ({
        name: key,
        value: chartData[key]
      }))
      .sort((a, b) => b.value - a.value);
  } 
  return (
    <div>
      <h1>{title}</h1>
      <ResponsiveContainer width={700} height={500}>
        <BarChart 
          data={chartInformation}
          margin={{ top: 20, right: 30, left: 20, bottom: 80 }} 
        >
          <XAxis 
            dataKey={xKey} 
            interval={0} 
            tick={{ angle: -45, textAnchor: 'end' }} 
          />
          <YAxis />
          <Tooltip />
          <Bar dataKey={barKey} fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
