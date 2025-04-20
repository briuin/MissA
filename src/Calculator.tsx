import React from "react";
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
    <div className="min-h-screen flex flex-col items-center bg-base-200">
      <div className="flex-1 flex flex-col items-center w-full p-6">
        <div className="w-full max-w-4xl bg-base-100 rounded-xl shadow-xl p-8 flex flex-col gap-8">
          {/* Heading */}
          <h2 className="text-3xl font-bold text-center">Astrological Chart Data</h2>

          {/* Input Section */}
          <div className="w-full flex flex-col gap-4 bg-base-200 rounded-lg p-4">
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
            {false && <LatLonDisplay lat={lat} lon={lon} />}

            {/* Submit Button */}
            <button
              className="btn btn-primary self-center"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? "Loading..." : "Get Chart"}
            </button>
          </div>

          {/* Output Section */}
          <div className="w-full flex flex-col gap-4 bg-base-300 rounded-lg p-6 mt-4 items-center">
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
          </div>
        </div>
      </div>
      {/* Footer */}
      <footer className="footer footer-center p-4 bg-base-100 text-base-content">
        <aside>
          <span className="text-sm">© 2025 Astrological Insights</span>
        </aside>
      </footer>
    </div>
  );
};

export default Calculator;
