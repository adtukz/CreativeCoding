# Creative Coding Year 4 - Colour
## Part 7 - Creating a Book Cover

[Go back to CA!](../) or [See the sketch in action!](sketch.html)

Now we are going to create the book cover by adding a title at the bottom of the page, and filling in the blank space at the back.

First thing to do is create variables to re-colour the letters randomly. To do this we need 2 values for each letter, and then a third variable to store the random version, which will be further explained below.

```javascript

var lH1 = 198, lS1 = 4, lB1 = 91;
var lH2 = 198, lS2 = 4, lB2= 91;
var lHV = 198, lSV = 4, lBV= 91;

```

Now we need to draw the letters around the sun, the letters in the background and the title at the bottom of the book cover.

The letters in the background are randomly placed and rotated, they also have the same colour as the bigger version of the letter.

```javascript
function draw() {
  for(var angle = 0; angle <= 360; angle += (360/word.length)) {
    //adding stroke to around the letters
    strokeWeight(5);
    //stroke is same as background, to outline the letters
    stroke(skyH, skyS, skyB);
    textSize(letterS);
    //run the letter colour function
    letterColour();
    //filling using created variables to have random values
    //the angle is used to have the rainbow effect
    fill(angle, lSV, lBV);
    if(letter < word.length) {
      //same as last 06
      push();
      translate(vX + mapDX, vY + mapDY);
      rotate(90  + angle + mapRA);
      text(word[letter], 0, 0);
      pop();
      //var randomAmountOfLetters, between 150 and 300 letters for the background
      var rAL = int(random(150, 300));
      //loop to draw the random letters
      for(var i = 0; i < rAL; i++){
        //make the text small in the background
        textSize(15);
        //unstroked
        noStroke();
        //same fill as the full sized letters
        fill(angle, lSV, lBV, 10);
        //random x and y positions
        var xPos = int(random(0,width));
        var yPos = int(random(0, height));
        //push, rotate, draw letter, pop
        push();
        rotate(random(0,360));
        text(word[letter], xPos, yPos);
        pop();
      }
    }
    // Stroke Heading at bottom of screen
    strokeWeight(5);
    stroke(skyH, skyS, skyB);
    //fill is rainbow effect as well
    fill(angle, lSV, lBV, 100);
    //making the colour of the big letters match the letters around the sun, as they are drawn in different order
    if(angle < 220) {
      fill(140 + angle, lSV, lBV, 100);
    } else {
      fill(angle - 220, lSV, lBV, 100);
    }
    //Draw GENERATIVE at the bottom of the page
    if(letter < 10){
      textSize(55);
      text(sWord[letter], (width/6) + (letter * 35), (height*3)/4);
    }
    //Draw DESIGN at the bottom of the page
    if(letter > 10 && letter < word.length-1) {
      textSize(55);
      text(sWord[letter], (width/4) + (letter * 38) - (400), (height*3.3)/4);
    }
  }
}
```

This is the function which stores the random colours created for the letters.

```javascript
function letterColour() {
  lHV = int(random(lH1, lH2));
  lSV = int(random(lS1, lS2));
  lBV = int(random(lB1, lB2));
}
```

Now finally the keyPressed() function has changed a bit. Added a pause and unpause to the sun moving down the page.

Then 1,2 and 3 are random colour scheme, 2 the dark theme being the main colour scheme.

```javascript
function keyPressed() {
  if (key == 'm' || key == 'M') {
    sunCycle = true;
  }
  if (key == 'n' || key == 'N') {
    sunCycle = false;
  }
  if (key == 'r' || key == 'R') {
    sunY = 0;
  }
  if (key == 'p' || key == 'P') {
    pauseSun = true;
  }
  if (key == 'u' || key == 'U') {
    pauseSun = false;
  }
  if (key == '1') {
    skyH = 210, skyS = 55, skyB = 90;
    sunH = 37, sunS = 57, sunB = 99;
    lH1 = 194, lS1 = 4, lB1 = 91;
    lH2 = 194, lS2 = 4, lB2 = 91;
    rS = int(random(10000));
    colourState = "Default";
  }
  //A dark theme
  if (key == '2') {
    sunH = 195, sunS = 100, sunB = 60;
    skyH = 195, skyS = 100, skyB = 20;
    lH1 = int(random(150, 250)), lS1 = 100, lB1 = 100;
    lH2 = int(random(150, 250)), lS2 = 100, lB2 = 100;
    rS = int(random(10000));
    colourState = "DarkTheme";
  }
  //A light theme
  if (key == '3') {
    sunH = 195, sunS = 100, sunB = 100;
    skyH = 195, skyS = 30, skyB = 100;
    lH1 = int(random(150, 250)), lS1 = 100, lB1 = 80;
    lH2 = int(random(150, 250)), lS2 = 100, lB2 = 80;
    rS = int(random(10000));
    colourState = "LightTheme";
  }
}

```
[See the sketch in action!](sketch.html)
