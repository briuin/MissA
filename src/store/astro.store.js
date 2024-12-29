import { create } from "zustand";
import { Country, State, City } from "country-state-city";

const useAstroStore = create((set) => ({
  // Initial states
  countries: Country.getAllCountries(),
  states: [],
  cities: [],
  selectedCountry: "",
  selectedState: "",
  selectedCity: "",
  lat: 40.7128, // Default: New York
  lon: -74.006, // Default: New York
  date: "1990-01-01",
  time: "12:00",
  responseData: null,
  error: null,
  loading: false,

  // Actions
  setSelectedCountry: (country) => {
    set(() => ({
      selectedCountry: country,
      states: State.getStatesOfCountry(country.isoCode), // Fetch states by country code
      cities: [], // Reset cities
      selectedState: null,
      selectedCity: null,
      lat: country.latitude,
      lon: country.longitude,
    }));
  },

  setSelectedState: (selectedState) => {
    set((state) => ({
      selectedState: selectedState,
      cities: City.getCitiesOfState(
        state.selectedCountry.isoCode,
        selectedState.isoCode
      ), // Fetch cities by country and state code
      selectedCity: null,
      lat: selectedState.latitude,
      lon: selectedState.longitude,
    }));
  },

  setSelectedCity: (city) => {
    set({
      selectedCity: city,
      lat: city.latitude,
      lon: city.longitude,
    });
  },

  setDate: (date) => set({ date }),
  setTime: (time) => set({ time }),
  setResponseData: (data) => set({ responseData: data }),
  setError: (error) => set({ error }),
  setLoading: (loading) => set({ loading }),
}));

export default useAstroStore;
