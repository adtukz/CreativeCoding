let isLooping = true;

function setup() {
    createCanvas(900,900);
    rectMode(CENTER);
    angleMode(DEGREES);
    noStroke();
    textAlign(CENTER);
}

function draw() {
    //create grey background behind clock
    background(200,200,200);
    //second hand wil point at current minuteHandDeg
    let secondHandDeg = 180 + map(second(),0,60,0,360);
    //minute hand will point at current minute
    let minuteHandDeg = 180 + map(minute(),0,60,0,360);
    //hour hand will point at current hour, fix for 24 hours digital clock
    let fixHour = hour();
    if(fixHour > 12) {
      fixHour -= 12;
    }
    let hourHandDeg = 180 + map(fixHour,0,12,0,360);

    //white background of clock circle
    fill(250,250,250);
    ellipse(width/2,height/2,width-(width/8),height-(height/8));

    //hour,minute hands and marks on edge of clock fill
    fill(25,25,25);

    //hour and second marks on edge of clock
    for(var i = 0; i < 360; i += (360/60)) {
      //30 degrees for ever hour
      let hourT = i/30;
      //if its an hour, make the time on the outside of the clock
      if(i % 30 === 0) {
        push();
        translate(width/2,height/2)
          //rotate i degrees + 1 hour, so we can display 1-12, instaed of 0-11
          rotate(i+30);
          textSize(25);
          //position of hour
          text(hourT + 1,0,-(height/2)+(height/28))
        pop();
      }
      push();
      translate(width/2,height/2);
      rotate(180 + i);
      if(i % 5 === 0){
        rect(0,(height/2)-(height/8),25,80);
        text(i,0,(height/2)-(height/5));
      } else {
        rect(0,(height/2)-(height/10),10,30);
        text(i,0,(height/2)-(height/8));
      }
      pop();
    }

    //hour hand
    push();
    translate(width/2,height/2);
    rotate(hourHandDeg);
    rect(0,height/10,25,(1*width)/3);
    pop();

    //minute hand
    push();
    translate(width/2,height/2);
    rotate(minuteHandDeg);
    rect(0,(1*height)/8,15,(3*height)/7);
    pop();

    //red fill for second hand
    fill(255,80,80);

    //small ciricle in middle of screen
    push();
    translate(width/2,height/2);
    ellipse(0,0,15,15);
    pop();

    //the second hand line
    push();
    translate(width/2,height/2);
    rotate(secondHandDeg);
    rect(0,height/10,5,(2*height)/6);
    pop();

    //circle at end of second hand
    push();
    translate(width/2,height/2);
    rotate(secondHandDeg);
    ellipse(0,(1*height)/4,height/14,height/14);
    pop();

}

function mouseReleased() {
  if(isLooping === true) {
    noLoop();
    isLooping = false;
  } else {
    loop();
    isLooping = true;
  }
}
