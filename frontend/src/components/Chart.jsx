import React, { useEffect, useState } from 'react';
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import { useMediaQuery } from '@mantine/hooks';

export default function ChartPage({ chartData, title, isChartInView }) {
  let chartInformation = [];
  let xKey = "name";
  let barKey = "value";
  const isMobile = useMediaQuery('(max-width: 768px)');

  if (title === "Your Top 5 Directors") {
    if (chartData.length > 0 && Array.isArray(chartData[0])) {
      chartInformation = chartData.map(item => ({
        name: item[0],
        value: item[1],
      }));
    }
  } else if (chartData && Array.isArray(chartData)) {
    const baseRatings = {};
    for (let i = 1; i <= 10; i++) {
      baseRatings[i] = 0;
    }

    chartData.forEach(item => {
      const rating = title === "Your Ratings" ? item["Your Rating"] : item["IMDb Rating"];
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
    <div style={{ height: '100vh', width: '100%' }}>
    <div style={{ height: '50vh', width: '100%' }}>
      <ResponsiveContainer width="100%" height="100%">
          <BarChart 
            data={chartInformation}
            margin={{ top: 20, right: 30, left: 20, bottom: 80 }} 
          >
            <XAxis 
              dataKey={xKey} 
              interval={0} 
              tick={{ angle: -45, textAnchor: 'end', fill: '#d4d4dc' }} 
              axisLine={{ stroke: '#d4d4dc' }}
            />
            <YAxis tick={{ fill: '#d4d4dc' }} axisLine={{ stroke: '#d4d4dc' }} />
            <Tooltip />
            <Bar dataKey={barKey} fill="#feda6a"
            animationDuration={20000000000}  
            animationEasing="ease-out" />
          </BarChart>
  
      </ResponsiveContainer>
      </div>
      <h1 className=' text-center px-10 text-xl lg:text-7xl font-black text-[#d4d4dc]'>{title}</h1>

    </div>
  );
}