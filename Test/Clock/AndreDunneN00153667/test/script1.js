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
let hourHandLength = 195;
let hourHandOffset = 80;
let hourHandStartWidth = 20;

let minuteHandsTaper = 6;
let minuteHandLength = 155;
let minuteHandOffset = 80;
let minuteHandStartWidth = 20;

let secondHandsTaper = 2;
let secondHandLength = 155;
let secondHandOffset = 80;
let secondHandStartWidth = 10;

function setup() {
  createCanvas(500,500);
  noLoop();
  angleMode(DEGREES);

  minuteStrokeColor = color(30,30,30);
  minuteStrokeCape = SQUARE;

  hourStrokeColor=color(30,30,30);
  hourStrokeCap=SQUARE;
}

function draw() {
  fill(240);
  ellipse(width/2, height/2, clockRadius*2, clockRadius*2);

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

  fill(hourStrokeColor);
  push();
    translate(width/2, height/2);
    let hr = hour();
    if(hr > 12) {
      hr -= 12;
    }
    rotate(map(hr, 0, 12, 0, 360));
    beginShape();
      line(-hourHandStartWidth/2, -hourHandOffset, hourHandsTaper-hourHandStartWidth, hourHandLength - hourHandOffset);
      line(hourHandsTaper-hourHandStartWidth, hourHandLength - hourHandOffset, hourHandStartWidth - hourHandsTaper, hourHandLength - hourHandOffset);
      line(hourHandStartWidth - hourHandsTaper, hourHandLength - hourHandOffset, hourHandStartWidth/2, -hourHandOffset);
      line(hourHandStartWidth/2, -hourHandOffset, -hourHandStartWidth/2, -hourHandOffset);
    endShape();
  pop();

  fill(minuteStrokeColor);
  push();
    translate(width/2, height/2);
    rotate(map(minute(), 0, 60, 0, 360));
    beginShape();
      line(-minuteHandStartWidth/2, -minuteHandOffset, minuteHandsTaper-minuteHandStartWidth, minuteHandLength - minuteHandOffset);
      line(minuteHandsTaper-minuteHandStartWidth, minuteHandLength - minuteHandOffset, minuteHandStartWidth - minuteHandsTaper, minuteHandLength - minuteHandOffset);
      line(minuteHandStartWidth - minuteHandsTaper, minuteHandLength - minuteHandOffset, minuteHandStartWidth/2, -minuteHandOffset);
      line(minuteHandStartWidth/2, -minuteHandOffset, -minuteHandStartWidth/2, -minuteHandOffset);
    endShape();
  pop();

  fill("red");
  ellipse(width/2, height/2, 15, 15);
  push();
    translate(width/2, height/2);
    rotate(map(second(), 0, 60, 0, 360));
    ellipse(0, secondHandLength-25, 25, 25);
    beginShape();
      line(-secondHandStartWidth/2, -secondHandOffset, secondHandsTaper-secondHandStartWidth, secondHandLength - secondHandOffset);
      line(secondHandsTaper-secondHandStartWidth, secondHandLength - secondHandOffset, secondHandStartWidth - secondHandsTaper, secondHandLength - secondHandOffset);
      line(secondHandStartWidth - secondHandsTaper, secondHandLength - secondHandOffset, secondHandStartWidth/2, -secondHandOffset);
      line(secondHandStartWidth/2, -secondHandOffset, -secondHandStartWidth/2, -secondHandOffset);
    endShape();
  pop();
}
