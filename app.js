// Array to hold the uploaded file objects
let songFiles = [];
let currentFile = null;

// Grab HTML elements
const songUpload = document.getElementById("songUpload");
const gameControls = document.getElementById("gameControls");
const playBtn = document.getElementById("playBtn");
const revealBtn = document.getElementById("revealBtn");
const audioPlayer = document.getElementById("audioPlayer");
const answerDisplay = document.getElementById("answerDisplay");

// Listen for when the user selects files
songUpload.addEventListener("change", (event) => {
    // Convert the file list into a standard JavaScript array
    songFiles = Array.from(event.target.files);

    if (songFiles.length > 0) {
        // Show the play/reveal buttons once files are loaded
        gameControls.style.display = "block";
        answerDisplay.innerText = `✅ Loaded ${songFiles.length} songs successfully! Click play to start.`;
    } else {
        gameControls.style.display = "none";
        answerDisplay.innerText = "";
    }
});

// Function to play a random song from the uploaded pool
playBtn.addEventListener("click", () => {
    if (songFiles.length === 0) return;

    // Clear previous answer text
    answerDisplay.innerText = "🎶 Playing track... Can you guess it?";

    // Pick a random file object
    const randomIndex = Math.floor(Math.random() * songFiles.length);
    currentFile = songFiles[randomIndex];

    // Create a temporary local URL for the audio file so the browser can play it
    const fileURL = URL.createObjectURL(currentFile);
    audioPlayer.src = fileURL;
    
    // Play the full audio clip
    audioPlayer.play();

    // Toggle button states
    revealBtn.disabled = false;
    playBtn.disabled = true;
});

// Function to reveal the song name based on the filename
revealBtn.addEventListener("click", () => {
    if (!currentFile) return;

    // Strip the file extension (.mp3, .wav, etc.) to get a clean title
    const cleanTitle = currentFile.name.replace(/\.[^/.]+$/, "");

    // Display the answer
    answerDisplay.innerText = `🎉 ANSWER: ${cleanTitle} 🎉`;

    // Reset buttons for the next round
    revealBtn.disabled = true;
    playBtn.disabled = false;
});
