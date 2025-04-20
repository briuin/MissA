import React, { useEffect, useRef } from "react";
import Chart from "@astrodraw/astrochart";

const AstroChartRenderer = ({ data }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current && data?.planets && data?.houses?.house) {
      // Clear previous chart
      chartRef.current.innerHTML = "";

      const chartData = {
        planets: data.planets.reduce((obj, planet) => {
          obj[planet.name] = [planet.longitude];
          return obj;
        }, {}), // Convert planets data into the expected format
        cusps: data.houses.house,
      };

      const chartTransit = {
        planets: data.currentPlanets.reduce((obj, planet) => {
          obj[planet.name] = [planet.longitude];
          return obj;
        }, {}), // Convert planets data into the expected format
        cusps: data.currentHouses.house,
      };

      const chart = new Chart('chart', 640, 640, {
        DEBUG: true,
        chartType: "natal", // Chart type (natal chart)
        colors: {
          background: "#1a1a1a", // Dark mode background
          primary: "#ffffff", // Primary text color
        },
      });
     const radix = chart.radix(chartData);
     const transit = radix.transit(chartTransit);
     transit.aspects();


      //   // Create new chart
        // new Chart(chartRef.current, {
        //   ...chartData,
        //   chartType: "natal", // Chart type (natal chart)
        //   colors: {
        //     background: "#1a1a1a", // Dark mode background
        //     primary: "#ffffff", // Primary text color
        //   },
        // });
    }
  }, [data]);

  return <div id="chart" ref={chartRef} style={{ width: "640px", height: "640px" }} />;
};

export default AstroChartRenderer;
