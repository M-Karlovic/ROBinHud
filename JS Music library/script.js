"use strict";
// Varijable inicijalizacija
const searchVal = document.getElementById("searchInput");
const displayRes = document.getElementById("results");
const loader = document.getElementById("loader");
const searchErr = document.getElementById("searchErr");

// Kod koji radi mali delay kako nebi pretraživalo svako slovo koje korisnik utipka neko "pričeka"
searchVal.addEventListener("input", searchLibrary);

async function searchLibrary() {
  const urlsrc = searchVal.value.trim();
  if (!urlsrc) return clearRes();

  try {
    const response = await fetch(
      `https://itunes.apple.com/search?term=${encodeURIComponent(urlsrc)}&entity=song`
    );

    const data = await response.json();

    if (data.resultCount === 0) {
      searchErr.style.display = "block";
      displayRes.innerHTML = "";
    } else {
      displayResults(data.results);
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

function displayResults(results) {
  displayRes.innerHTML = results
    .map(
      (result) => `
        <div class="track-item">
        <div><img src="${result.artworkUrl60}" alt="${result.trackName} cover img"/></div>
            <ul><li>Artist -<span> ${result.artistName}</span></li>
           <li>Song name -  ${result.trackName}</li></ul>
        </div>
    `
    )
    .join("");
}

function clearRes() {
  displayRes.innerHTML = "";
  searchErr.style.display = "none";
}
