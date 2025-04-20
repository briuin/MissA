import React from "react";
import {
  Grommet,
  Box,
  Button,
  Heading,
  Footer,
  Text,
  ResponsiveContext,
} from "grommet";
import { darkTheme } from "./theme";
import useAstroStore from "./store/astro.store";
import DateTimeSelector from "./ui/DateTimeSelector";
import CountryStateCitySelector from "./components/CountryStateCitySelector";
import LatLonDisplay from "./components/LatLonDisplay";
import ResponseDisplay from "./components/ResponseDisplay";
import AstroChartRenderer from "./components/AstroChartRenderer";
import { fetchChartData } from "./chart.service";
import tzlookup from "tz-lookup";
import { useTime } from "./hooks/useTime";

// Define the AstroStore type for Zustand
interface AstroStore {
  countries: any[];
  states: any[];
  cities: any[];
  selectedCountry: any;
  selectedState: any;
  selectedCity: any;
  lat: number;
  lon: number;
  date: string;
  time: string;
  responseData: any;
  error: string | null;
  loading: boolean;
  setSelectedCountry: (country: any) => void;
  setSelectedState: (state: any) => void;
  setSelectedCity: (city: any) => void;
  setDate: (date: string) => void;
  setTime: (time: string) => void;
  setResponseData: (data: any) => void;
  setError: (error: string | null) => void;
  setLoading: (loading: boolean) => void;
}

const Calculator = () => {
  const {
    countries,
    states,
    cities,
    selectedCountry,
    selectedState,
    selectedCity,
    lat,
    lon,
    date,
    time,
    responseData,
    error,
    loading,
    setSelectedCountry,
    setSelectedState,
    setSelectedCity,
    setDate,
    setTime,
    setResponseData,
    setError,
    setLoading,
  } = useAstroStore() as AstroStore;

  const handleSubmit = async () => {
    setError(null);
    setResponseData(null);
    setLoading(true);
    const tz = tzlookup(lat, lon);
    const { getDateByTimezone } = useTime(tz);
    const tzDate = getDateByTimezone(date, time, tz);
    console.log(tzDate, tz);
    try {
      const data = await fetchChartData({
        date: tzDate.format("YYYY-MM-DD"),
        time: tzDate.format("HH:mm"),
        lat,
        lon,
      });
      console.log(data);
      setResponseData(data);
    } catch (err) {
      // Type guard for error
      if (err && typeof err === "object" && "message" in err) {
        setError((err as any).message || "Something went wrong!");
      } else {
        setError("Something went wrong!");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Grommet theme={darkTheme} full="min">
      <ResponsiveContext.Consumer>
        {(size: string) => (
          <Box fill align="center" pad="large">
            <Box
              direction="column"
              gap="large"
              width={size === "small" ? "100%" : "xlarge"}
              align="center"
              background="background"
              round="small"
              pad="medium"
              elevation="medium"
            >
              {/* Heading */}
              <Heading level="2" margin="none" alignSelf="center">
                Astrological Chart Data
              </Heading>

              {/* Input Section */}
              <Box
                width="100%"
                gap="medium"
                pad={{ horizontal: "medium", vertical: "small" }}
                background={size === "small" ? "dark-2" : "background"}
                round="small"
              >
                {/* Date and Time Selector */}
                <DateTimeSelector
                  date={date}
                  time={time}
                  setDate={setDate}
                  setTime={setTime}
                />

                {/* Country, State, City Selector */}
                <CountryStateCitySelector
                  countries={countries}
                  states={states}
                  cities={cities}
                  selectedCountry={selectedCountry}
                  selectedState={selectedState}
                  selectedCity={selectedCity}
                  setSelectedCountry={setSelectedCountry}
                  setSelectedState={setSelectedState}
                  setSelectedCity={setSelectedCity}
                />

                {/* Latitude and Longitude Display */}
                { false && <LatLonDisplay lat={lat} lon={lon} />}

                {/* Submit Button */}
                <Button
                  primary
                  label={loading ? "Loading..." : "Get Chart"}
                  onClick={handleSubmit}
                  disabled={loading}
                  alignSelf="center"
                />
              </Box>

              {/* Output Section */}
              <Box
                width="100%"
                gap="medium"
                background={size === "small" ? "dark-2" : "dark-1"}
                pad="medium"
                round="small"
                elevation="small"
                align="center"
                margin={{ top: "medium" }}
              >
                {/* Chart Renderer */}
                {responseData && (
                  <AstroChartRenderer
                    data={{
                      planets: responseData.data.planets,
                      houses: responseData.data.houses,
                      currentPlanets: responseData.data.currentPlanets,
                      currentHouses: responseData.data.currentHouses,
                    }}
                  />
                )}

                {/* Response Display */}
                <ResponseDisplay
                  loading={loading}
                  error={error}
                  responseData={responseData}
                />
              </Box>
            </Box>

            {/* Footer */}
            <Footer background="background" pad="medium">
              <Text size="small">© 2025 Astrological Insights</Text>
            </Footer>
          </Box>
        )}
      </ResponsiveContext.Consumer>
    </Grommet>
  );
};

export default Calculator;
