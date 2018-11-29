'use strict';

//adding in variables for the font and words
var font = 'Open Sans';
var word = 'DESIGN GENERATIVE ';

//variable for randomness of the angle the letters are rotated by
var rAngle = 0;

var rS = 0;

var sunY = 0;
var sunCycle = false;

var colourState = "Default";

var skyH = 210, skyS = 55, skyB = 90;
var sunH = 37, sunS = 57, sunB = 99;
//letter HSB
var lH = 198, lS = 4, lB = 91;

function setup() {
  createCanvas(480, 680);
  colorMode(HSB, 360, 100, 100, 100);

  //making text open sans
  textFont(font);
  //draw text from center
  textAlign(CENTER, CENTER);

  //change angle mode to degrees
  angleMode(DEGREES);

  //create a random angle, this is used so when we click we can change the angle
  randomAngle();
}

function draw() {
  randomSeed(rS);
  var mY = constrain(mouseY, 0, height);
  //var for letter size, will be based on sun's position
  var letterS;

  if(sunCycle === false) {
    sunY = mY;
  } else {
    sunY += 5;
  }

  if(sunY > height) {
    sunY = height;
  }

  if(sunY < height/2) {
    var sunR = height/9 + sunY/3;
    background(skyH, skyS, skyB + (sunY/20));
    //letter size changes depending on sun's position, biggest in the middle
    letterS = int(map(sunY, 0, height, 10, 80));
  } else {
    var sunR = height/9 + height/3 - sunY/3;
    background(skyH, skyS, skyB + ((height)/20) - (sunY/20));
    //letter size changes depending on sun's position, biggest in the middle
    letterS = int(map(sunY, 0, height, 80, 10));
  }

  fill(sunH, sunS, sunB, 100);
  noStroke();
	ellipse(width/2, sunY, sunR , sunR);

  //creating a loop to draw each letter
  for(var angle = 0; angle <= 360; angle += (360/word.length)) {
    //the x distance of the letter is, half the canvas + cos of the angle times half the sun's radius(plus a little bit to move it a bit off the sun)
    var vX = width/2 + cos(angle) * (sunR + (sunR/4))/2;
    //the y distance of the letter is, sun's position + sin of the angle times half the sun's radius(plus a little bit to move it a bit off the sun)
    var vY = sunY + sin(angle) * (sunR + (sunR/4)) /2;

    //letter is the current angle around the sun we are drawing at.(so letter 3 would be 3*(360/word.length)
    var letter = map(angle, 0, 360, 0, word.length);

    //using random to make the letters start at random positions
    var letterPosChance = random();
    //25% chance that letter will be somewhere to the left and above the sun
    if(letterPosChance < 0.25) {
      var dX = int(random(0, -200));
      var dY = int(random(0, 200));
    }
    //25% chance that letter will be somewhere to the right and below the sun
    else if(letterPosChance < 0.50) {
      var dX = int(random(0, 200));
      var dY = int(random(0, -200));
    }
    //25% chance that letter will be somewhere to the right and above the sun
    else if(letterPosChance < 0.75){
      var dX = int(random(0, 200));
      var dY = int(random(0, 200));
    }
    //25% chance that letter will be somewhere to the left and below the sun
    else {
      var dX = int(random(0, -200));
      var dY = int(random(0, -200));
    }

    //mapping the randoms so they are 0 when the sun is in the middle of the canvas, so that they line the sun when height is half of the canvas
    var mapDX;
    var mapDY;
    var mapRA;

    //if/else statement to confirm above
    if(sunY < height/2) {
      mapDX = int(map(sunY, 0, height/2, dX, 0));
      mapDY = int(map(sunY, 0, height/2, dY, 0));
      mapRA = int(map(sunY, 0, height/2, rAngle, 0));
    } else {
      mapDX = int(map(sunY, height/2, height, 0, -dX));
      mapDY = int(map(sunY, height/2, height, 0, -dY));
      mapRA = int(map(sunY, height/2, height, 0, -rAngle));
    }

    //text size is depending on the sun's position which we changed earlier in draw function
    textSize(letterS);
    //fill is letter HSB
    fill(lH, lS, lB);
    //making sure there are no errors by making sure letter we are on is not greater than the length of the word string
    if(letter < word.length) {
      //push pop to change angle without affecting whole sketch
      push();
      //translate to position the letter should be at + randomness
      translate(vX + mapDX, vY + mapDY);
      //rotate, 90 so it will be perpindicular to the sun, + angle we are at(0 if height/2), + random angle(0 if height/2)
      rotate(90  + angle + mapRA);
      //draw letter at 0,0
      text(word[letter], 0, 0);
      //return back to normal sketch
      pop();
    }
  }
}

//if click create new random angle for letters
function mouseReleased() {
  rS = int(random(10000));
  randomAngle();
}

//random angle is between 0 and 360(full circle)
function randomAngle() {
  rAngle = int(random(0,360));
}

function keyPressed() {
  if (key == 's' || key == 'S') saveCanvas(gd.timestamp() + "_ColourState_" + colourState + "_SunY_" + sunY + "_RandomSeed_" + rS, 'png');
  if (key == 'c' || key == 'C') {
      var colors = [];
      colors.push(color(skyH, skyS, skyB));
      writeFile([gd.ase.encode(colors)], gd.timestamp(), 'ase');
  }
  if (key == 'm' || key == 'M') {
    sunCycle = true;
  }
  if (key == 'n' || key == 'N') {
    sunCycle = false;
  }
  if (key == 'r' || key == 'R') {
    sunY = 0;
  }
  if (key == '1') {
    skyH = 210, skyS = 55, skyB = 90;
    sunH = 37, sunS = 57, sunB = 99;
    lH = 194, lS = 4, lB = 91;
    colourState = "Default";
  }
}
