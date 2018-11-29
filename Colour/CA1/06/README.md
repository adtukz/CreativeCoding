# Creative Coding Year 4 - Colour
## Part 6 - Clouds to Text

[Go back to CA!](../) or [See the sketch in action!](sketch.html)

For this iteration we have removed all of the clouds, and instead added the words Generative Design around the sun.

Features:
* Letters appear randomly around sun
* Each letter has random attributes, the angle it is at and the position.
* Letters line form around the sun when it is in the middle of the page

To do this we need to add a lot to the sketch, first we will look at before the ```setup()``` function

We will add four new variables, one for the font we will use which is imported in sketch.html.
Next the word we want to draw. The words appear backwards here, but when drawn will be legible.
We create a variable for the random angle the letters will be spun by
Then we are changing the clouds HSB to be the letters HSB
```javascript
//adding in variables for the font and words
var font = 'Open Sans';
var word = 'DESIGN GENERATIVE ';

//variable for randomness of the angle the letters are rotated by
var rAngle = 0;

//letter HSB
var lH = 198, lS = 4, lB = 91;

```

Next we need to add to the ```setup()``` function. We set the font, align the text to be centered, change the angleMode to degrees and run the randomAngle() function that will be explained further down.

```javascript

function setup() {
  //making text open sans
  textFont(font);
  //draw text from center
  textAlign(CENTER, CENTER);

  //change angle mode to degrees
  angleMode(DEGREES);

  //create a random angle, this is used so when we click we can change the angle
  randomAngle();
}
```

Next the draw function sees significant change. Here is just what is changed aside from adding in drawing the letters. We create a variable for the size of the letters. We also add change this variable where the sun's size changes so that the letters grow and shrink with the sun.

```javascript
function draw() {
  //var for letter size, will be based on sun's position
  var letterS;

  if(sunY < height/2) {
    //letter size changes depending on sun's position, biggest in the middle
    letterS = int(map(sunY, 0, height, 10, 80));
  } else {
    //letter size changes depending on sun's position, biggest in the middle
    letterS = int(map(sunY, 0, height, 80, 10));
  }
}
```

Now we will look at how the letters are drawn. This is done using a for loop which loops through each character of the word string we defined above. We then calculate the angle each letter should be at to draw the letters around the sun, like the marks around a clock would be drawn.

We then randomize the position the letters start at, each letter will randomly be moved in the x and y directions. We use random() chacne so that the letters are evenly moved around the sun on average. This makes the letters appear around the sun in equal amounts.

```javascript
function draw() {
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
  }
}
```

Then we need to map this randomness, so that when the sun is in the middle of the page the random values we created will be 0, so that the letters will display correctly around the sun. When the sun's y position is greater than half of the canvas, we make the the randomness reverse, so the letters move off the in opposite direction to the way they came.

```javascript
function draw() {
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
  }
}
```

Now we just need to draw the letters. We set the textSize and fill. A simple error check is used so that if the angle we are at is greater than any letter we want to draw, it wont crash the script. ```push()``` and ```pop()``` are used so that we can rotate each letter individually without affecting the whole sketch

```javascript
function draw() {
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
```

Lastly we add the randomAngle() function which is triggered when the mouse is clicked, that will make the letters random angle.

```javascript
//if click create new random angle for letters
function mouseReleased() {
  rS = int(random(10000));
  randomAngle();
}

//random angle is between 0 and 360(full circle)
function randomAngle() {
  rAngle = int(random(0,360));
}
```
[See the sketch in action!](sketch.html)
