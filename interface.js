var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var width = canvas.width;
var height = canvas.height;

function drawBackground(){
	var imgBg = new Image();
	imgBg.src = "ocean.jpg";
	ctx.drawImage(imgBg,0, 1/10 * height, width, 4/5 * height);
    //ctx.fillStyle = "rgba(0,0,0,1.0)";
    //ctx.fillRect(0, 1/10 * height, width, 4/5 * height);
}

function drawHealthBar(){
    var healthBarLimboWidth = healthLimbo / 1000 * 300;
    var healthBarWidth = health / 1000 * 300;

    //green health
    ctx.fillStyle = "rgba(11,218,81,1.0)";
    
    if (healthBarWidth === 300)
        ctx.fillRect(250, 11, healthBarWidth, 28);
    
    else if (healthBarWidth !== 0) {
        ctx.beginPath();
            ctx.moveTo(250, 11);
            ctx.lineTo(250 + healthBarWidth, 11);
            ctx.lineTo(250 + healthBarWidth - 20, 39);
            ctx.lineTo(250, 39);
        ctx.fill();
    }

    //red health
    ctx.fillStyle = "rgba(206,32,41,1.0)";
    
    if (healthBarWidth !== 300 && healthBarWidth !== 0){
        ctx.beginPath();
            ctx.moveTo(250 + healthBarWidth, 11);
            ctx.lineTo(550 , 11);
            ctx.lineTo(550 , 39);
            ctx.lineTo(250 + healthBarWidth -20, 39);
        ctx.fill();
    }
    else if (healthBarWidth === 0){
        ctx.fillRect(250, 11, 300, 28);
    }

    ctx.fillRect(250 + healthBarWidth, 11, 300 - healthBarWidth, 28);
    
    //orangey health
    ctx.fillStyle = "rgba(211,83,39,1.0)";
    if (healthBarWidth !== 0){
        ctx.beginPath();
            ctx.moveTo(250 + healthBarWidth, 11);
            ctx.lineTo(250 + healthBarWidth + healthBarLimboWidth , 11);
            ctx.lineTo(250 + healthBarWidth + healthBarLimboWidth - 20 , 39);
            ctx.lineTo(250 + healthBarWidth - 20, 39);
        ctx.fill();
    }

}
function drawTopMenuBar(health, healthLimbo){
    ctx.fillStyle = "rgba(6,42,140,1.0)";
    ctx.fillRect(0, 0, 800, 50);

    //draw the health bar
    ctx.fillStyle = "rgba(0,0,0,1.0)";
    ctx.strokeRect(249, 10, 301, 30);
    
    drawHealthBar();

    //level and score
    ctx.font = "32px Helvetica";
    ctx.fillStyle = "white";
    ctx.fillText("Level " + level, 50, 40);
    ctx.fillText(score, 725, 40);
}

function drawBottomMenuBar(){
    ctx.fillStyle = "rgba(6,42,140,1.0)";
    ctx.fillRect(0, 450, 800, 50);
}