//team: Connie Yao (cyao), Sean Donegan (spdonega), Vibha Rao (vibhar)

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var width = canvas.width;
var height = canvas.height;

//arbitrary weaponcost, hullcost for now
var weaponCost = 200;
var hullCost = 300;
//coins you calculate based off of score?
var coins = 300;

var imgBg = new Image();
imgBg.src = "ocean.jpg";

var imgBar = new Image();
imgBar.src = "bar.png";

function drawBackground(screen){
	
	if (screen==="game") {
		ctx.drawImage(imgBg,0, 1/10 * height, width, 4/5 * height);
	}
	else if (screen==="loss") {
		ctx.drawImage(imgBg, 0, 0, width, height);
		ctx.font = "32px Courier New";
		ctx.fillStyle = "white";
		ctx.fillText("Mission Fish Termination: Failure", 75,1/2*height);
        ctx.fillText("Score: " + score, 300, 1/2*height+ 50);
		ctx.font = "26px Courier New";
		ctx.fillText("Replay? Press R!", 275, 1/2*height+100);
	}
	else if (screen==="upgrade") {
		ctx.drawImage(imgBg, 0, 0, width, height);
		
        ctx.font = "36px Courier New";
		ctx.fillStyle = "white";
        ctx.fillText("Mission: Success", 375, 1/4*height);
		ctx.fillText("CHOOSE YOUR UPGRADE", 310, 1/4*height+50);
		
        ctx.font = "20px Courier New";
		ctx.fillText("Better bullets? " + 
                     mySquare.bulletPowerUpgradeCost + 
                     " gold", 
                     80, 1/2*height);
		ctx.fillText("Press W", 80, 1/2*height+30);
		ctx.fillText("Better rate of fire? " + 
                     mySquare.rateOfFireUpgradeCost + 
                     " gold", 
                     500, 1/2*height);
		ctx.fillText("Press H", 500, 1/2*height+30);
		
        ctx.font = "30px Courier New";
		ctx.fillText("Coins Available: " + mySquare.coins, 300, 400);
	}
	else if (screen ==="menu") {
		ctx.drawImage(imgBg, 0, 0, width, height);
		ctx.font = "48px Courier New";
		ctx.fillStyle = "white";
		ctx.fillText("Angry Angry Bob", 300, 100);
		ctx.font = "18px Courier New";
		ctx.fillText("Bob is angry.",10,200);
		ctx.fillText("Bob is a fish.",30,225);
		ctx.fillText("Bob found a fish-sub.",50,250);
		ctx.fillText("And now he's taking revenge.", 70, 275);
		
		//black transparent box
		ctx.fillStyle = "rgba(0,0,0,0.5)";
		ctx.fillRect(450, 150, 260, 225);
		ctx.font = "20px Courier New";
		ctx.fillStyle = "white";
		ctx.fillText("Mission Objective:",470, 180);
		ctx.fillText("KILL ALL FISH.", 470, 210);
		ctx.fillText("S: Start", 470, 270);
		ctx.fillText("space: Shoot", 470,300);
		ctx.fillText("arrows: Move", 470, 330);
	}
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
    

    ctx.drawImage(imgBar,0, 0, width, 1/10 * height);
	// ctx.fillStyle = "rgba(6,42,140,1.0)";
    // ctx.fillRect(0, 0, 800, 50);

    //draw the health bar
    ctx.fillStyle = "rgba(0,0,0,1.0)";
    ctx.strokeRect(249, 10, 301, 30);
    
    drawHealthBar();

    //level and score
    ctx.font = "28px Geneva";
    ctx.fillStyle = "white";
    ctx.fillText("Level " + levelObject.levelNum, 50, 40);
    ctx.fillText("Score: " + score, 625, 40);
}

function drawBottomMenuBar(){

    ctx.drawImage(imgBar,0, 9/10*height, width, 1/10 * height);
    // ctx.fillStyle = "rgba(6,42,140,1.0)";
    // ctx.fillRect(0, 450, 800, 50);
}
