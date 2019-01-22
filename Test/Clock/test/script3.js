let minuteStrokeLength = 10;
let minuteStrokeWeight = 4;
let minuteStrokeColor;
let minuteStrokeCap;

let hourStrokeLength = 30;
let hourStrokeWeight = 10;
let hourStrokeColor;
let hourStrokeCap;

let clockRadius = 200;

let hourHandsTaper = 6;
let hourHandLength = 155;
let hourHandOffset = 80;
let hourHandStartWidth = 20;

let minuteHandsTaper = 6;
let minuteHandLength = 195;
let minuteHandOffset = 80;
let minuteHandStartWidth = 20;

let secondHandsTaper = 2;
let secondHandLength = 155;
let secondHandOffset = 80;
let secondHandStartWidth = 10;

let willLoop = false;

function setup() {
  createCanvas(500,500);
  if(willLoop = false;) {
    noLoop();
  }
  angleMode(DEGREES);

  minuteStrokeColor = color(30,30,30);
  minuteStrokeCape = SQUARE;

  hourStrokeColor=color(30,30,30);
  hourStrokeCap=SQUARE;
}

function draw() {
  background(255);
  for(let i = 0; i < 360; i++) {
    if(i%30 === 0) {
      strokeCap(hourStrokeCap);
      stroke(hourStrokeColor);
      strokeWeight(hourStrokeWeight);
      push();
        translate(width/2, height/2);
        rotate(i);
        line(0, clockRadius, 0, clockRadius - hourStrokeLength);
      pop();
    } else if (i%6 === 0) {
      strokeCap(minuteStrokeCap);
      stroke(minuteStrokeColor);
      strokeWeight(minuteStrokeWeight);
      push();
        translate(width/2, height/2);
        rotate(i);
        line(0, clockRadius, 0, clockRadius - minuteStrokeLength);
      pop();
    }
  }

  noStroke();

  fill(hourStrokeColor);
  push();
    translate(width/2, height/2);
    let hr = hour();
    if(hr > 12) {
      hr -= 12;
    }
    if (willLoop !== true) {
      rotate(174);
    } else {
      rotate(map(hr, 0, 12, 0, 360));
    }
    beginShape();
      vertex(hourHandStartWidth/2, hourHandOffset/2);
      vertex((hourHandStartWidth/2)-hourHandsTaper/2, -hourHandLength);
      vertex(-(hourHandStartWidth/2)+hourHandsTaper/2, -hourHandLength);
      vertex(-hourHandStartWidth/2, hourHandOffset/2);
    endShape();
  pop();

  fill(minuteStrokeColor);
  push();
    translate(width/2, height/2);
    //rotate(map(minute(), 0, 60, 0, 360));
    rotate(36);
    beginShape();
      vertex(minuteHandStartWidth/2, minuteHandOffset/2);
      vertex((minuteHandStartWidth/2)-minuteHandsTaper/2, -minuteHandLength);
      vertex(-(minuteHandStartWidth/2)+minuteHandsTaper/2, -minuteHandLength);
      vertex(-minuteHandStartWidth/2, minuteHandOffset/2);
    endShape();
  pop();

  fill(200,20,20);
  ellipse(width/2, height/2, 15, 15);
  push();
    translate(width/2, height/2);
    //rotate(map(second(), 0, 60, 0, 360));
    rotate(72);
    beginShape();
      vertex(secondHandStartWidth/2, secondHandOffset/2);
      vertex((secondHandStartWidth/2)-secondHandsTaper/2, -secondHandLength);
      vertex(-(secondHandStartWidth/2)+secondHandsTaper/2, -secondHandLength);
      vertex(-secondHandStartWidth/2, secondHandOffset/2);
    endShape();
    ellipse(0, -secondHandLength, 25, 25);
  pop();
}
