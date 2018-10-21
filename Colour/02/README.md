# Creative Coding Year 4 - Colour
## Example 2 - Hue, Saturation and Brightness Colour Gradient

[Go back to Colour](../) or [See the sketch in action!](index.html)

In this example we are creating a Hue, Saturation and Brightness colour gradient. Where the user can control how many tiles make up the colour gradient.

The setup function has one change in the colorMode, from the last example.
Here we are making sure that when we draw our tiles in this example, that we will have all the colours in the gradient. We make the Hue equal to the width of the canvas, and the saturation equal to the height. This means the position of each tile corresponds to gradient we are creating.

```javascript
function setup() {
    //HSB = Hue, Saturation, Brightness.
    colorMode(HSB,width,height,100);
}
```

The draw function is the only major change in this example.

We are creating a set of tiles, where depending on the cursor's position we are creating a number of tiles that will be coloured to create the HSB gradient.

```javascript
function draw() {
    //Create variables to make number of rows and columns based on the cursor's position
    //+2 so that there is always some amount of rows columns.
    var noOfCols = mouseX + 2;
    var noOfRows = mouseY + 2;
    //Create variables for the distance between each tile.
    //The distance between each tile is the width divided by the number of tiles we want on that row. This is stepX.
    //The distance between each row is the height divided by the number of rows we want to create. This is stepY.
    var stepX = width/noOfCols;
    var stepY = height/noOfRows;
    //Loop to create the rows and columns
    for(var gridY = 0; gridY<height; gridY += stepY) {
        for(var gridX = 0; gridX<width; gridX += stepX) {
            //the fill(H,S,B) is based on each tiles position.
            //gridX starts at 0, and is then increased by stepX, the size of each tile. As the Hue is measured from 0 to the width of the canvas and our tiles span the full width of the canvas. Each tiles hue is its gridX value.
            //the same is said for the Saturation. However we used height-gridY so that we flip how the gradient is drawn, so it is from the highest to lowest value. This makes the gradient draw the way we want it to.
            //The brightness never changes, it is always 100.
            fill(gridX,height-gridY,100);
            //each rectangle is place drawn within the grid, and its size is based on stepX and stepY.
            rect(gridX,gridY,stepX,stepY);
        }
    }
}
```

[See the sketch in action!](index.html)
