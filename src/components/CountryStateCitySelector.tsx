import React from "react";
import { Box, Select } from "grommet";

const CountryStateCitySelector = ({
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
        options={countries.map((c) => c.name)} // Map countries to their names
        value={selectedCountry?.name || ""} // Show selected country's name
        placeholder="Select Country"
        onChange={({ option }) => {
          const country = countries.find((c) => c.name === option);
          setSelectedCountry(country); // Pass the full country object
        }}
      />

      {/* State Selector */}
      <Select
        options={states.map((s) => s.name)} // Map states to their names
        value={selectedState?.name || ""} // Show selected state's name
        placeholder="Select State"
        onChange={({ option }) => {
          const state = states.find((s) => s.name === option);
          setSelectedState(state); // Pass the full state object
        }}
        disabled={!selectedCountry} // Disable if no country selected
      />

      {/* City Selector */}
      <Select
        options={cities.map((c) => c.name)} // Map cities to their names
        value={selectedCity?.name || ""} // Show selected city's name
        placeholder="Select City"
        onChange={({ option }) => {
          const city = cities.find((c) => c.name === option);
          setSelectedCity(city); // Pass the full city object
        }}
        disabled={!selectedState} // Disable if no state selected
      />
    </Box>
  );
};

export default CountryStateCitySelector;
