'use strict';

//randomSeed used to remove randomness
var rS = 5;

//amount of colours we want to create
var cCount = 20;
var hueValues = [];
var saturationValues = [];
var brightnessValues = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 100, 100, 100);
  noStroke();
}

function draw() {
  //turn of loop, and give it a randomSeed
  //The random seed means that the randomness is taken away, as the code will generate its randomness based on the seed, which will be the same every time
  noLoop();
  randomSeed(rS);

  //Creating the colour palette
  //using modular divison when creating colours allows us to make every other colour the same, creating a pattern
  for (var i = 0; i < cCount; i++) {
    if(i%2===0) {
      hueValues[i] = random(120,180);
      saturationValues[i] = 100;
      brightnessValues[i] = random(50,100);
    } else {
      hueValues[i] = 165;
      saturationValues[i] = 100;
      brightnessValues[i] = random(80,100);
    }
  }

  var counter = 0;

  //creating a random amount of rows
  var rowCount = int(random(5,30));
  var rowHeight = height / rowCount;

  //creating how many tiles in each row
  for(var i = 0; i <= rowCount; i++) {
    var partCount = i + 1;
    var parts = [];

    for(var ii = 0; ii < partCount;ii++) {
      //using random to fragment a tile
      //7.5% of the time it will fragment a tile, splitting into between 2 and 20 parts
      if(random() < 0.075) {
        var fragments = int(random(2, 20));
        partCount = partCount + fragments;
        for(var iii = 0; iii < fragments; iii++) {
          parts.push(random(2));
        }
      } else {
        parts.push(random(2,20));
      }
    }

    //Getting the total amount of parts in the row, used to find the width of each tile
    var sumPartsTotal = 0;
    for(var ii = 0; ii < partCount; ii++) {
      sumPartsTotal += parts[ii];
    }

    //after each tile is drawn, we add the width to a variable, to track how far across the width of the canvas we have drawn so far
    var sumParts = 0;
    //drawing the tiles
    for(var ii = 0; ii < parts.length; ii++) {
      sumParts += parts[ii];

      //x position is how far across the width of the canvas we have gotten so far, we use map as the width of tiles is not predetermined, only how many tiles in the rows
      //this means that the widths are got by dividing the width of the canvas by the amount of parts in the row, then multiplying that by the width of the tile.
      //This is used as the tiles may not add up to the total width of our canvas, or may be bigger than the canvas itself, so it will fit them to size.
      //the map function does this for us, so we dont have to code the math
      var x = map(sumParts, 0, sumPartsTotal, 0, width);
      //the y is the rowHeight * which row we are on
      var y = rowHeight * i;
      //we use minus map, as we draw each rectangle backwards, from right to left
      //this is done as we are summing the parts together, we add the part to the x before it is drawn
      var w = -map(parts[ii], 0, sumPartsTotal, 0, width);
      //h = the height of the row
      var h = rowHeight;

      //offsetting the colours in each row, so that the same colours will appear in differnt orders on differnt rows
      var index = counter % cCount;
      //making the colour into a p5 colour
      var col = color(hueValues[index], saturationValues[index], brightnessValues[index]);
      fill(col);
      rect(x,y,w,h);

      counter++
    }

  }

}

//if the user clicks the canvas the random seed will change, changing the colours
function mouseReleased() {
  rS = random(100);
  loop();
}

function keyPressed() {
  if (key == 's' || key == 'S') saveCanvas(gd.timestamp(), 'png');
  if (key == 'c' || key == 'C') {
    var colors = [];
    for (var i = 0; i < hueValues.length; i++) {
      colors.push(color(hueValues[i], saturationValues[i], brightnessValues[i]));
    }
    writeFile([gd.ase.encode(colors)], gd.timestamp(), 'ase');
  }
}
