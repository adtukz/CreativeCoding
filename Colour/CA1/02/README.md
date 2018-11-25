# Creative Coding Year 4 - Colour
## Part 2 - Clouds

[Go back to CA!](../) or [See the sketch in action!](sketch.html)

Now we want to create a cloud on the canvas. To do this we have created three cloud functions, for three seperate cloud styles that will appear. Each cloud is created using bezier curves, and then a beginShape(), endShape() of the points of the curve to fill in the middle.

The bezier() function takes in co-ordinates and then draws a curve between the first and last co-ordinates given to it, using the middle co-ordinates as control points in the curve. This is how we create the outside of the clouds.

Here is a sample of one of the cloud functions. We pass in two parameters, where we want the cloud to begin, and where we want the cloud to end. We then add and subtract from these points to create the cloud.
```javascript
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
```

[See the sketch in action!](sketch.html)
