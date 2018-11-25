'use strict';

function setup() {
  createCanvas(595,842);
  colorMode(HSB, 360, 100, 100, 100);
}

function draw() {
  background(210, 55, 85);


  fill(198, 4 , 91);
  noStroke();
  cloud1(width/4, (height/2)-50);
  cloud2(width/4, (height/4)-100);
  cloud3(width/4, (height/4)*3);
}

function cloud1 (startX, startY) {
  bezier(startX - 20, startY + 10, startX , startY + 200, startX + 60, startY + 70, startX + 60, startY + 60);
  bezier(startX + 60, startY + 60, startX + 90, startY + 120, startX + 150, startY + 150, startX + 200, startY + 70);
  bezier(startX + 200, startY + 70, startX + 320, startY + 40, startX + 300, startY + 20, startX + 250, startY - 20);
  bezier(startX + 250, startY - 20, startX + 280, startY - 100, startX + 240, startY - 80, startX + 200, startY - 60);
  bezier(startX + 200, startY - 60, startX + 150, startY - 100, startX + 80, startY - 120 , startX + 40, startY - 60);
  bezier(startX + 40, startY - 60, startX, startY - 100, startX - 80, startY - 120, startX - 20, startY -60);
  bezier(startX - 20, startY - 60, startX - 80, startY - 20, startX - 80, startY - 20, startX - 20, startY + 10);
  beginShape();
   vertex(startX - 20, startY + 10);
   vertex(startX + 60, startY + 60);
   vertex(startX + 200, startY + 70);
   vertex(startX + 250, startY - 20);
   vertex(startX + 200, startY - 60);
   vertex(startX + 40, startY - 60);
   vertex(startX - 20, startY - 60);
  endShape();
}
function cloud2 (startX, startY) {
  bezier(startX - 40, startY + 10, startX - 20, startY + 180, startX + 60, startY + 70, startX + 100, startY + 100);
  bezier(startX + 100, startY + 100, startX + 150, startY + 120, startX + 150, startY + 150, startX + 280, startY + 70);
  bezier(startX + 280, startY + 70, startX + 320, startY + 40, startX + 300, startY + 20, startX + 280, startY - 40);
  bezier(startX + 280, startY - 40, startX + 280, startY - 100, startX + 240, startY - 80, startX + 200, startY - 60);
  bezier(startX + 200, startY - 60, startX + 140, startY - 100, startX + 70, startY - 80 , startX + 30, startY - 75);
  bezier(startX + 30, startY - 75, startX, startY - 100, startX - 40, startY - 20, startX - 40, startY + 10);
  beginShape();
    vertex(startX - 40, startY + 10);
    vertex(startX + 100, startY + 100);
    vertex(startX + 280, startY + 70);
    vertex(startX + 280, startY - 40);
    vertex(startX + 200, startY - 60);
    vertex(startX + 30, startY - 75);
  endShape();
}
function cloud3 (startX, startY) {
  bezier(startX - 80, startY + 60, startX - 20, startY + 180, startX + 60, startY + 70, startX + 60, startY + 80);
  bezier(startX + 60, startY + 80, startX + 120, startY + 180, startX + 180, startY + 150, startX + 240, startY + 70);
  bezier(startX + 240, startY + 70, startX + 320, startY + 40, startX + 300, startY + 20, startX + 280, startY - 40);
  bezier(startX + 280, startY - 40, startX + 240, startY - 120, startX + 160, startY - 120, startX + 120, startY - 60);
  bezier(startX + 120, startY - 60, startX + 80, startY - 100, startX + 70, startY - 120 , startX + 30, startY - 80);
  bezier(startX + 30, startY - 80, startX - 20, startY - 100, startX - 40, startY - 80, startX - 40, startY - 20);
  bezier(startX - 40, startY - 20, startX - 60, startY - 20, startX - 100, startY, startX - 80, startY + 60);
  beginShape();
    vertex(startX - 80, startY + 60);
    vertex(startX + 60, startY + 80);
    vertex(startX + 240, startY + 70);
    vertex(startX + 280, startY - 40);
    vertex(startX + 120, startY - 60);
    vertex(startX + 30, startY - 80);
    vertex(startX - 40, startY - 20);
  endShape();
}


function keyPressed() {
  //if s is pressed : save the canvas as a png image, with the Y pos of the mouse and the timestamp as the name.
  if (key == 's' || key == 'S') saveCanvas(gd.timestamp(), 'png');
}
