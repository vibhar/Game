//team: Connie Yao (cyao), Sean Donegan (spdonega), Vibha Rao (vibhar)

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var airBubbleImg = new Image();
airBubbleImg.src = "fish/bubble.png";
airBubbleImg.onload = function() {
  var canvas = document.getElementById("myCanvas");
  var ctx = canvas.getContext("2d");
}

function Bubble(posX, posY, posFunction, drawAirBubbleFunction, speed, damage) {

  this.posX = posX;
  this.posY = posY;

  this.speed = speed;
  this.damage = damage;
  this.usedUp = false;
  this.health = 100; //Just needs to be nonzero
  this.posFunction = posFunction;


  this.height = 20;
  this.width = 20;

  this.drawAirBubbleFunction = drawAirBubbleFunction;

  this.drawAirBubble = function() {
    this.drawAirBubbleFunction(this.posX, this.posY)
  }

  this.updatePos = function(t, dt) {
    var newPos = this.posFunction(t, dt, this.posX, this.posY, this.speed);
    this.posX = newPos[0]
    this.posY = newPos[1]
  }

  this.exists = function(){
        // console.log(this.health > 0);
        return this.health > 0;
    }

  this.isOffScreen = function() {
    var xOff = (this.posX <= 0 || this.posX >= canvas.width);
    var yOff = (this.posY <= 0 || this.posY >= canvas.height);
    return xOff || yOff;
  }

  this.collidePlayer = function (player) {
    if (this.posX <= (player.posX + player.width) &&
        player.posX <= (this.posX + this.width) &&
        this.posY <= (player.posY + player.height) &&
        player.posY <= (this.posY + this.height)){
          this.health = 0;
          return this.damage;
        }
    else return 0;
  }

}

function makeAirBubble(posX, posY) {

  var posFunction = function(t, dt, prevPosX, prevPosY, speed){
    return [prevPosX, prevPosY - speed*dt]
  }

  var drawAirBubbleFunction = function(posX, posY) {
    ctx.drawImage(airBubbleImg, posX, posY, 20, 20);
  }

  var speed = 1 / 10
  return new Bubble(posX, posY, posFunction, drawAirBubbleFunction, speed, -10)
}
