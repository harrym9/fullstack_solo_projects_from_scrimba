let homeScore = 0;
let guestScore = 0;

let homeScoreEl = document.getElementById("home-score");
let guestScoreEl = document.getElementById("guest-score");

function addPointToHome(point) {
  homeScore += point;
  homeScoreEl.innerText = homeScore;
}

function addPointToGuest(point) {
  guestScore += point;
  guestScoreEl.innerText = guestScore;
}

function resetPoints(point) {
  homeScore = 0
  guestScore = 0

  homeScoreEl.innerText = 0;
  guestScoreEl.innerText = 0;
}