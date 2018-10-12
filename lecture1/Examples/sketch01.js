function setup() {
    createCanvas(720,720);
    colorMode(HSB,360,100,100);
    rectMode(CENTER);
    noStroke();
}

function draw() {
    background(mouseY/2,80,80);
    fill(360-mouseY/2,80,80);
    rect(width/2,height/2,mouseX,mouseX);
}

function keyPressed() {
    if(key=='s' || key=='S') saveCanvas(gd.timestamp() + '_MouseX:' + mouseX + '_MouseY:' + mouseY,'png');
}