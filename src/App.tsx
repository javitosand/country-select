import { useState } from "react";
import "./App.css";

type Country = {
  name: string;
  isSelected: boolean;
};

const countries: Country[] = [
  { name: "India", isSelected: false },
  { name: "USA", isSelected: false },
  { name: "France", isSelected: false },
];

const useCountrySelect = (initialState: Country[]) => {
  const [countryState, setCountryState] = useState<Country[]>(initialState);

  const areAllSelected = countryState.every((c) => c.isSelected);

  const handleCountrySelect = (country: Country) => {
    setCountryState((currentState) =>
      currentState.map((c) =>
        c.name === country.name ? { ...country, isSelected: !c.isSelected } : c
      )
    );
  };

  const selectAll = (select: boolean) => {
    setCountryState(countryState.map((c) => ({ ...c, isSelected: select })));
  };

  return { countryState, selectAll, handleCountrySelect, areAllSelected };
};

const App = () => {
  const { countryState, areAllSelected, handleCountrySelect, selectAll } =
    useCountrySelect(countries);

  return (
    <div className="App">
      <div className="container">
        <h2>Select Countries</h2>
        <label>
          <input
            className="select-all"
            type="checkbox"
            checked={areAllSelected}
            onChange={(e) => selectAll(e.target.checked)}
          />
          Select All
        </label>
        <ul>
          {countryState.map((country) => (
            <li key={country.name}>
              <label>
                <input
                  type="checkbox"
                  checked={country.isSelected}
                  onChange={() => handleCountrySelect(country)}
                />
                {country.name}
              </label>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
