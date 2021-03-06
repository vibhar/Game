//team: Connie Yao (cyao), Sean Donegan (spdonega), Vibha Rao (vibhar)

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var intervalId;
var timerDelay = 100;
var t = 0;

var health = 1000;
var healthLimbo = 0;

var bullets = [];
var enemies = [];
var bubbles = [];

var mySquare;
var levelObject;
var bubbleObject;
var waveCount;
var delay;
var enemiesInWave;

arrX = [];
arrY = [];

var screen = "menu";
var count = 0;

var deadCount = 0;
var missCount = 0;

var bulletInterval;

/****/
var globals = {};
globals.keysDown = {};

keyPressed = function(event){
    globals.keysDown[event.keyCode] = true;
}

keyReleased = function(event){
    globals.keysDown[event.keyCode] = undefined;
}

function timerFired(){
	
	//upArrow
    if (globals.keysDown[38]) {
		arrY = [];
        bob();
		arrY.push(-3,-5,-12);
		}
	//downArrow
    if (globals.keysDown[40]) {
		arrY = [];
        bob();
		arrY.push(3,5,9);
		}
	//leftArrow
	if (globals.keysDown[37]) {
		arrX = [];
        arrX.push(-3,-5,-12);
		}
	//rightArrow
	if (globals.keysDown[39]) {
		arrX = [];
        arrX.push(3,5,12);
		}
	//space - fires bullets
	if (bulletInterval === 0 && globals.keysDown[32]) {
		var x = mySquare.posX;
	    var y = mySquare.posY;
        var newBullet = makeBullet1(x, y, 1, 0, mySquare.bulletPower);
        bullets.push(newBullet);
        bulletInterval = mySquare.rateOfFire;
        return;
	}
	//TODO
	//h - upgrade rate of fire
	if (screen === "upgrade" && globals.keysDown[72]) {
		if (mySquare.canUpgradeRateOfFire()){
			mySquare.upgradeRateOfFire();
		}
		screen = "game";
	}
	//TODO
	//w - better bullet power 
	if (screen === "upgrade" && globals.keysDown[87]) {
		if (mySquare.canUpgradeBulletPower()){
			mySquare.upgradeBulletPower();
		}
		screen = "game";
	}
	//r - reset (to level 1), or s - start
	if (globals.keysDown[82]||globals.keysDown[83]) {
		screen = "game";
		clearGame();
		level = 1;
		return;
	}
	//g - lowers health (for testing)
	if (globals.keysDown[71]) {
		if (health>=100){
			healthLimbo += 100;
			health-=100;
        return;
		}
	}
	
	
	function bob() {
		arrY.push(0,0,-1,0,1,2,-1,-2,-3);
	}
	
	function clearGame () {
		health = 1000;
		healthLimbo = 0;
		arrX = [];
		arrY = [];
		timerDelay = 100;
		t = 0;
		enemies = [];
		bubbles = [];
		count = 0;
		score = 0;
		deadCount = 0;
		missCount = 0;

		levelObject = new Level(1);
		bubbleObject = new BubbleObject();
		waveCount = levelObject.numWaves;
		delay = 20;
		enemiesInWave = 4;
		enemies.push(levelObject.enemies.pop());
		bubbles.push(bubbleObject.bubbles.pop());
		enemiesInWave--;
		mySquare = new Player(250,250);
		bulletInterval = mySquare.rateOfFire;
	}
}

var score = 0;
var level = 1;

function redrawAll() {
    // erase everything -- not efficient, but simple!
    ctx.clearRect(0, 0, 800, 500);
	
    drawBackground(screen);
	timerFired();
	
	if (screen==="game") {
		
		if (arrY.length!=0) {
			mySquare.updatePos(0,arrY.pop());
		}
		if (arrX.length!=0) {
			mySquare.updatePos(arrX.pop(),0);
		}
		
		//player
		mySquare.drawPlayer();
		
		bullets.forEach(function(bullet){
			bullet.drawBullet();
		});

		enemies.forEach(function(enemy){
			enemy.drawEnemy();
		});
		
		drawTopMenuBar(health, healthLimbo);
		drawBottomMenuBar();
		
		bubbles.forEach(function(bubble){
			bubble.drawAirBubble();
		});
	}

	
	if (health<=0) {
		screen = "loss";
	}
}

function onTimer() {
	if (screen==="game") {
		count++;

		if (bulletInterval>0) bulletInterval--;

		if (delay > 0)
			delay--;
		
		t += timerDelay/100;

		if (enemiesInWave === 0 && 
			delay === 0 && 
			enemies.length === 0 && 
			levelObject.enemies.length === 0){
			
			screen = "upgrade";
			// console.log("new level");
			var oldLevelNum = levelObject.levelNum;
			levelObject = new Level(oldLevelNum+1);
			bubbleObject = new BubbleObject();
			waveCount = levelObject.numWaves;
			enemiesInWave = 4;
			bubbles.push(bubbleObject.bubbles.pop());
			enemies.push(levelObject.enemies.pop());
			enemiesInWave--;
			delay = 20;
		}
		else if (waveCount !== 0 && enemiesInWave !== 0 && delay === 0){
			// console.log("adding enemy");
			enemies.push(levelObject.enemies.pop());
			delay = 20;
			enemiesInWave--;
		}
		else if (enemiesInWave === 0 && waveCount !== 0)
		{
			delay = 50;
			waveCount--;
			if (waveCount !== 0)
				enemiesInWave = 4;
		}
		
		//update health limbo (orange part of health bar)
		if (healthLimbo >= 10){healthLimbo -= 20;}
		
		//move bullets
		bullets.forEach(function(bullet){
			bullet.updatePos();
		});

		//move enemies
		enemies.forEach(function(enemy){
			enemy.updatePos(t, timerDelay, count);
		});

		//enemy bullet collisions
		enemies.forEach(function(enemy){
			bullets.forEach(function(bullet){
				enemy.hitByBullet(bullet);
				//console.log(enemy.health);
			});
			
			health = (health - enemy.collidePlayer(mySquare));
			//cconsole.log(enemy.health);
		});

		bubbles.forEach(function(bubble){
			bubble.updatePos(t, timerDelay);
			if (health <= 90) {
				health = (health - bubble.collidePlayer(mySquare));
			}
		});

		//remove dead or off screen enemies
		for (var i = enemies.length-1; i >= 0; i--){
			//console.log(enemies[i].health);
			if (enemies[i].isAlive() === false) {
				console.log(enemies[i]);
				deadCount++;
				enemies.splice(i,1);
				score += 50;
				mySquare.coins += 50;
			}
			else if (enemies[i].isOffScreen()) {
				missCount++;
				enemies.splice(i,1);
			}
		}
		
		//remove used up or off screen bullets
		for (var i = bullets.length-1; i >= 0; i--){
			if (bullets[i].usedUp || bullets[i].isOffScreen()){
				bullets.splice(i,1);
			}
		}

		//remove bubbles used up or off screen 
		for (var i = bubbles.length-1; i >= 0; i--){
			//console.log(enemies[i].health);
			if (bubbles[i].exists() === false) {
				console.log(bubbles[i]);
				bubbles.splice(i,1);
			}
			else if (bubbles[i].isOffScreen()) {
				bubbles.splice(i,1);
			}
		}
		
	}
    
    redrawAll();
}

function run() {

	canvas.addEventListener('keydown', this.keyPressed, false);
	canvas.addEventListener('keyup', this.keyReleased, false);
    // make canvas focusable, then give it focus!
    canvas.setAttribute('tabindex','0');
    canvas.focus();
    intervalId = setInterval(onTimer, timerDelay);
	
}

run();
