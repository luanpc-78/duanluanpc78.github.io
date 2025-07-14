// piano.js
function initPiano() {
  const pianoKeys = document.querySelectorAll(".piano-keys .key"),
        volumeSlider = document.querySelector(".volume-slider input"),
        keysCheckbox = document.querySelector(".keys-checkbox input");

  let allKeys = [], audio = new Audio(`tunes/a.wav`);

  const playTune = (key) => {
    const audioFile = key === ';' ? '_' : key;
    audio.src = `tunes/${audioFile}.wav`;
    audio.play();
    const clickedKey = document.querySelector(`[data-key="${key}"]`);
    clickedKey?.classList.add("active");
    setTimeout(() => clickedKey?.classList.remove("active"), 150);
  }

  pianoKeys.forEach(key => {
    allKeys.push(key.dataset.key);
    key.addEventListener("click", () => playTune(key.dataset.key));
  });

  volumeSlider?.addEventListener("input", (e) => audio.volume = e.target.value);
  keysCheckbox?.addEventListener("click", () => {
    pianoKeys.forEach(key => key.classList.toggle("hide"));
  });

  document.addEventListener("keydown", (e) => {
    if (allKeys.includes(e.key)) playTune(e.key);
  });
}

export { initPiano };
