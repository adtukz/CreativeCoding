# Creative Coding Year 4 - Colour
## Example 5 - Pixel Array

[Go back to Example 5 - Pixel Array](../) or [See the sketch in action!](sketch.html)

### Step 4

In step 4 we are adding some interactivity. The mouse position will now dictate how many tiles we want to draw.

We are also allowing the user to save the colours into a .ase file. The user can also save an image of the sketch.

We are also adding the ability to change which image the user is looking at.

```javascript
function draw() {
	//The tilecount is now interactive with the users mouse.
	//As the user moves their mouse across the x axis, in a positive direction, the tiles will get bigger and the image will become more "pixelated"
  var tileCount = floor(width/max(mouseX,5));
}

function keyPressed() {
	//When the user presses c, an ase(Adobe Swatch Exchange) file will be created, allowing the tiles appearing on screen to be imported to photoshop
	if (key == 'c' || key == 'C') writeFile([gd.ase.encode(colors)], gd.timestamp(), 'ase');
	//When the user pesses s, the image on the canvas will be saved
  if (key == 's' || key == 'S') saveCanvas(gd.timestamp(), 'png');

	//Here we are allowing the user to switch which image they are seeing, between the 4 options.
  if (key == '1') img = loadImage('../savedImages/pic1.jpg');
  if (key == '2') img = loadImage('../savedImages/pic2.jpg');
  if (key == '3') img = loadImage('../savedImages/pic3.jpg');
  if (key == '4') img = loadImage('../savedImages/pic4.jpg');

}

```

[Go back to Example 5 - Pixel Array](../) or [See the sketch in action!](sketch.html)
