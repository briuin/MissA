import React, { useEffect, useRef } from "react";
import Chart from "@astrodraw/astrochart";

interface Planet {
  name: string;
  longitude: number;
}
interface Houses { house: number[]; }
interface ChartData {
  planets: Planet[];
  houses: Houses;
  currentPlanets: Planet[];
  currentHouses: Houses;
}

const AstroChartRenderer: React.FC<{ data: ChartData }> = ({ data }) => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chartRef.current && data?.planets && data?.houses?.house) {
      // Clear previous chart
      (chartRef.current as HTMLDivElement).innerHTML = "";

      const chartData = {
        planets: data.planets.reduce<Record<string, number[]>>((obj, planet) => {
          obj[planet.name] = [planet.longitude];
          return obj;
        }, {}), // Convert planets data into the expected format
        cusps: data.houses.house,
      };

      const chartTransit = {
        planets: data.currentPlanets.reduce<Record<string, number[]>>((obj, planet) => {
          obj[planet.name] = [planet.longitude];
          return obj;
        }, {}), // Convert planets data into the expected format
        cusps: data.currentHouses.house,
      };

      const chart = new Chart('chart', 640, 640, {
        DEBUG: true,
      });
      const radix = chart.radix(chartData);
      const transit = radix.transit(chartTransit);
    }
  }, [data]);

  return <div id="chart" ref={chartRef} style={{ width: "640px", height: "640px" }} />;
};

export default AstroChartRenderer;
