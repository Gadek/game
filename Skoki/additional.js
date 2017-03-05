var jumper;
var obstacles=[];
var crash=false, onground=true,canJump=false;
var text1, text2, text3, points=0;
var temporaryLifes=lifes;
var tempSpeed=obsSpeed;
var button;
var extraPoints=0;
var looping=true;
var started=false;
var show=true;
var healthPosition=20000;
var health= {
  x:healthPosition,
  y:60, //Lepiej nie tykać tej wartości
  w:20,
  h:20,
  update:function() {
    this.x+=-tempSpeed;
  if(this.x<-this.w) {
    this.x=healthPosition;
    show=true;
  }
},
  show:function() {
    fill(0,100,255);
    rect(this.x,this.y,this.w,this.h,6);
  }
};
//functions in SETUP
function createJumper() {
  jumper={
    x:70,
    y:height,
    h:100,
    w:13,
    col:100,
    speed:0,
    update:function() {
      this.y+=this.speed;
      this.speed+=gravity;
      onground=false;
      if(this.y>height) {
        this.speed=0;
        this.y=height;
      }
      if(this.y==height) {
        onground=true;
      }
    },
    show:function() {
      fill(this.col)
      rect(this.x,this.y-this.h,this.w,this.h);
    }
  };
}
function createDOM() {
  text1=createElement("h1","");
  text1.id("top")
  text1.position(20,10)
  text2=createElement("h3","");
  text2.id("points")
  text3=createElement("h2","Pozostało żyć: "+temporaryLifes)
  text3.id("lifes")
}
function Obstacle(x) {
  this.w=25;
  this.h=11;
  this.x=x;
  this.y=height-this.h;
  this.update=function() {
    this.x+=-tempSpeed;
    if(this.x<-this.w) {
      this.x=width-this.w+random(0,150);
      points++;
    }
  }
  this.show=function() {
    fill(200,0,100);
    rect(this.x,this.y,this.w,this.h);
  }
}


//functions in DRAW
function intersect() {

    //INTERSECTING OBSTALCES
  for(var i=0 ; i<obstacles.length ; i++) {
      var o=obstacles[i]
      if(o.x<jumper.x+jumper.w && o.x+o.w>jumper.x && jumper.y>o.y) {
          crash=true;
          break;
        } else {
          crash=false;
        }
  }

    //INTERSECTINGS HEALTH
    if(health.x<jumper.x+jumper.w && health.x+health.w>jumper.x
     &&  jumper.y<180 ){
        addToLife();
        show=false;
    }
}
function addToSpeed() {
  if(mouseIsPressed ) {
    jumper.speed+=-addingSpeed;
  }
}
function incrementSpeed() {
   tempSpeed+=0.02;
 }
function updateDoms() {
  text2.html("Ilość punktów: "+floor(points))

}
function ifCrash() {
  if(crash) {
    noLoop();

    if(temporaryLifes==0) {
      text1.html("GAME OVER! Restart to play again");
    } else {
        text1.html("Keep on");
      }
          temporaryLifes--;
    }
}
function addToLife() {
  if(show)temporaryLifes++;
  text3.html("Pozostało żyć: "+temporaryLifes);
}
//functions in MOUSEPRESSED
function again() {
  obstacles.splice(0,obstacles.length)
  for(var i=0 ; i<howManyObstacles ; i++) {
    obstacles.push(new Obstacle(600+i*450))
  }
  loop();
  extraPoints=0;
  text1.html("")
  tempSpeed=obsSpeed;
   if(temporaryLifes==-1) {
       temporaryLifes=lifes;
       points=0;
       canJump=false;
       button.style("display:none");
   }
    if(temporaryLifes>0) {
       text3.html("Pozostało żyć: "+temporaryLifes);
    }
    if(temporaryLifes==0){
        text3.html("Last chance")
    }
    health.x=healthPosition;
}
