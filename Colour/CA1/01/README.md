# Creative Coding Year 4 - Colour
## Part 1 - Daylight

[Go back to Ca!](../) or [See the sketch in action!](sketch.html)

The first step of creating the daylight cycle is to create the sun which moves down the canvas and follows the cursor.

To do this we first create the setup function. Here we will create our canvas, set the colour mode and remove strokes from any drawn objects
```javascript
function setup() {
  //canvas with a4  sized proportions
  createCanvas(595,842);
  //colourMode is hue/saturation/brightness
  colorMode(HSB, 360, 100, 100, 100);
  //nostroke to be drawn around the sun.
  noStroke();
}
```

Next is the draw function this is where we will draw the sun object. The first step is to constrain the cursor to the canvas, so if the user moves the cursor out of the canvas there will be no errors.

Next we create two variables one which follows the cursor's y position so that we can move the sun ellipse down the screen and the other is the radius of the sun.

```javascript
function draw() {
  //constrain the mouse to the canvas.
  var mX = constrain(mouseX, 0, width);
  var mY = constrain(mouseY, 0, height);

  //create sun's radius
  var sunR = 150;

  //the suns position is based on user's mouse position.
  var sunY = mY;
```

Now we want to create the background of the image as well as the sun.

For the background we want it to change as the sun moves. To go from a dark blue, to a light blue and back to the original blue as if the sun brightens the page then darkens as it leaves the page. To achieve this we use the if statement below.

After we just need to add the ellipse in that is the sun.

```javascript
  //Keep updating background colour for when the sun moves.
  if(sunY < height/2) {
    //while the mouse is in the top half of the canvas the background gets brighter
    background(210, 55, 60 + (sunY/20));
  } else {
    //while the mouse is in the bottom half of the canvas, the background begins to dim back to the original colour when mouse is 0
    background(210, 55, 60 + ((height)/20) - (sunY/20));
  }

  //The sun's fill is yellow.
	fill(37, 57, 99);
  //the sun's position is based on the y position of the mouse above.
	ellipse(width/2, sunY, sunR , sunR );
}
```

Lastly adding the function to save the canvas as an image, adding the mouse's y position so that the image may be replicated.

```javascript
function keyPressed() {
  //if s is pressed : save the canvas as a png image, with the Y pos of the mouse and the timestamp as the name.
  if (key == 's' || key == 'S') saveCanvas(gd.timestamp() + "_MouseY:" + mouseY, 'png');
}
```
[See the sketch in action!](sketch.html)
