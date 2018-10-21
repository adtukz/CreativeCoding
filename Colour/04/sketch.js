let coloursLeft = [];
let coloursRight = [];
function setup() {
    createCanvas(800,800);
    noStroke();
    colorMode(HSB, 300, 100, 100);
    createColours();
}

function draw() {
    let stepX = width/10;
    let stepY = height/5;

    for(let gridY = 0; gridY < 5; gridY++) {
        for(let gridX = 0; gridX < 10; gridX++) {
            let c = lerpColor(coloursLeft[gridY],coloursRight[gridY],map(gridX,0,10,0,1));
            fill(c);
            rect(gridX*stepX,gridY*stepY,stepX,stepY);
        }
    }
}

function createColours() {
  for(let i = 0; i < 5; i++) {
    let newCL = color(random(0,100),100,100);
    coloursLeft.push(newCL);
  }
  for(let i = 0; i < 5; i++) {
    let newCR = color(random(200,300),100,100);
    coloursRight.push(newCR);
  }
}
