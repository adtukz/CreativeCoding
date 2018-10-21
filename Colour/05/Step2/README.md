# Creative Coding Year 4 - Colour
## Example 5 - Pixel Array

[Go back to Example 5 - Pixel Array](../)

### Step 2

In step 2 we now create a colour array to store the colours that will represent each tile. We do this by grabbing the colour at the top left of the tile we are creating, that corresponds to the image. This is where the pixelArray comes in to effect.

The tiles we create must cover the images size completely for this "pixelated" effect to work. This is why we created a 600x600 canvas, and the image we have is 600x600 pixels.

```javascript
var colors = [];

function draw() {
  //How many tiles we want to show on the screen
  var tileCount = 9;
  //How big each tile should be
  var rectSize = width/tileCount;
  //refresh our colous array, so when it loops it clears the array each time (we aren't looping now, but we will)
  colors= [];
  //for loop to create the tiles in the x and y directions
  for(var gridY = 0; gridY < tileCount; gridY++) {
    for(var gridX = 0; gridX < tileCount; gridX++) {
      //the pixel where will we get the RGBA values, X and Y co-ordinates
      var px = int(gridX * rectSize);
      var py = int(gridY * rectSize);

      //the index of the R value of the pixel we are locating
      var i = (py * img.width + px) * 4;

      //creating a color object by giving it the pixels RGBA values
      var c = color(img.pixels[i], img.pixels[i+1], img.pixels[i+2], img.pixels[i+3]);
      //push the color we just made into the array
      colors.push(c);
    }
  }
  //log the colors array to console.
  console.log(colors);
}
```

[Go back to Example 5 - Pixel Array](../)
