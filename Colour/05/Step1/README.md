# Creative Coding Year 4 - Colour
## Step 1 - Load an Image

[Go back to Example 5 - Pixel Array](../)

### Step 1

In step we are creating the sketch. We want to load an image in. We then want to log it to console so that we can see it loaded correctly.

```javascript
// declare an image variable, to store the image in when we load it.
var img;

//preload allows us to load the image before our stepUp and draw function run.
function preload() {
  //Loads a jpg image into a p5 image.
  img = loadImage('../savedImages/pic1.jpg');
}

function setup() {
  createCanvas(600,600);
  //no cursor will appear on the canvas
  noCursor();
  //no stroke will appear on any drawn objects
  noStroke();
  //the draw function will not loop
  noLoop();
}

function draw() {
  //will load the pixels from the image into the pixels array within the image object.
  img.loadPixels();
  //will log to console the first value within the pixels array we just loaded.
  //this will log the R value for the first pixel, from the RGBA properties of each pixel
  console.log(img.pixels[0]);
  //logs to console the entire object of the image we have loaded that p5 has created for us.
  console.log(img);
}
```

[Go back to Example 5 - Pixel Array](../)
