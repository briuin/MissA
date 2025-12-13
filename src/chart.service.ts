import axios from 'axios';
import { GatewayServiceClient } from './proto/gateway.client';
import { GetHoroscopeAnalysisRequest } from './proto/gateway';
import { GrpcWebFetchTransport } from '@protobuf-ts/grpcweb-transport';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';
const API_VERSION = Number(import.meta.env.VITE_API_VERSION || 1);
console.log('version', API_VERSION);

const transport = new GrpcWebFetchTransport({ baseUrl: BASE_URL });
const client = new GatewayServiceClient(transport);

const mapAstrologyData = (input: any) => ({
  analysis: {
    cusp: {
      headers: input.analysis.cusp.headersList,
      data: input.analysis.cusp.dataList.map(
        ({ house, startLongitude, zodiacSign, degrees }: any) => ({
          house,
          startLongitude,
          zodiacSign,
          degrees,
        }),
      ),
      analysis: input.analysis.cusp.analysisList,
    },
    planet: {
      headers: input.analysis.planet.headersList,
      data: input.analysis.planet.dataList.map(
        ({ planet, longitude, zodiacSign, degrees, house }: any) => ({
          planet,
          longitude,
          zodiacSign,
          degrees,
          house,
        }),
      ),
      analysis: input.analysis.planet.analysisList,
    },
    aspect: {
      headers: input.analysis.aspect.headersList,
      data: input.analysis.aspect.dataList.map(
        ({ planet1, planet2, aspect, angle }: any) => ({
          planet1,
          planet2,
          aspect,
          angle,
        }),
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
        }: any) => ({
          planet,
          currentLongitude,
          zodiacSign,
          degrees: degree || currentLongitude,
          aspectToNatalPlanet: correspondingNatalPlanet,
          aspectType,
          angle,
          effect: influence,
        }),
      ),
      analysis: input.analysis.transit.analysisList,
    },
    Ascendant: input.analysis.ascendant,
    horoscope: input.analysis.horoscope,
    summary: input.analysis.summary,
  },
  data: {
    planets: input.data.planetsList.map(({ name, longitude }: any) => ({
      name,
      longitude: parseFloat(longitude),
    })),
    currentPlanets: input.data.currentPlanetsList.map(
      ({ name, longitude }: any) => ({
        name,
        longitude: parseFloat(longitude),
      }),
    ),
    houses: { ...input.data.houses, house: input.data.houses.houseList },
    currentHouses: {
      ...input.data.currentHouses,
      house: input.data.currentHouses.houseList,
    },
    signs: input.data.signsList.map(({ name, sign, house }: any) => ({
      name,
      sign,
      house,
    })),
  },
});

export const fetchChartData = async ({
  date,
  time,
  lat,
  lon,
}: {
  date: string;
  time: string;
  lat: number;
  lon: number;
}) => {
  if (API_VERSION === 2) {
    const request = GetHoroscopeAnalysisRequest.create({
      date,
      time,
      lat: Number.parseFloat(Number.parseFloat(lat as any).toFixed(4)),
      lon: Number.parseFloat(Number.parseFloat(lon as any).toFixed(4)),
    });
    const { response } = await client.getHoroscopeAnalysis(request);
    return mapAstrologyData(response);
  } else {
    try {
      const response = await axios.post(`${BASE_URL}/api/astro`, {
        date,
        time,
        lat,
        lon,
      });

      const { jobId, status, data } = response.data;

      // New polling logic
      if (status === 'PENDING' && jobId) {
        let pollStatus = 'PENDING';
        let analysis = null;

        // Poll every 5 seconds
        while (pollStatus === 'PENDING') {
          await new Promise(resolve => setTimeout(resolve, 5000));
          const pollResponse = await axios.get(
            `${BASE_URL}/api/analysis/${jobId}`,
          );
          pollStatus = pollResponse.data.status;

          if (pollStatus === 'COMPLETED') {
            analysis = pollResponse.data.analysis;
          } else if (pollStatus === 'FAILED' || pollStatus === 'ERROR') {
            throw new Error('Analysis failed');
          }
        }

        return {
          jobId,
          status: pollStatus,
          data,
          analysis,
        };
      }

      return response.data;
    } catch (error: any) {
      console.error('Error fetching chart data:', error.message);
      if (error.response) {
        throw new Error(error.response.data.message || 'API error occurred');
      } else {
        throw new Error('Network or server error');
      }
    }
  }
};
