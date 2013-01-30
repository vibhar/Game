//team: Connie Yao (cyao), Sean Donegan (spdonega), Vibha Rao (vibhar)
//requires bullet.js

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var enemyWidth = 15;
var enemyHeight = 15;
var bulletWidth = 10;
var bulletHeight = 10;
var playerWidth = 25;
var playerHeight = 25;

function Enemy(posX, posY, posFunction, drawEnemyFunction, 
               numSprites, level, width, height)
{
    this.posX = posX; 
    this.posY = posY;

    this.width = width;
    this.height = height;

    this.posFunction = posFunction; 
    this.health = 50 + 20 * level;
    this.armor = 1 + level / 2;
    this.drawEnemyFunction = drawEnemyFunction;
    this.damage = 100;
    this.frame = 0;
    this.count = 0;
    this.speed = 1 / 10;
    this.numSprites = numSprites;


    this.updatePos = function(t, dt, count){
        var newPos = this.posFunction(t, dt, this.posX, this.posY, this.speed);
        this.posX = newPos[0];
        this.posY = newPos[1];
        this.count++;
        this.count = this.count % (this.numSprites * 4);

        this.frame = Math.floor(this.count / 4);
    }

    this.drawEnemy = function(){
        if (this.isAlive())
            this.drawEnemyFunction(this.posX, this.posY, this.frame);
    }
    this.bulletDamage = function(bullet){
        return bullet.damage * 1/(this.armor);
    }

    this.isAlive = function(){
        // console.log(this.health > 0);
        return this.health > 0;
    }

    this.isOffScreen = function(){
        var xOff = (this.posX <= 0 || this.posX >= canvas.width);
        var yOff = (this.posY <= 0 || this.posY >= canvas.height);
        return xOff || yOff;
    }

    this.hitByBullet = function(bullet){

        if (this.posX <= (bullet.posX + bullet.width) &&
            bullet.posX <= (this.posX + this.width) &&
            this.posY <= (bullet.posY + bullet.height) &&
            bullet.posY <= (this.posY + this.height)){

            console.log("hit by bullet");
            this.health -= this.bulletDamage(bullet);
            bullet.usedUp = true;
            return true;
        }    
		return false;
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

var angryfish = new Image();
angryfish.src = "fish/angryfish_sheet.png";
angryfish.onload = function() {
  var canvas = document.getElementById("myCanvas");
  var ctx = canvas.getContext("2d");
}

var swordfish = new Image();
swordfish.src = "fish/swordfish_aggro_sheet.png";
swordfish.onload = function() {
  var canvas = document.getElementById("myCanvas");
  var ctx = canvas.getContext("2d");
}

var pufferfish = new Image();
pufferfish.src = "fish/pufferfish_sheet.png";
pufferfish.onload = function() {
  var canvas = document.getElementById("myCanvas");
  var ctx = canvas.getContext("2d");
}

var crab = new Image();
crab.src = "fish/crab_attack_sheet.png";
crab.onload = function() {
  var canvas = document.getElementById("myCanvas");
  var ctx = canvas.getContext("2d");
}

function makeEnemy2(posX, posY, level)
{
    var posFunction = function(t, dt, prevPosX, prevPosY, speed){
        return [prevPosX-speed*dt, 200 + 50 * Math.sin(1/10*t)];
    }
    var drawEnemyFunction = function(x, y, frame){
        ctx.drawImage(swordfish, 
                      142*frame, 0, 
                      142, 48, 
                      x, y, 
                      100, 50);
    }

    return new Enemy(posX, posY, posFunction, drawEnemyFunction, 
                     4, level, 100, 50);
}


function makeEnemy3(posX, posY, level)
{
    var posFunction = function(t, dt, prevPosX, prevPosY, speed){
        return [prevPosX-speed*dt, prevPosY];
    }
    var drawEnemyFunction = function(x, y, frame){
        ctx.drawImage(pufferfish,
                      48*frame, 0,
                      48, 47,
                      x, y,
                      50, 50);
    }

    return new Enemy(posX, posY, posFunction, drawEnemyFunction, 
                     4, level, 50, 50);
}


function makeEnemy4(posX, posY, level)
{
    var posFunction = function(t, dt, prevPosX, prevPosY, speed){
        return [prevPosX-speed*dt, prevPosY];
    }
    var drawEnemyFunction = function(x, y, frame){
        ctx.drawImage(crab, 
                      48*frame, 0,
                      48, 64,
                      x, y,
                      50, 50);
    }

    return new Enemy(posX, posY, posFunction, drawEnemyFunction,
                     2, level, 50, 50);
}

function makeEnemy1(posX, posY, level)
{
    var posFunction = function(t, dt, prevPosX, prevPosY, speed){
        return [prevPosX-speed*dt, 300 + 100 * Math.sin(1/10*t)];
    }
    var drawEnemyFunction = function(x, y, frame){
        
        ctx.drawImage(angryfish,
                      48*frame, 0,
                      48, 32,
                      x, y,
                      50, 50);
    }

    return new Enemy(posX, posY, posFunction,drawEnemyFunction,
                     4, level, 50, 50);
}
