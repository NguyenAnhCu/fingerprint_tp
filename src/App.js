import React, { useEffect, useState } from "react";
import "./App.css";
import DataTable from "./dataTable";
import { cleanData, getFingerprint } from "./utils";
import { Helmet } from "react-helmet";

function App() {
  const [fingerprint, setFingerprint] = useState(null);
  const [ipData, setIpData] = useState(null);
  const [showReport, setShowReport] = useState(true);

  useEffect(() => {
    if (showReport) {
      fetch("https://extreme-ip-lookup.com/json")
        .then(res => res.json())
        .then(ip => Promise.all([ip, getFingerprint()]))
        .then(([ip, finger]) => {
          let f = finger
            .map(({ key, value }) => ({ [key]: value }))
            .reduce((acc, curr) => ({
              ...acc,
              ...curr
            }));
          console.log(ip)
          console.log(f)
          f = cleanData(f);
          ip = cleanData(ip);

          setFingerprint(f);
          setIpData(ip);
          setShowReport(false);
        });
    }
  }, [showReport]);

  return (
    <div>
      <Helmet>
        <title>Empreinte digitale et adresse MAC </title>
        <meta
          name="description"
          content="Petite React app à collecter l'empreinte digitale et addresse IP metadata"
        />
        <meta
          name="keywords"
          cpntent="fingerprint,ip-address,tracker,react,privacy"
        />
      </Helmet>
      <header>
        <section>
          <h1>
              Empreinte digitale et adresse MAC Tracker
          </h1>
          <p>
              Ce projet est à l'objectif d'éducation.
          </p>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/NguyenAnhCu/fingerprint_tp"
          >
            Le code sur GitHub
          </a>
        </section>
      </header>
      {ipData && fingerprint ? (
        <div>
          <DataTable title="IP Données" data={ipData} />
          <DataTable title="Empreinte Digital" data={fingerprint} />
        </div>
      ) : (
          <section>
            <h2>Please wait...</h2>
          </section>
        )}
      <footer>
        <p>
          Créé pour{" "}
            <b>TP de PRM</b>
        </p>
      </footer>
    </div>
  );
}

export default App;
