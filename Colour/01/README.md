# Creative Coding Year 4 - Colour
## Example 1 - Mouse Controlled Rectangle

[Go back to Colour](../) or [See the sketch in action!](index.html)

In this example we control the size of the rectangle by moving across the X axis. As the value of the x axis increases, so does the size of the rectangle.

The fill of the rectangle is based on the Y Axis. As increase the cursor's Y value, by moving along the Y axis the fill is changed.

We start in the setup: Where we create our canvas, set the colour mode for our sketch, set the rectMode and make our rectangles not have a stroke border.

```javascript
function setup() {
    //Creates a 720 by 720 canvas.
    createCanvas(720,720);
    //Sets the colour mode to Hue, Saturation and Brightness.
    colorMode(HSB,360,100,100);
    //Draws the rectangle from the center, rather than top left as is default.
    rectMode(CENTER);
    //removes the stroke from the rectangle
    noStroke();
}
```
Then we move on to the draw function. This function is looped continuously for each frame. This is where we will add the controls for drawing the rectangle, as it will be checked as the screen is updated.

```javascript
function draw() {
    //the background colour's hue value is half the mouseY value.
    background(mouseY/2,80,80);
    //the fill of the rectangle's hue value is 360 minus half of mouseY.
    fill(360-mouseY/2,80,80);
    //the rectangle is drawn directly in the center of our canvas, and its width and height are mouseX's value.
    rect(width/2,height/2,mouseX,mouseX);
}
```

Finally we add a keyPressed function. This allows us to capture the canvas as an image. Here we are creating a .png image, and the name of the the file is the time when the image was taken with the mouseX and mouseY co-ordinates, so that we can see how this image was created by the user.

```javascript
function keyPressed() {
    if(key=='s' || key=='S') saveCanvas(gd.timestamp() + '_MouseX:' + mouseX + '_MouseY:' + mouseY,'png');
}
```

[See the sketch in action!](index.html)
