var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

function Bullet(posX, posY, dirX, dirY, speed, damage, drawBulletFunction)
{
    this.posX = posX;
    this.posY = posY;
    this.dirX = dirX;
    this.dirY = dirY;
    
    this.speed = speed;
    
    this.damage = damage;
    this.usedUp = false;
    
    
    this.drawBulletFunction = drawBulletFunction;

    this.drawBullet = function(){
        if (!this.usedUp)
            this.drawBulletFunction(this.posX, this.posY);
    }
    
    this.updatePos = function(){
        this.posX += this.speed * this.dirX;
        this.posY += this.speed * this.dirY;
    }
    
    this.isOffScreen = function(){
        var xOff = (this.posX <= 0 || this.posX >= canvas.width);
        var yOff = (this.posY <= 0 || this.posY >= canvas.height);
        return xOff || yOff;
    }
}

function makeBullet1(posX, posY, dirX, dirY){
    var drawBulletFunction = function(posX, posY){
        ctx.fillStyle = "rgba(255,255,255,1.0)";
        ctx.fillRect(posX, posY, 10, 10);
    }
    var normDirX = dirX / Math.sqrt(dirX*dirX + dirY*dirY);
    var normDirY = dirY / Math.sqrt(dirX*dirX + dirY*dirY);
    var speed = 20;
    return new Bullet(posX, posY, normDirX, normDirY, speed, 50, drawBulletFunction);
}