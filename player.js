var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

function Player(posX, posY){
    
    this.posX = posX;
    this.posY = posY;
	
    this.isOffScreen = function(){
        return !(this.posX >= 10 && 
                this.posX <= (canvas.width - 30) &&
                this.posY >= (1/10 * canvas.height + 10) &&
                this.posY <= (9/10 * canvas.height - 60))    
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
        ctx.fillStyle = "rgba(255,247,0,0.5)";
        ctx.fillRect(this.posX, this.posY, 25, 25);
    }
}