let pixelD = 5;
let fontSize = 200;
let textImg;
let gradientColor;

let circleRadius = 5;
let CRSlider;

let circleFill = true;
let FCBox;

let textTyped = "ABC";
let TextBox;

let gradient;

function preload() {
  gradient = loadImage("data/gradient.png");
}

function setup() {
  let canvas = createCanvas(730, 600);
  canvas.parent("canvasHolder");

  gradient.loadPixels();

  CRSlider = createSlider(1, 20, circleRadius);
  CRSlider.parent("CRSlider");
  CRSlider.input(update);

  FCBox = createCheckbox('', true);
  FCBox.parent("FCBox");
  FCBox.changed(update);

  TextBox = createInput(textTyped);
  TextBox.parent("TextBox");
  TextBox.input(update);
}

function draw() {
  background(255);

  setupText();

  for(let x = 0; x < textImg.width; x += pixelD) {
    for(let y = 0; y < textImg.height; y += pixelD) {

      let index = (x + y * textImg.width) * 4;

      let r = textImg.pixels[index];

      let gR = gradient.pixels[index];
      let gG = gradient.pixels[index+1];
      let gB = gradient.pixels[index+2];
      gradientColor = color(gR, gG, gB);

      if(r <= 128) {
        if(circleFill) {
          fill(gradientColor);
          noStroke();
          ellipse(x, y, circleRadius, circleRadius);
        } else {
          noFill();
          stroke(gradientColor);
          ellipse(x, y, circleRadius, circleRadius);
        }
     }

    }
  }
}

function setupText() {
  textImg = createGraphics(width, height);

  textImg.pixelDensity(1);
  textImg.background(255);
  textImg.fill(0);
  textImg.textSize(fontSize);
  textImg.textAlign(CENTER);
  textImg.textFont("Oswald");
  textImg.text(textTyped, width/2, height/2);

  textImg.loadPixels();
}

function update() {
  circleRadius = CRSlider.value();

  if (FCBox.checked()) {
    circleFill = true;
  } else {
    circleFill = false;
  }

  textTyped = TextBox.value();
}
