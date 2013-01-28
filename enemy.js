//requires bullet.js

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var enemyWidth = 15;
var enemyHeight = 15;
var bulletWidth = 10;
var bulletHeight = 10;
var playerWidth = 25;
var playerHeight = 25;

var img = new Image();
img.src = "fish/angryfish_sheet.png";

function Enemy(posX, posY, posFunction, health, armor, 
               drawEnemyFunction, damage, numSprites)
{
    this.posX = posX; 
    this.posY = posY;
    this.posFunction = posFunction; 
    this.health = health;
    this.armor = armor;
    this.drawEnemyFunction = drawEnemyFunction;
	this.damage = damage;
    this.frame = 0;
    this.speed = 1/10;
	
    this.updatePos = function(t, dt, count){
        var newPos = this.posFunction(t, dt, this.posX, this.posY, this.speed);
        this.posX = newPos[0];
        this.posY = newPos[1];
        // frame = Math.floor((count % 12) / 3);
    }

    this.drawEnemy = function(){
        if (this.isAlive())
            this.drawEnemyFunction(this.posX, this.posY, this.frame);
    }
    this.bulletDamage = function(bullet){
        this.health -= bullet.damage * 1/(this.armor);
    }

    this.isAlive = function(){
        return this.health > 0;
    }
    
    this.isOffScreen = function(){
        var xOff = (this.posX <= 0 || this.posX >= canvas.width);
        var yOff = (this.posY <= 0 || this.posY >= canvas.height);
        return xOff || yOff;
    }
    
    this.hitByBullet = function(bullet){

        if (this.posX <= (bullet.posX + bulletWidth) &&
            bullet.posX <= (this.posX + enemyWidth) &&
            this.posY <= (bullet.posY + bulletHeight) &&
            bullet.posY <= (this.posY + enemyHeight)){
            this.health -= this.bulletDamage(bullet);
            bullet.usedUp = true;
            return true;
        }    
		return false;
    }

	this.collidePlayer = function (player) {
		if (this.posX <= (player.posX + playerWidth) &&
            player.posX <= (this.posX + enemyWidth) &&
            this.posY <= (player.posY + playerHeight) &&
            player.posY <= (this.posY + enemyHeight)){
            this.health = 0;
			return this.damage;
        }
		else return 0;
	}
}


var angryfish = new Image();
angryfish.src = "fish/angryfish.png";
angryfish.onload = function() {
  var canvas = document.getElementById("myCanvas");
  var ctx = canvas.getContext("2d");
}

var swordfish = new Image();
swordfish.src = "fish/swordfish.png";
swordfish.onload = function() {
  var canvas = document.getElementById("myCanvas");
  var ctx = canvas.getContext("2d");
}

var pufferfish = new Image();
pufferfish.src = "fish/pufferfish.png";
pufferfish.onload = function() {
  var canvas = document.getElementById("myCanvas");
  var ctx = canvas.getContext("2d");
}

var crab = new Image();
crab.src = "fish/crab.png";
crab.onload = function() {
  var canvas = document.getElementById("myCanvas");
  var ctx = canvas.getContext("2d");
}

function makeEnemy2(posX, posY)
{
    var posFunction = function(t, dt, prevPosX, prevPosY, speed){
        return [prevPosX-speed*dt, 200 + 50 * Math.sin(1/10*t)];
    }
    var drawEnemyFunction = function(x, y){
        ctx.drawImage(swordfish, x, y);
    }

    return new Enemy(posX, posY, posFunction, 100, 1,drawEnemyFunction, 100, 1);
}


function makeEnemy3(posX, posY)
{
    var posFunction = function(t, dt, prevPosX, prevPosY, speed){
        return [prevPosX-speed*dt, prevPosY];
    }
    var drawEnemyFunction = function(x, y){
        ctx.drawImage(pufferfish, x, y);
    }

    return new Enemy(posX, posY, posFunction, 100, 1,drawEnemyFunction, 100, 1);
}


function makeEnemy4(posX, posY)
{
    var posFunction = function(t, dt, prevPosX, prevPosY, speed){
        return [prevPosX-speed*dt, prevPosY];
    }
    var drawEnemyFunction = function(x, y){
        ctx.drawImage(crab, x, y);
    }

    return new Enemy(posX, posY, posFunction, 100, 1,drawEnemyFunction, 100, 1);
}

function makeEnemy1(posX, posY)
{
    var posFunction = function(t, dt, prevPosX, prevPosY, speed){
        return [prevPosX-speed*dt, 300 + 100 * Math.sin(1/10*t)];
    }
    var drawEnemyFunction = function(x, y, frame){
        
        ctx.drawImage(img, 48*frame, 0, 47, 32, x, y, 30, 30);
    }

    return new Enemy(posX, posY, posFunction, 100, 1,drawEnemyFunction, 100, 1);
}
