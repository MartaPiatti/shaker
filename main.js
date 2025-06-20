const startScreen = document.getElementById("start-screen");
const sketchContainer = document.getElementById("sketch-container");
const endScreen = document.getElementById("end-screen");
const jouleValue = document.getElementById("joule-value");
const applianceImg = document.getElementById("appliance-img");
const applicanceMessage = document.getElementById("appliance-message");
const desktopWarning = document.getElementById("desktop-warning");

function isMobile() {
  return /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent);
}

// Mostra warning se non sei su mobile
window.onload = () => {
  if (!isMobile()) {
    console.log("Non sei su mobile, mostra il warning");
    desktopWarning.style.display = "flex";
    startScreen.style.display = "none";
  }
};

function startExperience() {
  startScreen.style.display = "none";
  sketchContainer.style.display = "block";

  if (typeof DeviceMotionEvent !== "undefined" && typeof DeviceMotionEvent.requestPermission === "function") {
    DeviceMotionEvent.requestPermission()
      .then((response) => {
        if (response === "granted") {
          startGame();
        } else {
          alert("Permesso negato.");
        }
      })
      .catch(console.error);
  } else {
    startGame();
  }
}

function startGame() {
  timer = 20;
  joules = 0;
  batteryFill = 0;
  totalShake = 0;
  // Inizializza il timer
  timerInterval = setInterval(() => {
    if (timer > 0) {
      timer--;
    } else {
      clearInterval(timerInterval);
    }
  }, 1000);
  loop();
}

function endGame() {
  sketchContainer.style.display = "none";
  endScreen.style.display = "flex";
  clearInterval(timerInterval);
  noLoop();

  //cambia il valore di joules nell'elemento HTML
  jouleValue.textContent = joules;
  applianceImg.style.opacity = "1";

  // Mostra l'immagine dell'elettrodomestico in base ai joules
  if (joules >= lampValue) {
    applianceImg.src = "assets/lampada.png";
    applicanceMessage.textContent = "abbastanza per accendere una lampada per 20 secondi!";
  }
  if (joules >= fanValue) {
    applianceImg.src = "assets/ventilatore.png";
    applicanceMessage.textContent = "abbastanza per accendere un ventilatore per 20 secondi!";
  }
  if (joules >= modemValue) {
    applianceImg.src = "assets/modem.png";
    applicanceMessage.textContent = "abbastanza per accendere un modem per 10 secondi!";
  }
  if (joules >= pcValue) {
    applianceImg.src = "assets/pc.png";
    applicanceMessage.textContent = "abbastanza per accendere un PC per 10 secondi!";
  }

  if (joules >= microwaveValue) {
    applianceImg.src = "assets/microonde.png";
    applicanceMessage.textContent = "abbastanza per accendere un microonde per 0,5 secondi!";
  }
  if (joules >= hairdryerValue) {
    applianceImg.src = "assets/phon.png";
    applicanceMessage.textContent = "abbastanza per accendere un phon per 0,4 secondi!";
  }

  if (joules < lampValue) {
    applianceImg.src = "assets/lampada.png"; // Immagine di default se non si raggiunge nessun valore
    applianceImg.style.opacity = "0.5";
    applicanceMessage.textContent = "Non abbastanza nemmeno per accendere una lampada per 10 secondi.";
  }
}

function restartExperience() {
  document.getElementById("end-screen").style.display = "none";
  document.getElementById("start-screen").style.display = "flex";
}

// function showEndScreen() {
//   document.getElementById("sketch-container").style.display = "none";
//   document.getElementById("end-screen").style.display = "block";
// }
