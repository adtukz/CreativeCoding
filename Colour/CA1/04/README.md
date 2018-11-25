# Creative Coding Year 4 - Colour
## Part 4 - User Interactivity

[Go back to CA!](../) or [See the sketch in action!](sketch.html)

Now we want to begin adding some user interactivity. What we are going to add is the sun growing and shrinking as it moves down the page, growing as the background brightens and shrinking as the background darkens. We also want to add a mouse click, where we re-generate the clouds on the page randomly whenever a mouse is clicked.

Firstly we will change the sun. This is just a small change to the sun's radius in the draw method. Similar to how the background changes as the user moves their cursor.
```javascript
//Adding feeedback to the sun growing and then shrinking as the background brightens and darkens
if(sunY < height/2) {
  var sunR = 200 + sunY/5;
} else {
  var sunR = 368 - sunY/5;
}
```

Next we are adding a mouseReleased() function, every time the user clicks this function will trigger. When triggered it will create a new random seed, a new cloud count and run the generateClouds() function. This will generate a new completely random canvas for the user. However, while we still use random seed, the randomness is still uniform.

```javascript
function mouseReleased() {
  rS = int(random(100));
  cloudCount= int(random(10, 50));
  generateClouds();
}
```

We are also adding to the generateClouds() function. Every time it is triggered we are creating a slightly different colour set. The sun's colour and the clouds colours will change. The sun's Hue will change slightly. The clouds saturation will change slightly. Also the more clouds present on the screen the more opaque the clouds will be.

```javascript
function generateClouds() {
  sunCol = color(25 + random(0,10), 57, 99, 100);
  cloudCol = color(198, int(random(0,10)) , 91 , 50 + cloudC);
}
```

[See the sketch in action!](sketch.html)
