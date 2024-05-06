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
+ Does each band fragment move independently (using noise)
+ How can color more closely relate to sound
+ How can this be translated into 3D?
+ User interface elements
*/


let mic, fft;
let ptSz;
let bands = 512; //everything is scaled to fit "512"
let div = 4;

function setup() {
  createCanvas(900, 900);
  noFill();

  mic = new p5.AudioIn();
  mic.start();
  fft = new p5.FFT(.9, bands);
  fft.setInput(mic);
  background(45,0, 40);
}

function draw() {

noStroke();
//fill(0);
//stroke(255);
  rect(0, 0, width, height);
  let vol = mic.getLevel();
  let amp = map(vol,0,1, 0, 500);
  let cs = map (amp, 0, 500, 0 , 200);


  ptSz = map (cs, 0, 100, 0, 300);

  let lerpSz = lerp (0, ptSz, .4);


  //print(ptSz);
  

  let move =  noise((0.0005/(vol))* frameCount);

  let spectrum = fft.analyze();


push();
translate (400+move, 400+move);
let angle = frameCount * 0.01;
  rotate(-angle);

 drawPoints(0, bands/div, 50, 1, 120);
  push();
  

  
  translate(250,150);
  rotate(PI);
  drawPoints(bands/div*3, bands/div*4, 0, 235, 53, 92); //GREEN
  pop();

  push();
translate(-25,random(move));
rotate (PI);
  drawPoints(bands/div*2, bands/div*3, 0, 235, 213);//BLUE
  pop();

  push();
  translate(0,0);
  drawPoints(bands/div, bands/div*2, 255,0,0);
pop();

push()
translate(0,0);
 drawPoints(0, 200, 255, 23, 155);
pop();

  drawPoints(0, 200, 45,0, 40);

  pop();
  
  
  

  function drawPoints(start,end,r,g,b) {
   
    beginShape();
    for (i = start; i < end; i ++) {
      let p1 = createVector(i, map(spectrum[i], 0, random (150,900), 0,height));
    
      //let v1 = p5.Vector.normalize(v0);
      //vertex(p1.x, p1.y);
      push();
      stroke(r,g,b,25);
      strokeWeight(lerpSz);
      strokeCap(SQUARE);
      translate()
      point(p1.x + move, p1.y);
      pop();
      endShape();
    }
    }
  }

