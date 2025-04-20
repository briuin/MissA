import React from "react";
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
    <div className="flex flex-col gap-2 w-full">
      {/* Country Selector */}
      <select
        className="select select-bordered w-full"
        value={selectedCountry?.name || ""}
        onChange={e => {
          const country = countries.find((c: CountryType) => c.name === e.target.value) || null;
          setSelectedCountry(country);
        }}
      >
        <option value="" disabled>Select Country</option>
        {countries.map((c: CountryType) => (
          <option key={c.isoCode} value={c.name}>{c.name}</option>
        ))}
      </select>

      {/* State Selector */}
      <select
        className="select select-bordered w-full"
        value={selectedState?.name || ""}
        onChange={e => {
          const state = states.find((s: StateType) => s.name === e.target.value) || null;
          setSelectedState(state);
        }}
        disabled={!selectedCountry}
      >
        <option value="" disabled>Select State</option>
        {states.map((s: StateType) => (
          <option key={s.isoCode} value={s.name}>{s.name}</option>
        ))}
      </select>

      {/* City Selector */}
      <select
        className="select select-bordered w-full"
        value={selectedCity?.name || ""}
        onChange={e => {
          const city = cities.find((c: CityType) => c.name === e.target.value) || null;
          setSelectedCity(city);
        }}
        disabled={!selectedState}
      >
        <option value="" disabled>Select City</option>
        {cities.map((c: CityType) => (
          <option key={c.name} value={c.name}>{c.name}</option>
        ))}
      </select>
    </div>
  );
};

export default CountryStateCitySelector;
