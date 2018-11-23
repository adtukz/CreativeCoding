# Creative Coding Year 4 - Colour
## Example 7 - Random Amount of Tiles

[Go back to Colour](../) or [See the sketch in action!](sketch.html)

In this example we are changing the fill of the rectangles to radial gradients. This mean the colours start from the center and move to the edge of the rectangles. Not from left to right.

To do this we must create a new function, similar to gradient. This function will need more variables to create the radial gradient we need.

 ```javascript
 if(random() <0.4) {
   var w = -map(parts[ii], 0, sumPartsTotal, 0, width);
   var h = rowHeight * 1.5;
   //create the x and y positions for the gradient
   var posX1 = map(sumParts, 0, sumPartsTotal, 0, width);
   var posX2 = posX1 +  w;
   var posY1 = rowHeight * i;
   var posY2 = posY1 + h;

   var index = counter % cCount;
   var col1 = color(0);
   var col2 = color(hueValues[index], saturationValues[index], brightnessValues[index], aV);
   //radialGradient function, we use max at the end as if the rectangle is shorter in width then length or shorter in height then width we need to find the distance the gradient will need to travel to cover the whole rectangle
   radialGradient(posX1, posX2, posY1, posY2, 0, max(w,h), col1, col2);
 }
```



```javascript
function radialGradient(x1, x2, y1, y2, r1, r2, c1, c2) {
  var ctx = drawingContext; 
  //The center of the circle is found by addiing the x1 and x2 variables and diving them by 2.
  //the -x1 is used as x1 is the distance from 0, to x1.
  //so x2 would be the distance from 0, to x2, but we want from x1 to x2.
  var centerX = x1 + (x2 - x1) / 2;
  var centerY = y1 + (y2 - y1) / 2;
  var grd = ctx.createRadialGradient(centerX, centerY, r1, centerX, centerY, r2);
  grd.addColorStop(0, c1.toString());
  grd.addColorStop(1, c2.toString());
	ctx.fillStyle = grd;
	ctx.fillRect(x1, y1, x2 - x1, y2 - y1);
}
```
[See the sketch in action!](sketch.html)
