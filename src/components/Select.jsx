import React from "react";

export default function Select({ selectedCityId, cities, onChangeCities }) {
  return (
    <div className="text-center my-4">
      <h4 className="my-3 text-lg font-semibold">Choose a City</h4>
      <select
        value={selectedCityId}
        onChange={onChangeCities}
        className="border-b-2 border-blue-500"
      >
        {cities.map((city, index) => (
          <option value={city.id} key={index}>
            {city.name}
          </option>
        ))}
      </select>
    </div>
  );
}
