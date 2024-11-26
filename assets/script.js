// alert("hello");
const song = document.getElementById("song");
const progress = document.getElementById("progress");
const playPauseIcon = document.getElementById("play-icon");
const timer = document.getElementById("timer");

const musicArtist = document.getElementById("music-artist");
const musicTitle = document.getElementById("music-title");
const musicImage = document.getElementById("music-image");

let currentIndex = 0;

function populateDetails(index) {
  const songUpdate = musicData[index];
  musicArtist.textContent = songUpdate.author;
  musicTitle.textContent = songUpdate.title;
  musicImage.src = songUpdate.imageSrc;
  song.src = songUpdate.audioSrc;
}

populateDetails(currentIndex);

const formatTime = (time) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);

  return `${minutes}: ${seconds < 10 ? "0" : ""}${seconds} `;
};

song.onloadedmetadata = function () {
  progress.max = song.duration;
  progress.value = song.currentTime;

  timer.textContent = `${formatTime(0)} - ${formatTime(song.duration)}`;
  song.pause();
};

const handlePlayPause = () => {
  if (playPauseIcon.classList.contains("fa-pause")) {
    song.pause();
    playPauseIcon.classList.remove("fa-pause");
    playPauseIcon.classList.add("fa-play");
  } else {
    song.play();
    playPauseIcon.classList.add("fa-pause");
    playPauseIcon.classList.remove("fa-play");
  }
};

if (song.play()) {
  setInterval(() => {
    progress.value = song.currentTime;
    timer.textContent = `${formatTime(song.currentTime)} - ${formatTime(
      song.duration
    )}`;
  }, 500);
}

progress.onchange = () => {
  song.play();
  song.currentTime = progress.value;
  timer.textContent = `${formatTime(song.currentTime)} - ${formatTime(
    song.duration
  )}`;
};

const handleNext = () => {
  currentIndex = (currentIndex + 1) % musicData.length;
  populateDetails(currentIndex);
  song.play();
};

const handlePrevious = () => {
  currentIndex = (currentIndex - 1 + musicData.length) % musicData.length;
  populateDetails(currentIndex);
  song.play();
};
