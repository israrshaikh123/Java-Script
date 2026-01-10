const totalCasesEl = document.getElementById("totalCases");
const activeCasesEl = document.getElementById("activeCases");
const recoveredCasesEl = document.getElementById("recoveredCases");
const deathCasesEl = document.getElementById("deathCases");
const lastUpdatedEl = document.getElementById("lastUpdated");
const dashboardEl = document.querySelector(".dashboard");
const totalHospitalsEl = document.getElementById("totalHospitals");
const totalBedsEl = document.getElementById("totalBeds");

const API_URL = "https://api.rootnet.in/covid19-in/stats/latest";

async function fetchCovidData() {
  try {
    dashboardEl.style.display = "none";

    const response = await fetch(API_URL);
    const result = await response.json();

    const summary = result.data.summary;

    const total = summary.total;
    const recovered = summary.discharged;
    const deaths = summary.deaths;
    const active = total - recovered - deaths;

    totalCasesEl.innerText = total.toLocaleString();
    activeCasesEl.innerText = active.toLocaleString();
    recoveredCasesEl.innerText = recovered.toLocaleString();
    deathCasesEl.innerText = deaths.toLocaleString();

    lastUpdatedEl.innerText = result.lastRefreshed;
  } catch (error) {
    console.error("Error fetching COVID data:", error);
    lastUpdatedEl.innerText = "Unable to fetch data";
  } finally {
    dashboardEl.style.display = "grid";
  }
}
async function fetchHospitalData() {
  try {
    const response = await fetch(
      "https://api.rootnet.in/covid19-in/hospitals/beds"
    );
    const result = await response.json();

    const summary = result.data.summary;

    totalHospitalsEl.innerText = summary.totalHospitals.toLocaleString();
    totalBedsEl.innerText = summary.totalBeds.toLocaleString();
  } catch (error) {
    console.error("Error fetching hospital data:", error);
    totalHospitalsEl.innerText = "N/A";
    totalBedsEl.innerText = "N/A";
  }
}

fetchCovidData();
fetchHospitalData();
