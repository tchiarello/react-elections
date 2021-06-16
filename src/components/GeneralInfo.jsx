import React from "react";
import { intl } from "../utils";

export default function GeneralInfo({ currentCity, eligibleCandidates }) {
  return (
    <div className="my-8">
      <h2 className="text-center text-lg text-blue-500">
        Election at {currentCity.name}
      </h2>
      <div className="my-4 grid grid-cols-3">
        <p className="font-semibold text-center">
          Voting Population:{" "}
          <span className="text-blue-700">
            {intl.format(currentCity.votingPopulation)}
          </span>
        </p>
        <p className="font-semibold text-center">
          Absence:{" "}
          <span className="text-red-700">
            {intl.format(currentCity.absence)}
          </span>
        </p>
        <p className="font-semibold text-center">
          Presence:{" "}
          <span className="text-green-700">
            {intl.format(currentCity.presence)}
          </span>
        </p>
      </div>

      <div className="font-semibold text-center">
        <p>{eligibleCandidates.length} Candidates</p>
      </div>
    </div>
  );
}
