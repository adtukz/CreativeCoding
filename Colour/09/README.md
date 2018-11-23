# Creative Coding Year 4 - Colour
## Example 7 - Random Amount of Tiles

[Go back to Colour](../) or [See the sketch in action!](sketch.html)

For this example we are using the random function to have a 60% chance of a rectangle not being drawn.
 ```javascript
 if (random() < 0.4){
   var x = map(sumParts, 0, sumPartsTotal, 0, width);
   var y = rowHeight * i;
   var w = -map(parts[ii], 0, sumPartsTotal, 0, width);
   var h = rowHeight * 1.5;

   var index = counter % cCount;
   var col1 = color(0);
   var col2 = color(hueValues[index], saturationValues[index], brightnessValues[index], aV);
   gradient(x, y, w, h, col1, col2);
 }
}
```

[See the sketch in action!](sketch.html)
