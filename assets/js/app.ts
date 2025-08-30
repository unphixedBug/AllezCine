// Test API TMDB
const API_KEY = "5b845545a9348e1b7c3af9675bac67a8";
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

// GET https://api.themoviedb.org/3/discover/movie?api_key=<<API_KEY>>&language=fr-FR&sort_by=release_date.desc&primary_release_date.lte=2025-08-30&page=1&region=FR

async function testAPILastReleases() {
  try {
    const response = await fetch(
      `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=fr-FR&sort_by=release_date.desc&primary_release_date.lte=2025-08-30&page=1&region=FR&vote_count.gte=50`
    );
    const data = await response.json();
    console.log("Last releases:", data.results);
  } catch (error) {
    console.error("Erreur API:", error);
  }
}

// testAPI();
testAPILastReleases();

// menu burger

const hamburgerBtn = document.getElementById("hamburgerBtn");
const closeBtn = document.getElementById("closeBtn");
const mobileMenu = document.getElementById("mobileMenu");

const toggleMobileMenu = () => {
  mobileMenu?.classList.toggle("active");
};

const closeMobileMenu = () => {
  mobileMenu?.classList.remove("active");
};

hamburgerBtn?.addEventListener("click", toggleMobileMenu);
closeBtn?.addEventListener("click", toggleMobileMenu);

// carousel

let currentSlide = 0;
const totalSlides = 3;
let autoPlayInterval: number | null = null;

const carouselSlides = document.querySelector(
  ".carousel-slides"
) as HTMLElement;
const prevBtn = document.getElementById("prevBtn") as HTMLButtonElement;
const nextBtn = document.getElementById("nextBtn") as HTMLButtonElement;
const indicators = document.querySelectorAll(
  ".indicator"
) as NodeListOf<HTMLButtonElement>;

function goToSlide(slideIndex: number) {
  currentSlide = slideIndex;
  const translateValue = -(currentSlide * 33.333);
  carouselSlides.style.transform = `translateX(${translateValue}%)`;

  updateIndicators();
}

function updateIndicators() {
  indicators.forEach((indicator, index) => {
    if (index === currentSlide) {
      indicator.classList.add("active");
    } else {
      indicator.classList.remove("active");
    }
  });
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % totalSlides;
  goToSlide(currentSlide);
}

function prevSlide() {
  currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
  goToSlide(currentSlide);
}

function startAutoPlay() {
  autoPlayInterval = setInterval(nextSlide, 4000);
}

function stopAutoPlay() {
  if (autoPlayInterval) {
    clearInterval(autoPlayInterval);
    autoPlayInterval = null;
  }
}

prevBtn?.addEventListener("click", () => {
  stopAutoPlay();
  prevSlide();
  startAutoPlay();
});

nextBtn?.addEventListener("click", () => {
  stopAutoPlay();
  nextSlide();
  startAutoPlay();
});

indicators.forEach((indicator, index) => {
  indicator.addEventListener("click", () => {
    stopAutoPlay();
    goToSlide(index);
    startAutoPlay();
  });
});

startAutoPlay();
