# Creative Coding Year 4 - Colour
## Example 4 - Lerp Colour

[Go back to Colour](../) or [See the sketch in action!](index.html)

In this example we are creating are displaying the capabilities of lerpColor.

If we have two different colours, lerpColor allows us to find to find the colours between them. So we can create the steps it takes to go from one colour to another.

In the setup we use ```noLoop(); ``` this means the draw function will only run once. Otherwise the colours we have created will keep changing.

We have created a new function ```createColours```, this will allow us to populate the arrays at the start of the sketch. Which will create the left side and right side colours. These will be the colours that we lerp from left to right with.

Below is the ```createColours``` function. We want to create a colour for each row of our sketch. So we create five randomized colours. We then push each colour to the array. Then we did this loop again, changing which numbers the Hue is randomized between. So each side of our sketch will have different colours. This will allow us to see what lerpColor does.
```javascript
function createColours() {
  //loop 5 times
  for(let i = 0; i < 5; i++) {
    //newColourLeft is equal HSB(0 to 100, 100, 100)
    //we randomize the Hue of each colour.
    let newCL = color(random(0,100),100,100);
    //add the colour to the array
    coloursLeft.push(newCL);
  }
}
```

In the draw we want to create a loop to draw the tiles needed. Here we are creating a grid with 5 rows and 10 columns of each row.

The fill will be using the lerpColor function.

```javascript
function draw() {
  //Each step will be the width divided by the amount of columns we want
  let stepX = width/10;
  //Each step will be the height divided by the amount of rows we want
  let stepY = height/5;

  //create a loop to draw all of our tiles
  for(let gridY = 0; gridY < 5; gridY++) {
      for(let gridX = 0; gridX < 10; gridX++) {
          //Let the colour of our tile equal to lerpColor(leftColour,rightColour,0 to 1)
          //lerpColor(leftColour = the left side colour we want)
          //LerpColor(rightColour = the right side colour we want)
          //lerpColor(0 to 1 = how far between the left and right colour we want to lerp)
          //if we are half way between to colours the value would be 0.5
          //if we want the left colour let it equal to 0
          //if we want the right colour let it equal to 1
          let c = lerpColor(coloursLeft[gridY],coloursRight[gridY],map(gridX,0,10,0,1));
      }
  }
}

```

[See the sketch in action!](index.html)
