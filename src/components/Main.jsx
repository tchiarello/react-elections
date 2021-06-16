import React from "react";

const intl = new Intl.NumberFormat(undefined, { maximumFractionDigits: 2 });

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
    <div>
      <div className="container mx-auto p-4">
        <div>
          <h4>Choose a City</h4>
          <select value={selectedCityId} onChange={handleChangeCities}>
            {cities.map((city, index) => (
              <option value={city.id} key={index}>
                {city.name}
              </option>
            ))}
          </select>
        </div>

        {currentCity && (
          <div>
            <div>
              <h2>Election at {currentCity.name}</h2>
              <div>
                <p>
                  Voting Population: {intl.format(currentCity.votingPopulation)}
                </p>
                <p>Absence: {intl.format(currentCity.absence)}</p>
                <p>Presence: {intl.format(currentCity.presence)}</p>
              </div>
            </div>

            <div className="divide-y-4 divide-yellow-600 divide-solid">
              <p>{eligibleCandidates.length} Candidates</p>
            </div>

            <div>
              <div className="divide-y-4 divide-yellow-600 divide-solid">
                {eligibleCandidates.map((candidate, index) => {
                  const { votes } = election.find(
                    (session) =>
                      session.candidateId === candidate.id &&
                      session.cityId === selectedCityId
                  );

                  const percentage = (votes * 100) / currentCity.presence;

                  const isElected = index === 0;

                  return (
                    <div key={index}>
                      {/* <img src={`/img/${candidate.username}.png`} height="20" alt="" /> */}

                      <p>{intl.format(percentage)}%</p>
                      <span>{intl.format(votes)} votes</span>

                      <p>{candidate.name}</p>
                      <p>{isElected ? "Elected" : "Not Elected"}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
