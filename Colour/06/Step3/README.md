# Creative Coding Year 4 - Colour
## Example 6 - Interactivity

[Go back to Example 6 - Colour Patterns](../) or [See the sketch in action!](sketch.html)

### Step 3

In step 3 we are adding interactivity.

We are letting the user save the canvas as an image. The user can also save the colours as a .ase file.

We are also letting the user randomize the colours they are seeing. But within set boundaries so that the pattern created is controlled, yet random.

```javascript
//If a key is pressed.
function keyPressed() {
  //if s is pressed : save the canvas as a png image, with the timestamp as the name.
  if (key == 's' || key == 'S') saveCanvas(gd.timestamp(), 'png');
  //if c is pressed : create an Adobe Swatch Exchange file from the colours on screen
  if (key == 'c' || key == 'C') {
    var colors = [];
    for (var i = 0; i < hueValues.length; i++) {
      colors.push(color(hueValues[i], saturationValues[i], brightnessValues[i]));
    }
    writeFile([gd.ase.encode(colors)], gd.timestamp(), 'ase');
  }

  //if 1 is pressed : create new random colours
  if (key == '1') {
    for (var i = 0; i < tileCountX; i++) {
      hueValues[i] = floor(random(360));
      saturationValues[i] = floor(random(100));
      brightnessValues[i] = floor(random(100));
    }
  }
}
```
The list of the user controls are below.

If the user presses:

* 1 it will create new random colours
2. 2 it will create new random colours, where the brightness of them all is 100.
3. 3 it will create new random colours where the saturation of them all is 100.
4. 4 it willcreate new random colours where the hue and saturation are 0.
5. 5 it willcreate new random colours where the hue is 195, saturation is 100.
6. 6 it will create new random colours where hue is 195, brightness is 100.
7. 7 it will create new random colours where hue is between 0 and 180, saturation between 80 and 100, and brightness is betwee 50 and 90.
8. 8 it will create new random colours where hue is between 180 and 360, saturation is 80 to 100 and brightness is 50 to 90.
9. 9 it will create new random colours where the hue is 195 for ever other tile.
10. 0 it will create new random colours where they are a lot less random as the hue is set for all colours, the first tiles hue is 140 it then switches to 210. It switches every tile so it is easier 140 or 210, making the colours very similar only varying its saturation and brightness.

[Go back to Example 6 - Colour Patterns](../) or [See the sketch in action!](sketch.html)
