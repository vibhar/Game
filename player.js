//team: Connie Yao (cyao), Sean Donegan (spdonega), Vibha Rao (vibhar)

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var player = new Image();
player.src = "fish/player.png";
player.onload = function() {
  var canvas = document.getElementById("myCanvas");
  var ctx = canvas.getContext("2d");
}


function Player(posX, posY){
    
    this.posX = posX;
    this.posY = posY;
	
    this.width = 60;
    this.height = 52;

    this.rateOfFire = 8;
    this.bulletPower = 1;

    this.rateOfFireUpgradeCost = 100;
    this.bulletPowerUpgradeCost = 100;

    this.health = 100;

    this.coins = 0;

    this.isOffScreen = function(){
        return !(this.posX >= 0 && 
                this.posX <= (canvas.width - 25) &&
                this.posY >= (1/10 * canvas.height) &&
                this.posY <= (9/10*canvas.height-25))    
    }

    this.updatePos = function(x, y){
        this.posX += x;
        this.posY += y;
        if (this.isOffScreen()){
            this.posX -= x;
            this.posY -= y;
        }
    }

    this.drawPlayer = function(){
        //ctx.fillStyle = "rgba(255,247,0,0.5)";
        //ctx.fillRect(this.posX, this.posY, 25, 25);
        ctx.drawImage(player, this.posX, this.posY);
    }

    this.canUpgradeRateOfFire = function(){
        return this.rateOfFire > 1 &&
               this.rateOfFireUpgradeCost <= this.coins;
    }

    this.canUpgradeBulletPower = function(){
        return this.bulletPowerUpgradeCost <= this.coins;
    }

    this.upgradeRateOfFire = function(){
        this.rateOfFire -= 1;
        this.coins -= this.rateOfFireUpgradeCost;
        this.rateOfFireUpgradeCost *= 2;

    }

    this.upgradeBulletPower = function(){
        this.bulletPower += 0.5;
        this.coins -= this.bulletPowerUpgradeCost;
        this.bulletPowerUpgradeCost *= 2;
    }
}
