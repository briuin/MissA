import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:3001";
console.log("API URL:", process.env.REACT_APP_API_URL);

export const fetchChartData = async ({ date, time, lat, lon }) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/astro`, {
      date,
      time,
      lat,
      lon,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching chart data:", error.message);
    if (error.response) {
      throw new Error(error.response.data.message || "API error occurred");
    } else {
      throw new Error("Network or server error");
    }
  }
};
