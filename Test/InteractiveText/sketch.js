let textImg, font, gradient, pointRed, pointGreen, pointBlue, pointAlpha, previousLength;
let SizeSlider, DensitySlider, FontSizeSlider, PointColorBox, PointColorDrop, ShapeDrop, TextBox, NoiseBox;
let linesXAxis = [];
let linesYAxis = [];
let pointColBox = true;
let useNoise = false;
let useRotate = false;
let noiseAmount = 0;
let shapeToDraw = "X Lines";
let pointRadius = 14;
let pointColorType = "Bright";
let pixelD = 15;
let fontSize = 600;
let textTyped = "W";
let pointsLength = 0;
let animationLerp = 0;
let runAnimationBool = false;
let animationDiff = 0;
let noiseAmountX = 0;
let noiseAmountY = 0;
let rotation = 0;

//preload the gradient, and font.
function preload() {
  gradient = loadImage("data/gradient.png");
  font = loadFont("data/Roboto-Medium.ttf");
}

//setup the canvas and the user interface elements on the canvas
function setup() {
  let canvas = createCanvas(730, 600);
  canvas.parent("canvasHolder");
  background(45, 52, 54);
  angleMode(DEGREES);

  //load pixels of the gradient, setup  the text, then create the points using the text
  gradient.loadPixels();
  setupText();
  createPoints();

  SizeSlider = createSlider(1, 14, pointRadius);
  SizeSlider.parent("ShapeSizeSlider");
  SizeSlider.class("form-control");
  SizeSlider.input(update);

  DensitySlider = createSlider(5, 15, 18 - pixelD);
  DensitySlider.parent("DensitySlider");
  DensitySlider.class("form-control");
  DensitySlider.input(update);

  FontSizeSlider = createSlider(200, 700, fontSize);
  FontSizeSlider.parent("FontSizeSlider");
  FontSizeSlider.class("form-control");
  FontSizeSlider.input(update);

  ShapeDrop = createSelect();
  ShapeDrop.parent("ShapeDrop");
  ShapeDrop.class("form-control");
  ShapeDrop.option("X Lines");
  ShapeDrop.option("Y Lines");
  ShapeDrop.changed(update);

  PointColorBox = createCheckbox('', false);
  PointColorBox.parent("PointColorBox");
  PointColorBox.class("form-check-input");
  PointColorBox.changed(update);

  PointColorDrop = createSelect();
  PointColorDrop.parent("PointColorDrop");
  PointColorDrop.class("form-control");
  PointColorDrop.option("Bright");
  PointColorDrop.option("Dark");
  PointColorDrop.option("Red");
  PointColorDrop.option("Green");
  PointColorDrop.option("Blue");
  PointColorDrop.option("Random");
  PointColorDrop.changed(update);

  TextBox = createInput(textTyped);
  TextBox.parent("TextBox");
  TextBox.class("form-control");
  TextBox.input(update);

  RunAnimation = createButton("Start");
  RunAnimation.parent("RunAnimation");
  RunAnimation.class("form-control btn-primary");
  RunAnimation.mousePressed(runA);

  NoiseBox = createCheckbox('', false);
  NoiseBox.parent("NoiseBox");
  NoiseBox.class("form-check-input");
  NoiseBox.changed(update);

  RotateBox = createCheckbox('', false);
  RotateBox.parent("RotateBox");
  RotateBox.class("form-check-input");
  RotateBox.changed(update);
}

function draw() {
  //draw background with lower alpha to have gliding effect
  background(45, 52, 54, 75);

  //if the user is using noise we add to the noise amount variable, and map a x and y value,
  //the mapping allows the user to control how much the lines are effected by the noise
  if(useNoise) {
    noiseAmount += 1/10;
    noiseAmountX = map(mouseX, 0, width, 0, 5);
    noiseAmountY = map(mouseY, 0, height, 0, 5);
  }

  //the rotation is based on how far the mouse is moved across the canvas
  if(useRotate) {
    rotation = map(mouseX + mouseY, 0, width + height, 0, 12);
  }

  //if the user runs the animation
  if(runAnimationBool) {
    //increase animationLerp, to move the animation along
    animationLerp += 1/300;
    //if animationLerp is equal to or greater than 1, the animation is over, reset the variables
    if(animationLerp >= 1) {
      runAnimationBool = false;
      noiseAmountX = 0;
      noiseAmountY = 0;
      animationDiff = 0;
    }
  }

  //if the user wants to draw the wines on the x axis
  if(shapeToDraw === "X Lines") {
    //loop through the elements in the linesXAxis array
    for(var i = 0; i < linesXAxis.length; i++) {
      //create the x1,y1,x2,y2 locations of the line we will be drawing
      let x1 = linesXAxis[i].x1Pos;
      let y1 = linesXAxis[i].y1Pos;
      let x2 = linesXAxis[i].x2Pos;
      let y2 = linesXAxis[i].y2Pos;

      //calculate distance from top to middle of line
      let xDiff = (x1 - x2) / 2;
      let yDiff = (y1 - y2) / 2;

      //find the center point of the line
      let lineX = x1 - xDiff;
      let lineY = y1 - yDiff;

      //noise is equal to 0 if the user is not using it
      let xNoise = 0;
      let yNoise = 0;

      //if the user wants to use noise, we want it to be equal to
      //where the line is based, the amount of noise, and multiply it by how much noise the line was randomly given
      //and multiply it by where the mouse is on the x or y axis, so the noise can be 0 if the mouse is at 0,0
      if(useNoise) {
        xNoise = noise(lineX + noiseAmount) * (linesXAxis[i].xFrac * noiseAmountX);
        yNoise = noise(lineY + noiseAmount) * (linesXAxis[i].yFrac * noiseAmountY);
      }

      //set the stroke, strokeWeight and noFill  for the line
      stroke(linesXAxis[i].point1Color);
      strokeWeight(pointRadius);
      noFill();

      //pusht o create new drawing instance
      push();

      //translate to herethe line will be placed
      //noise is 0 if not in use.
      translate(lineX + xNoise, lineY + yNoise);

      //if the user wants to rotate  the  lines, set the  rotation
      if(useRotate) {
        rotate(linesXAxis[i].rot * rotation);
      }

      //if the user is running the animation
      if(runAnimationBool) {

        //how far alongt he animation is from 0 to  1.
        //we map this to 0 to height to go across the whole canvas
        //this will draw each line from top to bottom
        animationDiff = map(animationLerp, 0, 1, 0, height);

        //if the animation difference is greater than wheret he line begins
        //and is less then wheret he line ends we want to draw the line
        if(animationDiff > y1 && animationDiff < y2) {
          //the line is drawn from the top, to the bottom,
          //the bottom is how far the animation has gotten on the canvas,
          //this accounts for wheret the middle of the line currently is
          line(xDiff, yDiff, -xDiff, animationDiff - y2 - yDiff);
        }
        //else draw the line normally, if the animation is running, and the line has already
        //gone throught he animation cycle
        else if(animationDiff > y2) {

          line(xDiff, yDiff, -xDiff, -yDiff);

        }
      }
      //if the animation is not running, draw the line normally
      else {
        line(xDiff, yDiff, -xDiff, -yDiff);
      }

      //return  the drawing state to normal
      pop();
    }
  }

  //same as the above x lines, just working horizontally, where we draw from left to right
  if(shapeToDraw === "Y Lines") {
    for(var i = 0; i < linesYAxis.length; i++) {
      let x1 = linesYAxis[i].x1Pos;
      let y1 = linesYAxis[i].y1Pos;
      let x2 = linesYAxis[i].x2Pos;
      let y2 = linesYAxis[i].y2Pos;

      let xDiff = (x1 - x2) / 2;
      let yDiff = (y1 - y2) / 2;

      let lineX = x1 - xDiff;
      let lineY = y1 - yDiff;

      let xNoise = 0;
      let yNoise = 0;
      if(useNoise) {
        xNoise = noise(lineX + noiseAmount) * (linesYAxis[i].xFrac * noiseAmountX);
        yNoise = noise(lineY + noiseAmount) * (linesYAxis[i].yFrac * noiseAmountY);
      }

      stroke(linesYAxis[i].point1Color);
      strokeWeight(pointRadius);
      noFill();

      push();
      translate(lineX + xNoise, lineY + yNoise);
      if(useRotate) {
        rotate(linesYAxis[i].rot * rotation);
      }

      if(runAnimationBool) {
        animationDiff = map(animationLerp, 0, 1, 0, width);
        if(animationDiff > x1 && animationDiff < x2) {
          line(xDiff, yDiff, animationDiff - x2 - xDiff , -yDiff);
        } else if(animationDiff > x2) {
          line(xDiff, yDiff, -xDiff, -yDiff);
        }
      } else {
        line(xDiff, yDiff, -xDiff, -yDiff);
      }
      pop();
    }
  }
}

//setup the text image that is used to create text shapes
function setupText() {
  textImg = createGraphics(width, height);
  textImg.pixelDensity(1);
  textImg.background(255);
  textImg.fill(0);
  textImg.textSize(fontSize);
  textImg.textAlign(CENTER, CENTER);
  textImg.textFont("Roboto");
  textImg.text(textTyped, width/2 , (3*height)/5);
  textImg.loadPixels();
}

//create points is used to sort through the text image, and find where the text is one the canvas,
//we dont draw the text, however we find where it would be drawn on the canvas, and replace this with points
//instead of points i am drawing lines
function createPoints() {
  //when we recreate the points, clear the arrays
  linesXAxis = [];
  linesYAxis = [];

  //if the user wants to draw lines on the x axis
  if(shapeToDraw === "X Lines") {
    //loop through the width of the image, increasing by pixelDensity, which allows us to increase
    //or decrease the amount of lines being drawn to represent the text
    for(let x = 0; x < textImg.width; x += pixelD) {

      //here we are creating the variables to create lines on the current x co-ordinate
      let lineBegin = false;
      //each line on the same x co-ordinate will have the same colour
      let lineColPicked = false;
      let lineX1, lineY1, lineX2, lineY2;

      //now we loop through the y to find where any text is present
      for(let y = 0; y < textImg.height; y += pixelD) {

        //index is equal to the red value of the current pixel
        let index = (y * textImg.width + x) * 4;
        //r stores the red value
        let r = textImg.pixels[index];

        //of the does not want to use a colour style, we use the gradient that was loaded in earlier
        if(!pointColBox) {
          pointRed = gradient.pixels[index];
          pointGreen = gradient.pixels[index+1];
          pointBlue = gradient.pixels[index+2];
          pointAlpha = 255;
        }
        //if the user does want to use a colour we create a new colour for each point
        else {
          createAColor();
        }

        //the colour for the point is made into a p5 color object
        pointColor = color(pointRed, pointGreen, pointBlue, pointAlpha);

        //if the red value is greater than 128, which means there should be text drawn at this co-ordinate
        //we want to create a line here
        if(r <= 128) {

          //if a line has not been started yet, we want to start drawing a line
          if(!lineBegin) {
            //the x1, y1 values will be the current x and y
            lineX1 = x;
            lineY1 = y;

            //if a line has not been drawn yet on this x value, we keep the colour created
            //any lines created after this will use the same colour
            //this means if there are more than one line present for an x co-ordinate the colour will be the same
            if(!lineColPicked) {
              lineColPicked = true;
              lineCol1 = pointColor;
            }
            //we change the lineBegin bool to true, as we began a line
            lineBegin = true;
          }

        } else {

          //else if there is no point at the current position
          // and a line has began we want to end the line at the last point
            if(lineBegin) {
              //a line has no longer begun as we are ending one
              lineBegin = false;
              //the x is the current x
              lineX2 = x;
              //the y is the last y we were at, as the current point would not have text in it
              lineY2 = y - pixelD;
              //the colour is equal to the value we got earlier
              lineCol2 = pointColor;

              //how we want to randomize some extra variables each line will have
              let rand = random();
              //when the user activates noise, each line will move plus or minus 5 in the x and y
              //this is randomized so each line moves in a different way
              let xDisplacement = 5;
              let yDisplacement = 5;
              //we then create a random amount each line will rotate,
              //this is multiplied later by the mouse's position to allow the user to control the
              //levels of rotation
              let rotateAmount = floor(random(-5,5));

              //using the above rand variable we are moving the x and y variables to negative or positive
              if(rand < 0.25) {
                xDisplacement *= 1;
                yDisplacement *= 1;
              } else if (rand < 0.5) {
                xDisplacement *= -1;
                yDisplacement *= 1;
              } else if (rand < 0.5) {
                xDisplacement *= 1;
                yDisplacement *= -1;
              } else {
                xDisplacement *= -1;
                yDisplacement *= -1;
              }

              //we then push a line object to our array to be drawn later
              linesXAxis.push({
                x1Pos: lineX1,
                y1Pos: lineY1,
                point1Color: lineCol1,
                x2Pos: lineX2,
                y2Pos: lineY2,
                xFrac: xDisplacement,
                yFrac: yDisplacement,
                rot: rotateAmount
              });

          }
        }
      }
    }
  }

  //the same as the above x lines just on the opposite axes
  if(shapeToDraw === "Y Lines") {

    for(let y = 0; y < textImg. height; y += pixelD) {

      let lineBegin = false;
      let lineColPicked = false;
      let lineX1, lineY1, lineX2, lineY2;

      for(let x = 0; x < textImg.width; x += pixelD) {

        let index = (y * textImg.width + x) * 4;
        let r = textImg.pixels[index];

        if(!pointColBox) {
          pointRed = gradient.pixels[index];
          pointGreen = gradient.pixels[index+1];
          pointBlue = gradient.pixels[index+2];
          pointAlpha = 255;
        } else {
          createAColor();
        }

        pointColor = color(pointRed, pointGreen, pointBlue, pointAlpha);

        if(r <= 128) {

          if(!lineBegin) {
            lineX1 = x;
            lineY1 = y;
            if(!lineColPicked) {
              lineCol1 = pointColor;
              lineColPicked = true;
            }
            lineBegin = true;
          }

        } else {

            if(lineBegin) {
              lineBegin = false;
              lineX2 = x - pixelD;
              lineY2 = y;

              let rand = random();
              let xDisplacement = 5;
              let yDisplacement = 5;
              let rotateAmount = floor(random(-5,5));

              if(rand < 0.25) {
                xDisplacement *= 1;
                yDisplacement *= 1;
              } else if (rand < 0.5) {
                xDisplacement *= -1;
                yDisplacement *= 1;
              } else if (rand < 0.5) {
                xDisplacement *= 1;
                yDisplacement *= -1;
              } else {
                xDisplacement *= -1;
                yDisplacement *= -1;
              }

              linesYAxis.push({
                x1Pos: lineX1,
                y1Pos: lineY1,
                point1Color: lineCol1,
                x2Pos: lineX2,
                y2Pos: lineY2,
                xFrac: xDisplacement,
                yFrac: yDisplacement,
                rot: rotateAmount
              });
          }

        }
      }
    }
  }
}

//if the user wants to create colours we have some set random pallettes each point will pick from
//they are all random in some way, just skewed towards the name given to them
//the dark palletes have lower random values, the bright pallete has higher values, etc
function createAColor() {
  if(pointColBox) {
    if (pointColorType === "Dark") {
      pointRed = floor(random(10, 105));
      pointGreen = floor(random(10, 105));
      pointBlue = floor(random(10, 105));
      pointAlpha = floor(random(150, 255));
    } else if (pointColorType === "Bright") {
      pointRed = floor(random(105, 210));
      pointGreen = floor(random(105, 210));
      pointBlue = floor(random(105, 210));
      pointAlpha = floor(random(200, 255));
    } else if (pointColorType === "Random") {
      pointRed = floor(random(0, 255));
      pointGreen = floor(random(0, 255));
      pointBlue = floor(random(0, 255));
      pointAlpha = floor(random(0, 255));
    } else if (pointColorType === "Red") {
      pointRed = floor(random(150, 255));
      pointGreen = floor(random(20, 50));
      pointBlue = floor(random(20, 50));
      pointAlpha = floor(random(150, 255));
    } else if (pointColorType === "Green") {
      pointRed = floor(random(20, 50));
      pointGreen = floor(random(150, 200));
      pointBlue = floor(random(20, 50));
      pointAlpha = floor(random(150, 255));
    } else if (pointColorType === "Blue") {
      pointRed = floor(random(20, 50));
      pointGreen = floor(random(20, 50));
      pointBlue = floor(random(150, 255));
      pointAlpha = floor(random(150, 255));
    }
  }
}

//if the user runs the animation, we reset the current lerp to 0 and make the bool true
function runA() {
  animationLerp = 0;
  runAnimationBool = true;
}

//if the user has changed any values in the control panel we trigger the update function
function update() {
  //we set the variables equal to the slider value, so if any slider is changed the value will be updated
  pointRadius = SizeSlider.value();
  pixelD =  20 - DensitySlider.value();
  fontSize = FontSizeSlider.value();
  textTyped = TextBox.value();
  pointColorType = PointColorDrop.value();
  shapeToDraw = ShapeDrop.value();

  //then we check set the values of the checkbox to update them appropriately
  if (PointColorBox.checked()) {
    pointColBox = true;
  } else {
    pointColBox = false;
  }
  if (NoiseBox.checked()) {
    useNoise = true;
  } else {
    useNoise = false;
  }
  if (RotateBox.checked()) {
    useRotate = true;
  } else {
    useRotate = false;
  }

  //next we resetup the text, incase values were changed which effect it
  setupText();
  //now we recreate the points to redraw the lines, accounting for any updated variables
  createPoints();
}
