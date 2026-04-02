// Your script here.
// Set initial text
msg.text = document.querySelector('[name="text"]').value;

// 🔊 Speak function
function speak() {
  if (!msg.text.trim()) return; // prevent empty input

  window.speechSynthesis.cancel(); // stop previous speech
  window.speechSynthesis.speak(msg);
}

// 🛑 Stop function
function stop() {
  window.speechSynthesis.cancel();
}

// 🎤 Load voices
function populateVoices() {
  voices = window.speechSynthesis.getVoices();

  if (!voices.length) {
    voicesDropdown.innerHTML = `<option>No voices available</option>`;
    return;
  }

  voicesDropdown.innerHTML = voices
    .map(voice => `<option value="${voice.name}">${voice.name} (${voice.lang})</option>`)
    .join('');
}

// 🎯 Set selected voice
function setVoice() {
  msg.voice = voices.find(voice => voice.name === this.value);
  speak(); // restart with new voice
}

// ⚙️ Handle rate & pitch
function setOption() {
  msg[this.name] = this.value;
  speak(); // apply changes immediately
}

// ✏️ Update text dynamically
function setText() {
  msg.text = this.value;
}

// EVENTS
window.speechSynthesis.addEventListener("voiceschanged", populateVoices);

voicesDropdown.addEventListener("change", setVoice);

options.forEach(option => option.addEventListener("change", setOption));

document.querySelector('[name="text"]').addEventListener("input", setText);

speakButton.addEventListener("click", speak);

stopButton.addEventListener("click", stop);