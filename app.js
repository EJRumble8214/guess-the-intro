const songs = [
  { file: "song1.mp3", answer: "Let It Go – Frozen" },
  { file: "song2.mp3", answer: "You've Got a Friend in Me – Toy Story" },
  { file: "song3.mp3", answer: "Circle of Life – The Lion King" }
];

let shuffledSongs = [];
let currentIndex = 0;

function shuffleSongs() {
  shuffledSongs = [...songs];
  for (let i = shuffledSongs.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledSongs[i], shuffledSongs[j]] = [shuffledSongs[j], shuffledSongs[i]];
  }
  currentIndex = 0;
}

function getNextSong() {
  if (shuffledSongs.length === 0 || currentIndex >= shuffledSongs.length) {
    shuffleSongs();
  }
  const song = shuffledSongs[currentIndex];
  currentIndex++;
  return song;
}

// DOM references
const startBtn = document.getElementById("startBtn");
const gameScreen = document.getElementById("gameScreen");
const audio = document.getElementById("audio");
const replayBtn = document.getElementById("replayBtn");
const revealBtn = document.getElementById("revealBtn");
const answerP = document.getElementById("answer");
const homeBtn = document.getElementById("homeBtn");

let currentSong = null;

// On first load, shuffle the list
shuffleSongs();

startBtn.onclick = () => {
  startBtn.style.display = "none";
  gameScreen.style.display = "block";
  currentSong = getNextSong();
  audio.src = currentSong.file;
  audio.play();
  answerP.textContent = "";
};

replayBtn.onclick = () => {
  audio.currentTime = 0;
  audio.play();
};

revealBtn.onclick = () => {
  answerP.textContent = currentSong.answer;
};

homeBtn.onclick = () => {
  gameScreen.style.display = "none";
  startBtn.style.display = "inline-block";
};


homeBtn.onclick = () => {
  gameScreen.style.display = "none";
  startBtn.style.display = "inline-block";
};
