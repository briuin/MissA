import { create } from "zustand";
import { Country, State, City } from "country-state-city";

const CountryType = Country.getAllCountries()[0];
type CountryType = typeof CountryType;
const StateType = State.getStatesOfCountry("")[0];
type StateType = typeof StateType;
const CityType = City.getCitiesOfState("", "")[0];
type CityType = typeof CityType;

const useAstroStore = create((set: any) => ({
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
  setSelectedCountry: (country: CountryType) => {
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

  setSelectedState: (selectedState: StateType) => {
    set((state: any) => ({
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

  setSelectedCity: (city: CityType) => {
    set({
      selectedCity: city,
      lat: city.latitude,
      lon: city.longitude,
    });
  },

  setDate: (date: string) => set({ date }),
  setTime: (time: string) => set({ time }),
  setResponseData: (data: any) => set({ responseData: data }),
  setError: (error: string | null) => set({ error }),
  setLoading: (loading: boolean) => set({ loading }),
}));

export default useAstroStore;
