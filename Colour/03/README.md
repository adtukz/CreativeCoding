# Creative Coding Year 4 - Colour
## Example 3 - Colour Wheel

[Go back to Colour](../) or [See the sketch in action!](index.html)

In this example we are creating a colour wheel. We do this with the beginShape(Triangle_fan) function.

This will allow us to create a circle, by creating lots of triangles.

We first declare how many segments we want our triangle fan to have. To create a circle we want 360 segments, as there are 360 degrees in a circle. We can reduce the amount of segments to create a circle with more defined triangles.

The setup function does not have anything new in it from previous examples.

```javascript
var segmentCount = 360;
```

The draw function again is where the sketch takes shape. This is where we will be creating our circle.

 ```javascript
function draw() {
    // we redraw the background so if the user changes the segmentCount the old triangle can not be seen underneath the new triangle
    background(0,0,100);
    //we have a starting angle of 0
    var angle = 0;
    //the number of steps in our triangle fan will be equal to the segmentCount.
    var noOfSteps = segmentCount;
    //the angle will increase by 360 divided by the number of steps in our triangle fan.
    //This will allow us to have the circles with bigger segments. As if we change segments is equal to 24 or 45, the angle incrementation will change.
    var angInc = 360/noOfSteps;
    //The radius is how big we want the circle we create to be.
    var radius = 300;

    //beginShape is the function which allows us to draw our circle
    beginShape(TRIANGLE_FAN);
        //the beginning point is the middle of our canvas.
        vertex(width/2,height/2);

        //we create a loop for each other point in our shape.
        //for(angle is 0, angle is less than 360, angle increase by angle incrementation)
        //this means we start at 0 degrees.
        //We go from 0 to 360 degrees.
        //We increase the angle by angle incrementation necessary for the numbr of segments we want.(i.e if we have 360 segments, it will increase by 1 each time)
        for(var angle = 0; angle <= 360; angle += angInc) {
            //Each vertex requires an x and y value.
            //radians(angle), is used because p5 uses radians rather than degrees, meaning we must convert our degrees to radians.

            //each point will start from the middle of our canvas, as our first point above did.

            //vx(vertex X) is radius times the cosine of the angle, plus have the width
            var vx = radius * cos(radians(angle)) + width/2;
            //vy(vertex Y) is radius times the sine of the angle, plus have the height
            var vy = radius * sin(radians(angle)) + height/2;
            //fill is the current angle so that the Hue is based on where in the cirlce its currently drawing, so that we can the full gradient of colours.
            fill(angle,100,100);
            vertex(vx,vy);
        }
    //endshape will finish the shape and draw it.
    endShape();
}
```

The keypressed function in this sketch, will just allow the user to cycle between the number of segments the circle is made of. This is predetermined as only certain values will allow a full triangle_fan circle to work without a gap.

[See the sketch in action!](index.html)
