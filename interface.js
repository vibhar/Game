var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var width = canvas.width;
var height = canvas.height;

function drawBackground(){
    ctx.fillStyle = "rgba(0,0,0,1.0)";
    ctx.fillRect(0, 1/10 * height, width, 4/5 * height);
}

function drawTopMenuBar(health, healthLimbo){
    ctx.fillStyle = "rgba(127,127,127,1.0)";
    ctx.fillRect(0, 0, 800, 50);

    //draw the health bar
    ctx.fillStyle = "rgba(0,0,0,1.0)";
    ctx.strokeRect(249, 10, 301, 30);
    
    var healthBarLimboWidth = healthLimbo / 1000 * 300;
    var healthBarWidth = health / 1000 * 300;

    //green health
    ctx.fillStyle = "rgba(0,255,128,1.0)";
    ctx.fillRect(250, 11, healthBarWidth, 28);
    
    //red health
    ctx.fillStyle = "rgba(255,28,36,1.0)";
    ctx.fillRect(250 + healthBarWidth, 11, 300 - healthBarWidth, 28);
    
    //orangey health
    ctx.fillStyle = "rgba(211,83,39,1.0)";
    ctx.fillRect(250 + healthBarWidth, 11, healthBarLimboWidth, 28);

    //level and score
    ctx.font = "bold 32px Arial";
    ctx.fillStyle = "black";
    ctx.fillText("Level " + level, 50, 40);
    ctx.fillText(score, 725, 40);
}

function drawBottomMenuBar(){
    ctx.fillStyle = "rgba(127,127,127,1.0)";
    ctx.fillRect(0, 450, 800, 50);
}