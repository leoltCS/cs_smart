// Blynk API Token
const BLYNK_TOKEN = 'S0VtFsLDY9YFPVu-2StyyliF1vOgeRFQ';

// Slider for Kitchen Light
const slider = document.querySelector(".brightness-slider");
const sliderFill = document.querySelector(".slider-fill");
const valueDisplay = document.querySelector(".widget-value");
slider.addEventListener("input", function () {
  const value = parseFloat(this.value);
  sliderFill.style.width = value + "%";
  valueDisplay.textContent = value + "%";
});

// Slider for Living Room Light
const sliderLivingRoom = document.querySelector(".brightness-sliderLivingRom");
const valueLivingRoom = document.querySelector(".widget-valueLivingRoom");
const sliderFillLivingRoom = document.querySelector(".slider-fill-livingRoom");
sliderLivingRoom.addEventListener("input", function () {
  const value = parseFloat(this.value);
  sliderFillLivingRoom.style.width = value + "%";
  valueLivingRoom.textContent = value + "%";
});

// 
// Widget Bed Light 0
const widget0 = document.querySelector(".bedLight-widget:nth-child(1) .light-icon");
const status0 = document.querySelector(".bedLight-widget:nth-child(1) .status");
let isOn0 = false;

// Widget Bed Light 1
const widget1 = document.querySelector(".bedLight-widget:nth-child(2) .light-icon");
const status1 = document.querySelector(".bedLight-widget:nth-child(2) .status");
let isOn1 = false;

// Function to update light UI
function updateLightUI(widget, status, isOn) {
  if (isOn) {
    widget.classList.add("active");
    status.textContent = "ON";
  } else {
    widget.classList.remove("active");
    status.textContent = "OFF";
  }
}

// Function to read state from Blynk
async function readState() {
  try {
    // Read state of light 0
    const response0 = await fetch(`https://sgp1.blynk.cloud/external/api/get?token=${BLYNK_TOKEN}&v0`);
    const value0 = await response0.text();
    const newState0 = value0 === "1";
    if (newState0 !== isOn0) {
      isOn0 = newState0;
      updateLightUI(widget0, status0, isOn0);
    }

    // Read state of light 1
    const response1 = await fetch(`https://sgp1.blynk.cloud/external/api/get?token=${BLYNK_TOKEN}&v1`);
    const value1 = await response1.text();
    const newState1 = value1 === "1";
    if (newState1 !== isOn1) {
      isOn1 = newState1;
      updateLightUI(widget1, status1, isOn1);
    }
  } catch (error) {
    console.error('Error reading state:', error);
  }
}

// Function to start polling
function startPolling() {
  // Initial read
  readState();
  // Poll every 1 second
  setInterval(readState, 1000);
}

// Start polling when page loads
document.addEventListener('DOMContentLoaded', startPolling);

// Light 0 click handlers
widget0.addEventListener("click", () => {
  isOn0 = !isOn0;
  updateLightUI(widget0, status0, isOn0);
  fetch(`https://sgp1.blynk.cloud/external/api/update?token=${BLYNK_TOKEN}&v0=${isOn0 ? "1" : "0"}`);
});

status0.addEventListener("click", () => {
  isOn0 = !isOn0;
  updateLightUI(widget0, status0, isOn0);
  fetch(`https://sgp1.blynk.cloud/external/api/update?token=${BLYNK_TOKEN}&v0=${isOn0 ? "1" : "0"}`);
});

// Light 1 click handlers
widget1.addEventListener("click", () => {
  isOn1 = !isOn1;
  updateLightUI(widget1, status1, isOn1);
  fetch(`https://sgp1.blynk.cloud/external/api/update?token=${BLYNK_TOKEN}&v1=${isOn1 ? "1" : "0"}`);
});

status1.addEventListener("click", () => {
  isOn1 = !isOn1;
  updateLightUI(widget1, status1, isOn1);
  fetch(`https://sgp1.blynk.cloud/external/api/update?token=${BLYNK_TOKEN}&v1=${isOn1 ? "1" : "0"}`);
});

