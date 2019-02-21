//setting up variables that are used throughout
let textImg, gradientColor, gradient, runAnimation, gR, gG, gB, jR, jG, jB, jA, initialX, initialY, jX, jY;
let CRSlider, ACSlider, FSSlider, TextBox, ABox;
let endCircles, initialCircles, jittercircles1, jitterCircles2 = [];
let circleRadius = 5;
let pixelD = 5;
let fontSize = 250;
let circleFill = true;
let textTyped = "ABC";
let counter = 1;
let lerpAmount = 0;
let jitter = false;
let jitterCol = false;
let selectedJitterCol = "Bright";
let lerpJitter = 0.25;

//preloading the gradient image and the font that will be used
function preload() {
  gradient = loadImage("data/gradient.png");
  font = loadFont("data/Roboto-Medium.ttf");
}

//setting up the canvas, text, creating circles and the user controls on the html page
function setup() {
  let canvas = createCanvas(730, 600);
  background(223, 230, 233);
  canvas.parent("canvasHolder");
  gradient.loadPixels();
  setupText();
  createCircles();
  CRSlider = createSlider(2, 20, circleRadius);
  CRSlider.parent("CRSlider");
  CRSlider.input(update);
  ACSlider = createSlider(5, 17, 20 - pixelD);
  ACSlider.parent("ACSlider");
  ACSlider.input(update);
  FSSlider = createSlider(150, 350, fontSize);
  FSSlider.parent("FSSlider");
  FSSlider.input(update);
  FCBox = createCheckbox('', true);
  FCBox.parent("FCBox");
  FCBox.changed(update);
  JBox = createCheckbox('', false);
  JBox.parent("JBox");
  JBox.changed(update);
  JCBox = createCheckbox('', false);
  JCBox.parent("JCBox");
  JCBox.changed(update);
  JCDrop = createSelect();
  JCDrop.parent("JCDrop");
  JCDrop.option("Bright");
  JCDrop.option("Dark");
  JCDrop.option("Red");
  JCDrop.option("Green");
  JCDrop.option("Blue");
  JCDrop.option("Random");
  JCDrop.changed(update);
  TextBox = createInput(textTyped);
  TextBox.parent("TextBox");
  TextBox.input(update);
  ABox = createButton("Run");
  ABox.parent("ABox");
  ABox.mousePressed(runA);
}

function draw() {
  //draw background that gives the circles the trail, by setting the alpha value
  background(223, 230, 233, 50);
  //if runAnimation is true, we want the circles to fly onto the canvas
  if(runAnimation) {
    //if the circles have reach the middle we want to set the values back to how they were before we started the animation
    if(lerpAmount > 1) {
      runAnimation = false;
      lerpJitter = 0.25;
      ABox.show();
    }
    //else we want to run the animation again until the animation finishes
    else {
      //increase lerp amount by a set amout so the circles move the same each frame
      lerpAmount = counter/180;
      //increasing counter, increases the lerpAmount variable, which when it hits 1 the animation will finish, takes 3 seconds to complete the animation at 60fps
      counter += 1;
      //loop to draw the circles
      for(var i = 0; i < initialCircles.length; i++) {
        //set colour function to set the colour of the circles
        setColour(initialCircles[i].gColor);
        //lerpX, and lerpY, are the positions the circles are currently at, while moving through the lerp from the initial position to the end position
        let lX = lerp(initialCircles[i].xPos, endCircles[i].xPos, lerpAmount);
        let lY = lerp(initialCircles[i].yPos, endCircles[i].yPos, lerpAmount);
        ellipse(lX, lY, circleRadius, circleRadius);

      }
    }
  }
  //else if the animation is not running
  else {
    //if the lerp jitter is in the middle we want to slow the value being added to it, to make the circles stop to see their structure clearly
    if((lerpJitter > 0.745 && lerpJitter < 0.755) || (lerpJitter > 0.245 && lerpJitter < 0.255)) {
      lerpJitter += 1/4800;
    }
    //else if the circles are not near where they are it is not jittering move faster
    else {
      lerpJitter += 1/120;
    }
    //loop to draw the circles
    for(var i = 0; i < endCircles.length; i++) {
      //set the colours
      setColour(endCircles[i].gColor);
      //set the x and y values
      let x = endCircles[i].xPos;
      let y = endCircles[i].yPos;
      //if the user has selected the jitter effect
      if(jitter) {
        //if lerpJitter is creater than or equal to one, we want to reset it to 0
        if(lerpJitter >= 1) {
          lerpJitter = 0;
        }
        //if lerpJitter is greater than .5 we want it to go from 1 to 0
        if(lerpJitter > 0.5) {
          lJ = map(lerpJitter, .5, 1, 1, 0);
        }
        //else we want lerpJitter to go from 0 to 1, by having this if/else we create the loop where the circles move back and forth between jitter position 1 and 2.
        else {
          lJ = map(lerpJitter, 0, 0.5, 0, 1);
        }
        //x and y are equal to the jitter position lerped
        x = lerp(jitterCircles1[i].xPos, jitterCircles2[i].xPos, lJ);
        y = lerp(jitterCircles1[i].yPos, jitterCircles2[i].yPos, lJ);
      }
      //draw the circles
      ellipse(x, y, circleRadius, circleRadius);
    }
  }
}

//setup the text so that we can load the pixels, and find the positions where we want to draw circles
function setupText() {
  textImg = createGraphics(width, height);
  textImg.pixelDensity(1);
  textImg.background(255);
  textImg.fill(0);
  textImg.textSize(fontSize);
  textImg.textAlign(CENTER);
  textImg.textFont("Roboto");
  textImg.text(textTyped, width/2, 2*height/3);
  textImg.loadPixels();
}

//create circles, function to generate the arrays which hold the circles
function createCircles() {
  //reset each array, to empty them
  endCircles = [];
  initialCircles = [];
  jitterCircles1 = [];
  jitterCircles2 = [];

  //for each pixel on the x and y axes
  for(let x = 0; x < textImg.width; x += pixelD) {
    for(let y = 0; y < textImg.height; y += pixelD) {

      //finding the r value for each pixel of the text drawn
      let index = (y * textImg.width + x) * 4;
      let r = textImg.pixels[index];

      //setting rand = a number between 0 and 1
      let rand = random();
      //if the above random is less than 0.25, or 1 quarter of the time we want to run this so circles appear roughly equally around the canvas
      if (rand < 0.25) {
        //the co-ords are down to the left
        jX = floor(random(-10, -50));
        jY = floor(random(-10, -50));
        initialX = x + random(-1000, -500);
        initialY = y + random(-1000, -500);
      } else if (rand < 0.5) {
        //the co-ords are up to the right
        jX = floor(random(10, 50));
        jY = floor(random(10, 50));
        initialX = x + random(1000, 500);
        initialY = y + random(1000, 500);
      } else if (rand < 0.75) {
        //the co-rds are down to the right
        jX = floor(random(10, 50));
        jY = floor(random(-10, -50));
        initialX = x + random(1000, 500);
        initialY = y + random(-1000, -500);
      } else {
        //the co-ords are up to the left
        jX = floor(random(-10, -50));
        jY = floor(random(10, 50));
        initialX = x + random(-1000, -500);
        initialY = y + random(1000, 500);
      }
      //setting up the colour themes by setting different random RGBA values for each circle being drawn
      if (selectedJitterCol === "Dark") {
        jR = floor(random(0, map(x + jX, 0, width + jX, 50, 255)));
        jG = floor(random(0, map(y + jY, 0, height + jY, 50, 255)));
        jB = floor(random(0, map(x + jX + y + jY, 0, width + jX + height + jY, 50, 255)));
        jA = floor(random(150, 255));
      } else if (selectedJitterCol === "Bright") {
        jR = floor(random(0, map(jX, 0, jX, 50, 255)));
        jG = floor(random(0, map(jY, 0, jY, 50, 255)));
        jB = floor(random(0, map(jX + jY, 0, jX + jY, 50, 255)));
        jA = floor(random(150, 255));
      } else if (selectedJitterCol === "Random") {
        jR = floor(random(0, 255));
        jG = floor(random(0, 255));
        jB = floor(random(0, 255));
        jA = floor(random(0, 255));
      } else if (selectedJitterCol === "Red") {
        jR = floor(random(150, 255));
        jG = floor(random(20, 50));
        jB = floor(random(20, 50));
        jA = floor(random(150, 255));
      } else if (selectedJitterCol === "Green") {
        jR = floor(random(20, 50));
        jG = floor(random(150, 200));
        jB = floor(random(20, 50));
        jA = floor(random(150, 255));
      } else if (selectedJitterCol === "Blue") {
        jR = floor(random(20, 50));
        jG = floor(random(20, 50));
        jB = floor(random(150, 255));
        jA = floor(random(150, 255));
      }
      //set the RGB = to the imported gradient
      gR = gradient.pixels[index];
      gG = gradient.pixels[index+1];
      gB = gradient.pixels[index+2];

      //if the user has selected a colour set then we set the colour equal to that set
      if (jitterCol) {
        gradientColor = color(jR, jG, jB, jA);
      }
      //if the user did not select a colour set we set the colour to the gradient colour
      else {
        gradientColor = color(gR, gG, gB, 255);
      }
      //where text appears we want to add circles to the arrays. This will allow us to create arrays full of circles which when drawn to the canvas simulate text
      if(r <= 128) {
        endCircles.push({xPos: x, yPos: y, gColor: gradientColor});
        initialCircles.push({xPos: initialX, yPos: initialY, gColor: gradientColor});
        jitterCircles1.push({xPos: x + jX, yPos: y + jY, gColor: gradientColor});
        jitterCircles2.push({xPos: x - jX, yPos: y - jY, gColor: gradientColor});
      }
    }
  }
}

//sets the colour profile needed for the circle being drawn
function setColour(col) {
  if (circleFill) {
    noStroke();
    fill(col);
  } else {
    noFill();
    stroke(col);
  }
}

//runs the animation
function runA() {
  runAnimation = true;
  lerpAmount = 0;
  counter = 1;
  ABox.hide();
}

//if the user updates any of the control panel we want to update the circles
function update() {
  //if the sliders change, we change the value of the variable to equal the slider
  circleRadius = CRSlider.value();
  pixelD =  20 - ACSlider.value();
  fontSize = FSSlider.value();
  //the text is equal to the text in the box, this will update on each entry to the box
  textTyped = TextBox.value();
  //this checks the drop down menu, if the user selects a new palette
  selectedJitterCol = JCDrop.value();
  //checking each of the checkboxes have been checked by the user, if they have we set the value to true for the boolean releated to each checkbox
  if (FCBox.checked()) {
    circleFill = true;
  } else {
    circleFill = false;
  }
  if (JBox.checked()) {
    jitter = true;
  } else {
    jitter = false;
  }
  if (JCBox.checked()) {
    jitterCol = true;
  } else {
    jitterCol = false;
  }
  //we need to resetup the text and create the circles to conform with the changed variables
  setupText();
  createCircles();
}
