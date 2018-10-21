function setup() {
    createCanvas(500,500);
    //HSB = Hue, Saturation, Brightness.
    colorMode(HSB,width,height,100);
    noStroke();
}

function draw() {
    //Create variables to make num of rows and columns
    var noOfCols = mouseX + 2;
    var noOfRows = mouseY + 2;
    //Create variables for the distance between each row and column
    var stepX = width/noOfCols;
    var stepY = height/noOfRows;
    //Loop to create the rows and columns
    for(var gridY = 0; gridY<height; gridY += stepY) {
        for(var gridX = 0; gridX<width; gridX += stepX) {
            fill(gridX,height-gridY,100);
            rect(gridX,gridY,stepX,stepY);
        }
    }
}

function keyPressed() {
    //If key is pressed save the canvas as an image with timestamp and x + y pos.
    if(key=='s' || key=='S') saveCanvas(gd.timestamp() + '_MouseX:' + mouseX + '_MouseY:' + mouseY,'png');
}