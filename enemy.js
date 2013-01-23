//requies bullet.js

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

function Enemy(posX, posY, posFunction, health, armor, drawEnemyFunction)
{
    this.posX = posX; 
    this.posY = posY;
    this.posFunction = posFunction; 
    this.health = health; 
    this.armor = armor;
    this.drawEnemyFunction = drawEnemyFunction;

    this.updatePos = function(t){
        var newPos = this.posFunction(t);
        this.posX = newPos[0];
        this.posY = newPos[1];
    }

    this.drawEnemy = function(){
        this.drawEnemyFunction(this.posX, this.posY);
    }
    this.bulletDamage = function(bullet){
        this.health -= bullet.damage * 1/(this.armor);
    }

    this.isAlive = function(){
        return this.health > 0;
    }

}


function makeEnemy1(posX, posY)
{
    var posFunction = function(t, prevPosX, prevPosY){
        return [t, 100 * Math.sin(t)]
    }
    var drawEnemyFunction = function(posX, posY){
        ctx.fillStyle = "rgba(255,128,128,0.5)";
        ctx.fillRect(posX, posY, 15, 15);
    }
    return new Enemy(posX, posY, posFunction, 100, 1,drawEnemyFunction);
}