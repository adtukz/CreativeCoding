# Creative Coding Year 4 - Colour
## Part 3 - Sun and Clouds

[Go back to CA!](../) or [See the sketch in action!](sketch.html)

In section three we are combining the sun and the clouds from the previous sections. We are also adding some randomness to the script so that we can begin seeing a random daylight cycle take place.

In order to combine the sun and the clouds, we want to draw the sun first, so it is beneath the clouds. The code for the sun has not changed.

Then we want to draw the clouds after. Firstly however as we are implementing a random element we want to remove the randomness while we create the full script. To do this we use a random seed. This means the randomness will be the exact same every time we load the page, if we remove the seed it will be fully random.

```javascript
//creating a seed for the randomness
var rS = 0;

function draw() {
  randomSeed(rS);
}
```

Now since we are generating more than one cloud, we want to have different sized clouds as well as shapes. To do this we need to alter the cloud functions and add a third variable called size. Using size we divide each part of the bezier's curve by size.

```javascript
//global variable for the amount of clouds we will see.
var cloudCount = 20;

//the cloud part of the draw function
function draw() {
  fill(198, 4 ,91 , 50);
  noStroke();
  //we pass the number of clouds we want to draw into the function
  generateClouds(cloudCount);
}

//the generateClouds function
function generateClouds(cloudC) {
  //loop to create as many clouds as cloudCount specifies.
  for(var i = 0; i <= cloudC; i++) {
    //cloudChance is using the random function to have an equal chance of creating any of the cloud styles we have created
    var cloudChance = random();
    if(cloudChance <= 0.33) {
      //cloud1(startX,startY,size)
      cloud1(int(random(0, width)), int(random(0, height)), int(random(2,5)));
    } else if(cloudChance <=0.66) {
      cloud2(int(random(0, width)), int(random(0, height)), int(random(2,5)));
    } else {
      cloud3(int(random(0, width)), int(random(0, height)), int(random(2,5)));
    }
  }
}
//an example of how we use size to change cloud sizes.
cloud() {
  bezier(startX - (20 / size), startY + (10 / size), startX , startY + (200 / size), startX + (60 / size), startY + (70 / size), startX + (60 / size), startY + (60 / size));
}
```

[See the sketch in action!](sketch.html)
