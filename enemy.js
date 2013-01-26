//requies bullet.js

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var enemyWidth = 15;
var enemyHeight = 15;
var bulletWidth = 10;
var bulletHeight = 10;
var playerWidth = 25;
var playerHeight = 25;

function Enemy(posX, posY, posFunction, health, armor, drawEnemyFunction, damage)
{
    this.posX = posX; 
    this.posY = posY;
    this.posFunction = posFunction; 
    this.health = health;
    this.armor = armor;
    this.drawEnemyFunction = drawEnemyFunction;
	this.damage = damage;
	
    this.updatePos = function(t, dt){
        var newPos = this.posFunction(t, dt, this.posX, this.posY);
        this.posX = newPos[0];
        this.posY = newPos[1];
    }

    this.drawEnemy = function(){
        if (this.isAlive())
            this.drawEnemyFunction(this.posX, this.posY);
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


function makeEnemy1(posX, posY)
{
    var posFunction = function(t, dt, prevPosX, prevPosY){
        return [prevPosX-1/10*dt, 300 + 100 * Math.sin(1/10*t)];	
    }
    var drawEnemyFunction = function(x, y){
        ctx.fillStyle = "rgba(255,128,128,0.5)";
        ctx.fillRect(x, y, 15, 15);
    }

    return new Enemy(posX, posY, posFunction, 100, 1,drawEnemyFunction, 100);
}