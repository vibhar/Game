
function Bullet(posX, posY, dirX, dirY, damage, drawBulletFunction)
{
    this.posX = posX;
    this.posY = posY;
    this.dirX = dirX;
    this.dirY = dirY;
    this.damage = damage;
    this.usedUp = false;
    this.drawBulletFunction = drawBulletFunction;

    this.drawBullet = function(){
        if (!this.usedUp)
            this.drawBulletFunction(this.posX, this.posY);
    }
}

function makeBullet1(posX, posY, dirX, dirY){
    var drawBulletFunction = function(posX, posY){
        ctx.fillStyle = "rgba(128,0,128,1.0)";
        ctx.fillRect(posX, posY, 30, 10);
    }
    return new Bullet(posX, posY, dirX, dirY, 50, drawBulletFunction);
}