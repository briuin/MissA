import axios from "axios";
import { GatewayServiceClient } from "./proto/gateway_grpc_web_pb";
import { GetHoroscopeAnalysisRequest } from "./proto/gateway_pb";

const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:8080";
const API_VERSION = process.env.REACT_APP_API_VERSION || 1;
console.log("version", API_VERSION);

const client = new GatewayServiceClient(BASE_URL);

const mapAstrologyData = (input) => ({
  analysis: {
    cusp: {
      headers: input.analysis.cusp.headersList,
      data: input.analysis.cusp.dataList.map(
        ({ house, startLongitude, zodiacSign, degrees }) => ({
          house,
          startLongitude,
          zodiacSign,
          degrees,
        })
      ),
      analysis: input.analysis.cusp.analysisList,
    },
    planet: {
      headers: input.analysis.planet.headersList,
      data: input.analysis.planet.dataList.map(
        ({ planet, longitude, zodiacSign, degrees, house }) => ({
          planet,
          longitude,
          zodiacSign,
          degrees,
          house,
        })
      ),
      analysis: input.analysis.planet.analysisList,
    },
    aspect: {
      headers: input.analysis.aspect.headersList,
      data: input.analysis.aspect.dataList.map(
        ({ planet1, planet2, aspect, angle }) => ({
          planet1,
          planet2,
          aspect,
          angle,
        })
      ),
      analysis: input.analysis.aspect.analysisList,
    },
    transit: {
      headers: input.analysis.transit.headersList,
      data: input.analysis.transit.dataList.map(
        ({
          planet,
          currentLongitude,
          zodiacSign,
          degree,
          correspondingNatalPlanet,
          aspectType,
          angle,
          influence,
        }) => ({
          planet,
          currentLongitude,
          zodiacSign,
          degrees: degree || currentLongitude,
          aspectToNatalPlanet: correspondingNatalPlanet,
          aspectType,
          angle,
          effect: influence,
        })
      ),
      analysis: input.analysis.transit.analysisList,
    },
    Ascendant: input.analysis.ascendant,
    horoscope: input.analysis.horoscope,
    summary: input.analysis.summary,
  },
  data: {
    planets: input.data.planetsList.map(({ name, longitude }) => ({
      name,
      longitude: parseFloat(longitude),
    })),
    currentPlanets: input.data.currentPlanetsList.map(
      ({ name, longitude }) => ({
        name,
        longitude: parseFloat(longitude),
      })
    ),
    houses: { ...input.data.houses, house: input.data.houses.houseList },
    currentHouses: {
      ...input.data.currentHouses,
      house: input.data.currentHouses.houseList,
    },
    signs: input.data.signsList.map(({ name, sign, house }) => ({
      name,
      sign,
      house,
    })),
  },
});

export const fetchChartData = async ({ date, time, lat, lon }) => {
  if (API_VERSION === 2) {
    return new Promise((resolve, reject) => {
      const request = new GetHoroscopeAnalysisRequest();
      request.setDate(date);
      request.setTime(time);
      request.setLat(Number.parseFloat(Number.parseFloat(lat).toFixed(4)));
      request.setLon(Number.parseFloat(Number.parseFloat(lon).toFixed(4)));

      client.getHoroscopeAnalysis(request, {}, function (err, response) {
        if (err) {
          resolve(err);
        } else {
          const data = response.toObject();
          resolve(mapAstrologyData(data));
        }
      });
    });
  } else {
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
  }
};
