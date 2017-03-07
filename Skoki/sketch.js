var gravity=0.76;
var obsSpeed=2;
var speedAtJump=6;
var addingSpeed=0.55;
var howManyObstacles=6;
var lifes=1;

function setup() {
  createCanvas(650,250);
  createJumper();
  for(var i=0 ; i<howManyObstacles ; i++) {
    obstacles.push(new Obstacle(600+i*300));
  }
  setInterval(incrementSpeed,500);
  createDOM();
}

function draw() {
  if(!started) {
    noLoop()
    text1.html("Click to start!");
  }
  background(170,210,230);
  extraPoints+=0.0001;
  points+=extraPoints;
  for(var i=0 ; i<obstacles.length ; i++) {
    obstacles[i].update();
    obstacles[i].show();
  }
  health.update();
  if(show) health.show();
  jumper.update();
  jumper.show();
  addToSpeed();
  intersect();
  ifCrash();
  updateDoms();
}

function mousePressed() {
  if(onground && !crash && canJump) {
    jumper.speed=-speedAtJump;
  }
  if(crash&&temporaryLifes>=0) {
    again();
  }
  if(!started) {
    started=true;
    loop();
    text1.html("");
  }
  canJump=true;
}
function keyPressed() {
  if(looping) {
    noLoop();
  } else {
    loop();
  }
  looping=!looping;

}
