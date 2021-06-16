import React from "react";
import { intl } from "../utils";

export default function CandidateCard({
  votes,
  candidate,
  percentage,
  isElected,
}) {
  const electedClassName = isElected ? "text-green-700" : "text-red-700";

  return (
    <div className="shadow-xl p-4 mx-8 my-8 rounded-lg">
      <div className="flex justify-around items-center mb-12">
        <img
          src={`/img/${candidate.username}.png`}
          alt="Candidate Profile"
          className="w-20 rounded-full"
        />
        <div className="text-center ml-5">
          <p className={`font-bold ${electedClassName}`}>
            {intl.format(percentage)}%
          </p>
          <span className="text-sm">{intl.format(votes)} votes</span>
        </div>
      </div>

      <div className="text-center">
        <p className="text-center font-bold">{candidate.name}</p>
        <p className={electedClassName}>
          {isElected ? "Elected" : "Not Elected"}
        </p>
      </div>
    </div>
  );
}
