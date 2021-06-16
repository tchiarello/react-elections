import React from "react";
import Select from "./Select";
import GeneralInfo from "./GeneralInfo";
import CandidateCard from "./CandidateCard";

export default function Main() {
  const [selectedCityId, setSelectedCityId] = React.useState("");
  const [cities, setCities] = React.useState([]);
  const [candidates, setCandidates] = React.useState([]);
  const [election, setElection] = React.useState([]);

  React.useEffect(() => {
    async function getData() {
      const cities = fetch(`http://localhost:3001/cities`);
      const candidates = fetch(`http://localhost:3001/candidates`);
      const election = fetch(`http://localhost:3001/election`);

      const [
        citiesResponse,
        candidatesResponse,
        electionResponse,
      ] = await Promise.all([cities, candidates, election]);

      const [citiesJson, candidatesJson, electionJson] = await Promise.all([
        citiesResponse.json(),
        candidatesResponse.json(),
        electionResponse.json(),
      ]);

      setCities(citiesJson);
      setCandidates(candidatesJson);
      setElection(electionJson);
      setSelectedCityId(citiesJson[0].id);
    }

    getData();
  }, []);

  const handleChangeCities = (event) => {
    const city = event.target.value;
    setSelectedCityId(city);
  };

  const currentCity = cities.find((city) => city.id === selectedCityId);

  const eligibleCandidates = election
    .filter((session) => session.cityId === selectedCityId)
    .sort((a, b) => b.votes - a.votes)
    .map((session) => session.candidateId)
    .map((candidateId) =>
      candidates.find((candidate) => candidate.id === candidateId)
    );

  return (
    <div className="container mx-auto p-4">
      {currentCity && (
        <div>
          <Select
            selectedCityId={selectedCityId}
            cities={cities}
            onChangeCities={handleChangeCities}
          />

          <GeneralInfo
            currentCity={currentCity}
            eligibleCandidates={eligibleCandidates}
          />

          <div className="flex flex-wrap justify-center">
            {eligibleCandidates.map((candidate, index) => {
              const { votes } = election.find(
                (session) =>
                  session.candidateId === candidate.id &&
                  session.cityId === currentCity.id
              );

              const isElected = index === 0;

              const percentage = (votes * 100) / currentCity.presence;

              return (
                <CandidateCard
                  key={index}
                  votes={votes}
                  isElected={isElected}
                  candidate={candidate}
                  percentage={percentage}
                />
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
