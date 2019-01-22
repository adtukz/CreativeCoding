let r = 250;

function setup() {
  createCanvas(600,600);
  background(240);
  rectMode(CENTER);
  angleMode(DEGREES);
  textAlign(CENTER, CENTER);
  noStroke();
}

function draw() {
  fill(200);
  ellipse(width/2, height/2, r*2, r*2);

  fill(20);
  for(let i = 10; i <=21; i++) {
    push();
      translate(width/2, height/2);
      textSize(21);
      text(i-9, (r+20) * cos(i*30), (r+20) * sin(i*30));
    pop();
  }

  for(let i = 0; i < 360; i++) {
    if(i%30 === 0) {
      push();
        translate(width/2, height/2);
        rotate(i);
        rect(0, r-30, 15, 40);
      pop();
    } else if(i%6 ===0) {
      push();
        translate(width/2, height/2);
        rotate(i);
        rect(0, r-20, 5, 20);
      pop();
    }
  }

  fill(20);
  push();
    let hr = hour();
    if(hr > 12) {
      hr -= 12;
    }
    translate(width/2, height/2);
    rotate(map(hr, 0, 12, 0, 360));
    rect(0, -r/5, 20, r*(2/3));
  pop();

  push();
    translate(width/2, height/2);
    rotate(map(minute(), 0, 60, 0, 360));
    rect(0, -r/3, 15, r);
  pop();

  fill(255,30,30);
  ellipse(width/2,height/2,10,10);
  push();
    translate(width/2,height/2);
    rotate(map(second(), 0, 60, 0, 360));
    ellipse(0,80-r,30,30);
    rect(0,-r/4,5,r*(3/4));
  pop();
}



































































































// let r = 250;
//
// function setup() {
//   createCanvas(600,600);
//   background(255);
//   noStroke();
//   rectMode(CENTER);
//   angleMode(DEGREES);
//
//   noLoop();
// }
//
// function draw() {
//   let sc = second();
//   let mn = minute();
//   let hr = hour();
//
//   //clock background
//   fill(220);
//   ellipse(width/2,height/2,r*2,r*2);
//
//   //clcok ticks
//   fill(20);
//   for(var i = 0; i < 360; i++) {
//     if(i%30 === 0) {
//       push();
//       translate(width/2, height/2);
//       rotate(i);
//       rect(0, r-35, 15, 40);
//       pop();
//     } else if(i%6 === 0) {
//       push();
//       translate(width/2, height/2);
//       rotate(i);
//       rect(0, r-25, 5, 20);
//       pop();
//     }
//   }
//
//   push();
//   translate(width/2, height/2);
//   rotate(map(mn, 0, 60, 0, 360));
//   rect(0, -r/3, 10, r);
//   pop();
//
//   push();
//   if(hr > 12) {
//     hr -= 12;
//   }
//   translate(width/2, height/2);
//   rotate(map(hr, 0, 12, 0, 360));
//   rect(0, -r/5, 15, r *(2/3));
//   pop();
//
//   fill(255,30,30);
//   ellipse(width/2, height/2, 10, 10);
//
//   push();
//   translate(width/2, height/2);
//   rotate(map(sc, 0, 60, 0, 360));
//   ellipse(0, -r+80, 30, 30);
//   rect(0, -r/3, 5, r-50);
//   pop();
//
//   fill(20);
//   for(var i=10; i<=21; i++){
//     push();
//     translate(width/2, height/2);
//     textSize(21 );
//     textAlign(CENTER, CENTER);
//     text(i-9, (r+20) * cos(i*30), (r+20) * sin(i*30));
//     pop();
//   }
// }
