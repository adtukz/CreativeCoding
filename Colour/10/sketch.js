'use strict';

var rS = 0;

var cCount = 20;
var hueValues = [];
var saturationValues = [];
var brightnessValues = [];

var aV = 27;

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 100, 100, 100);
  noStroke();
}

function draw() {
  noLoop();
  background(0);
  randomSeed(rS);

  for (var i = 0; i < cCount; i++) {
    if(i%2===0) {
      hueValues[i] = random(360);
      saturationValues[i] = 100;
      brightnessValues[i] = random(100);
    } else {
      hueValues[i] = 160;
      saturationValues[i] = random(100);
      brightnessValues[i] = 100;
    }
  }

  var counter = 0;

  var rowCount = int(random(5,30));
  var rowHeight = height / rowCount;

  for(var i = 0; i <= rowCount; i++) {
    var partCount = i + 1;
    var parts = [];

    for(var ii = 0; ii < partCount;ii++) {
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

    var sumPartsTotal = 0;
    for(var ii = 0; ii < partCount; ii++) {
      sumPartsTotal += parts[ii];
    }

    var sumParts = 0;
    for(var ii = 0; ii < parts.length; ii++) {
      sumParts += parts[ii];

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

      counter++
    }

  }

}

function radialGradient(x1, x2, y1, y2, r1, r2, c1, c2) {
  var ctx = drawingContext;
  //The center of the circle is found by addiing the x1 and x2 variables and diving them by 2.
  //the -x1 is used as x1 is the distance from 0, to x1.
  //so x2 would be the distance from 0, to x2, but we want from x1 to x2.
  var centerX = x1 + (x2 - x1) / 2;
  //same as above.
  var centerY = y1 + (y2 - y1) / 2;
  var grd = ctx.createRadialGradient(centerX, centerY, r1, centerX, centerY, r2);
  grd.addColorStop(0, c1.toString());
  grd.addColorStop(1, c2.toString());
	ctx.fillStyle = grd;
	ctx.fillRect(x1, y1, x2 - x1, y2 - y1);
}

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
