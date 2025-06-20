//timer
let timer = 20;
let timerInterval;

//sake
let shakeStrength = 0;
let totalShake = 0;

//dimensioni batteria
const batteryWidth = 150;
const batteryHeight = 300;
let batteryX = 0;
let batteryY = 0;

const batteryPadding = 12;
const batteryGap = 3;
const batteryLevels = 15;
const batteryLevelHeight = (batteryHeight - batteryPadding * 2 - batteryGap * (batteryLevels - 1)) / batteryLevels;
let batteryFill = 0;
let joules = 0;

//appliances
let lampImg, microwaveImg, hairdryerImg;
const lampValue = 100;
const fanValue = 200;
const modemValue = 300;
const pcValue = 400;
const microwaveValue = 500;
const hairdryerValue = 600;

function preload() {
  lampImg = loadImage("assets/lampada.png");
  fanImg = loadImage("assets/ventilatore.png");
  modemImg = loadImage("assets/modem.png");
  pcImg = loadImage("assets/pc.png");
  microwaveImg = loadImage("assets/microonde.png");
  hairdryerImg = loadImage("assets/phon.png");

  logoImg = loadImage("assets/logo.png");
}
function setup() {
  textFont("satoshi");
  //noLoop();
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("sketch-container");
  textAlign(CENTER, CENTER);

  //setta posizione batteria
  batteryX = width / 2 - batteryWidth / 2;
  batteryY = height - batteryHeight - 50;
}

function draw() {
  background("#ff8f2c");

  // piazza timer
  textSize(32);
  fill(255);
  noStroke();
  text(timer + "s", width / 2, 25);

  //registra shake
  if (frameCount % 4 === 0) {
    totalShake += shakeStrength;
    shakeStrength = 0;
    joules = Math.round(map(totalShake, 0, 30000, 0, 350));
    batteryFill = int(joules / 7);
    //batteryFill = min(batteryLevels, int(joules / 5));
  }

  //inserisce elettrodomestico
  let appliance;
  if (joules >= hairdryerValue) appliance = hairdryerImg;
  else if (joules >= microwaveValue) appliance = microwaveImg;
  else if (joules >= pcValue) appliance = pcImg;
  else if (joules >= modemValue) appliance = modemImg;
  else if (joules >= fanValue) appliance = fanImg;
  else if (joules >= lampValue) appliance = lampImg;

  if (appliance) {
    imageMode(CENTER);
    let maxWidth = 200;
    let scale = maxWidth / appliance.width;
    image(appliance, width / 2, 150, appliance.width * scale, appliance.height * scale);
  }

  //disegna batteria
  fill(255);
  stroke(0);
  strokeWeight(6);
  rect(width / 2 - 20, batteryY - 15, 40, 30, 10);
  rect(batteryX, batteryY, batteryWidth, batteryHeight, 20);

  noStroke();

  for (let i = 0; i < batteryLevels; i++) {
    let levelY = batteryY + batteryHeight - batteryPadding - (i + 1) * batteryLevelHeight - i * batteryGap;
    if (batteryFill < batteryLevels) {
      fill(i < batteryFill ? "#FFD700" : "#D3D3D3");
    }
    if (batteryFill >= batteryLevels) {
      fill(i + batteryLevels < batteryFill ? "#B9DA49" : "#FFD700");
    }

    if (batteryFill >= batteryLevels * 2) {
      fill(i + batteryLevels * 2 < batteryFill ? "#95D9E5" : "#B9DA49");
    }

    if (batteryFill >= batteryLevels * 3) {
      fill(i + batteryLevels * 3 < batteryFill ? "#FFB3D2" : "#95D9E5");
    }

    if (batteryFill >= batteryLevels * 4) {
      fill(i + batteryLevels * 4 < batteryFill ? "#ACB5F8" : "#FFB3D2");
    }

    rect(batteryX + batteryPadding, levelY, batteryWidth - batteryPadding * 2, batteryLevelHeight, 5);
  }
  textSize(24);
  fill(255);
  text(joules + " Joule", width / 2, height - 25);

  // Controlla se il timer è finito
  if (timer <= 0) {
    endGame();
  }
}

function deviceMoved() {
  shakeStrength = sqrt(sq(accelerationX) + sq(accelerationY) + sq(accelerationZ));
}
