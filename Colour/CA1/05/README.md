# Creative Coding Year 4 - Colour
## Part 5 - Adding Colour

[Go back to CA!](../) or [See the sketch in action!](sketch.html)

Now we are going to try adding the different colour harmonyies set out by https://www.creativeboom.com/resources/essential-colour-guide-for-designers-understanding-colour-theory/

 User Controls (keyPressed):
*  1 = Default
2. 2 = Complementary
3. 3 = Analogue
4. 4 = Triad
5. 5 = Compound
6. 6 = Shades
7. 7 = RandomHue
8. 8 = RandomSaturation
9. 9 = RandomBrightness
0. 0 = RandomEverything

Firstly I have updated the sketch so that the process will be more effecient and I've added more user interactivity.

Below are the changes made before setup() runs.
```javascript
//Creating variables so we can control the sun with the mouse, or have it run through a day cycle by default
var sunY = 0;
var sunCycle = false;

//colour state for when we save the document
var colourState = "Default";

//creating colour variables, so we can change colour of any of the elements and save and export the colours a .ase
var skyH = 210, skyS = 55, skyB = 90;
var sunH = 37, sunS = 57, sunB = 99;
var cloudH = 198, cloudS = 4, cloudB = 91;
```

Now the updated draw function, here I have made it so the sun will follow the mouse if the user wants it to, or the user can opt to have the sun move from the current position to the bottom of the canvas. This will allow the user to create daylight cycles. The sun is now also proportionate to the canvas's size.

```javascript
function draw() {
  randomSeed(rS);
  var mY = constrain(mouseY, 0, height);

  //daylight cycle, the sun's y pos is incrementally increased if the user does not want mouse movement
  if(sunCycle === false) {
    sunY = mY;
  } else {
    sunY += 5;
  }

  //if the sun is trying to move off the screen it won't.
  if(sunY > height) {
    sunY = height;
  }

  //we have changed this slightly, so the sun is proportionate to the screensize.
  if(sunY < height/2) {
    var sunR = height/9 + sunY/3;
  } else {
    var sunR = height/9 + height/3 - sunY/3;
  }

  if(sunY < height/2) {
    background(skyH, skyS, skyB + (sunY/20) - cloudCount);
  } else {
    background(skyH, skyS, skyB + ((height)/20) - (sunY/20) - cloudCount);
  }

  //updated to reflect colour variables
  fill(sunH, sunS, sunB);
  ellipse(width/2, sunY, sunR , sunR);

  //updated to reflect colour variables
  fill(cloudH, cloudS, cloudB, 75 + cloudCount/2);
  noStroke();
  generateClouds(cloudCount);
}
```

I have added more randomness, where 10 percent of the times the user clicks no clouds will appear

```javascript
function mouseReleased() {
  rS = int(random(10000));
  //there is now a 10% chance that there will be no clouds at all.
  if (random() <= 0.90) {
    cloudCount= int(random(10, 50));
  } else {
    cloudCount = 0;
  }
  generateClouds();
}
```

Now we change the keyPressed function to allow the user to save the image, save the colours in the image as an adobe swatch file, control the sun's movement and change the colour palette of the canvas.

```javascript
function keyPressed() {
  //save now includes the colour state, and displays the sun's y position instead of mouse y.
  if (key == 's' || key == 'S') saveCanvas(gd.timestamp() + "_ColourState_" + colourState + "_SunY_" + sunY + "_RandomSeed_" + rS + "_CloudCount_" + cloudCount, 'png');
  //creating an adobe swatch file out of the colours the user can currently see.
  if (key == 'c' || key == 'C') {
      var colors = [];
      colors.push(color(skyH, skyS, skyB));
      colors.push(color(sunH, sunS, sunB));
      colors.push(color(cloudH, cloudS, cloudB));
      writeFile([gd.ase.encode(colors)], gd.timestamp(), 'ase');
  }
  //if the user presses m the sun will move in a daylight cycle
  if (key == 'm' || key == 'M') {
    sunCycle = true;
  }
  //if the user presses n the sun will go back to following the mouse
  if (key == 'n' || key == 'N') {
    sunCycle = false;
  }
  //if the user presses r the sun will return to the top, used with the cycles to reset the sun
  if (key == 'r' || key == 'R') {
    sunY = 0;
  }
  //default colour theme
  if (key == '1') {
    skyH = 210, skyS = 55, skyB = 90;
    sunH = 37, sunS = 57, sunB = 99;
    cloudH = 198, cloudS = 4, cloudB = 91;
    rS = int(random(10000));
    colourState = "Default";
  }
  //complementary colour theme
  if (key == '2') {
    skyH = 210, skyS = 55, skyB = 90;
    sunH = 38, sunS = 55, sunB = 90;
    cloudH = 38, cloudS = 55, cloudB = 90;
    rS = int(random(10000));
    colourState = "Complementary";
  }
  //complementary colour theme
  if (key == '3') {
    skyH = 210, skyS = 55, skyB = 90;
    sunH = 38, sunS = 55, sunB = 90;
    cloudH = 38, cloudS = 55, cloudB = 90;
    rS = int(random(10000));
    colourState = "Complementary";
  }
}
```
[See the sketch in action!](sketch.html)
