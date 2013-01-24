
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
}

function makeBullet1(posX, posY, dirX, dirY){
    var drawBulletFunction = function(posX, posY){
        ctx.fillStyle = "rgba(128,0,128,1.0)";
        ctx.fillRect(posX, posY, 30, 10);
    }
    var normDirX = dirX / Math.sqrt(dirX*dirX + dirY*dirY);
    var normDirY = dirY / Math.sqrt(dirX*dirX + dirY*dirY);
    var speed = 10;
    return new Bullet(posX, posY, normDirX, normDirY, speed, 50, drawBulletFunction);
}