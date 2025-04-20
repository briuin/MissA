import React from "react";
import { Box, Select } from "grommet";
import { Country, State, City } from "country-state-city";

const CountryType = Country.getAllCountries()[0];
type CountryType = typeof CountryType;
const StateType = State.getStatesOfCountry("")[0];
type StateType = typeof StateType;
const CityType = City.getCitiesOfState("", "")[0];
type CityType = typeof CityType;

interface CountryStateCitySelectorProps {
  countries: CountryType[];
  states: StateType[];
  cities: CityType[];
  selectedCountry: CountryType | null;
  selectedState: StateType | null;
  selectedCity: CityType | null;
  setSelectedCountry: (country: CountryType | null) => void;
  setSelectedState: (state: StateType | null) => void;
  setSelectedCity: (city: CityType | null) => void;
}

const CountryStateCitySelector: React.FC<CountryStateCitySelectorProps> = ({
  countries,
  states,
  cities,
  selectedCountry,
  selectedState,
  selectedCity,
  setSelectedCountry,
  setSelectedState,
  setSelectedCity,
}) => {
  return (
    <Box direction="column" gap="small" pad="small">
      {/* Country Selector */}
      <Select
        options={countries.map((c: CountryType) => c.name)}
        value={selectedCountry?.name || ""}
        placeholder="Select Country"
        onChange={({ option }) => {
          const country = countries.find((c: CountryType) => c.name === option) || null;
          setSelectedCountry(country);
        }}
      />

      {/* State Selector */}
      <Select
        options={states.map((s: StateType) => s.name)}
        value={selectedState?.name || ""}
        placeholder="Select State"
        onChange={({ option }) => {
          const state = states.find((s: StateType) => s.name === option) || null;
          setSelectedState(state);
        }}
        disabled={!selectedCountry}
      />

      {/* City Selector */}
      <Select
        options={cities.map((c: CityType) => c.name)}
        value={selectedCity?.name || ""}
        placeholder="Select City"
        onChange={({ option }) => {
          const city = cities.find((c: CityType) => c.name === option) || null;
          setSelectedCity(city);
        }}
        disabled={!selectedState}
      />
    </Box>
  );
};

export default CountryStateCitySelector;
