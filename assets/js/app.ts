// Test API TMDB
const API_KEY = "2675ecd6162fb76a00f28ae363d0cc63";
const BASE_URL = "https://api.themoviedb.org/3";

async function testAPI() {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=fr-FR`
    );
    const data = await response.json();
    console.log("Films populaires:", data.results);
  } catch (error) {
    console.error("Erreur API:", error);
  }
}

testAPI();
