/**
 * @name Frequency Spectrum
 * @arialabel Audio waves are graphed on a grey screen based on the user’s audio input into their mic
 * @description <p>Visualize the frequency spectrum of live audio input.</p>
 * <p><em><span class="small"> To run this example locally, you will need the
 * <a href="http://p5js.org/reference/#/libraries/p5.sound">p5.sound library</a>
 * and a running <a href="https://github.com/processing/p5.js/wiki/Local-server">local server</a>.</span></em></p>
 */

/*
Possible directions:  
+ Where can variables be added?
+ Functionalize the band visuals
+ Does each band fragment move independently (using noise)
+ Can the color change as the amplitude of the band changes
+ How can this logic be translate into 3D?
*/


let mic, fft;
let ptSz = 12;

function setup() {
  createCanvas(710, 710, WEBGL);
  noFill();

  mic = new p5.AudioIn();
  mic.start();
  fft = new p5.FFT(0.9, 128);
  fft.setInput(mic);
  
}

function draw() {
  //background(200);
  fill(255, 2);
  rect(0, 0, width, height);
  strokeCap(SQUARE);

  let move = 700 * noise(0.005 * frameCount);
  let spectrum = fft.analyze();

  beginShape();
  for (i = 0; i < 31; i += 1) {
    let p1 = createVector(i, map(spectrum[i], 0, 255, height, 0));
    let p2 = createVector(spectrum.length - 1, height);
    let p3 = createVector(p2, (height, 0));
    let p4 = (p3, i);

    push();
    //stroke(255, 0, 100);
   // strokeWeight(random(ptSz));
    //strokeCap(SQUARE);
    fill(0);
   // point(p1.x + move, p1.y);
    square(p1.x + move, p1.y, 20);
    pop();

    endShape();
  }
  beginShape();
  for (i = 32; i < 54; i += 1) {
    let p1 = createVector(i, map(spectrum[i], 0, 255, height, 0));
    let p2 = createVector(spectrum.length - 1, height);
    let p3 = createVector(p2, (height, 0));
    let p4 = (p3, i);

    //let v1 = p5.Vector.normalize(v0);

    push();
    stroke(255, 50, 75);
    strokeWeight(random(ptSz));
    strokeCap(SQUARE);
    point(p1.x + move, p1.y);
    pop();

    endShape();
  }
  beginShape();
  for (i = 61; i < 88; i += 1) {
    let p1 = createVector(i, map(spectrum[i], 0, 255, height, 0));

    //let v1 = p5.Vector.normalize(v0);
    //vertex(p1.x, p1.y);
    push();
    stroke(240, 100, 50);
    strokeWeight(random(ptSz));
    strokeCap(SQUARE);
    point(p1.x + move, p1.y);
    pop();

    //vertex(p1.x, p1.y+30);
    //vertex(p1.x, p1.y+30);

    endShape();
  }

  beginShape();
  for (i = 95; i < 127; i += 1) {
    let p1 = createVector(i, map(spectrum[i], 0, 255, height, 0));

    //let v1 = p5.Vector.normalize(v0);
    //vertex(p1.x, p1.y);
    push();
    stroke(139, 150,250);
    strokeWeight(random(ptSz));
    strokeCap(SQUARE);
    point(p1.x + move, p1.y);
    point();
    pop();

    //vertex(width/p1.x, p1.y);
    //vertex(p1.x, p1.y+30);

    endShape();


  }
}
