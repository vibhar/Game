var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var intervalId;
var timerDelay = 100;
var t = 0;

var health = 1000;
var healthLimbo = 0;

var bullets = [];

var enemies = [];
var foo = new makeEnemy1(800,0);
enemies.push(foo);

arrX = [];
arrY = [];

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
	if (globals.keysDown[32]) {
		var x = mySquare.posX;
	    var y = mySquare.posY;
        var newBullet = makeBullet1(x, y, 1, 0);
        bullets.push(newBullet);
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
}
/****/

function Square(x,y){
	this.x = x;
	this.y = y;
}

var mySquare = new Player(250,250);

var score = 0;
var level = 1;

/*function flip (sVal) {
  this.up = sVal;
  this.set = function () {
	if (this.up === true) this.up = false;
	else this.up = true;
  }
}

var bob = new flip(true); */

function redrawAll() {
    // erase everything -- not efficient, but simple!
    ctx.clearRect(0, 0, 800, 500);
	
    drawBackground();
	timerFired();
	
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
	
	// bob.set();
    // if (bob.up) mySquare.y-=3;
    // else mySquare.y+=3;

}

var count = 0;
function onTimer() {
    count++;
    
    //set this to false if you don't want a wave only a single enemy
    //useful for debugging purposes
    var wave = true;
    if (wave){
        if (count === 13){enemies.push(new makeEnemy1(800,0));}
        if (count === 19){enemies.push(new makeEnemy1(800,0));}
        if (count === 24){enemies.push(new makeEnemy1(800,0));}
        if (count === 29){enemies.push(new makeEnemy1(800,0));}
    }
    t += timerDelay/100;


	//score++;
    
    //update health limbo (orange part of health bar)
	if (healthLimbo >= 10){healthLimbo -= 20;}
	
    //move bullets
    bullets.forEach(function(bullet){
		bullet.updatePos();
	});

    //move enemies
    enemies.forEach(function(enemy){
        enemy.updatePos(t, timerDelay);
    });

    //enemy bullet collisions
    enemies.forEach(function(enemy){
        bullets.forEach(function(bullet){
            if (enemy.hitByBullet(bullet)) score+=50;
        });
		health = (health - enemy.collidePlayer(mySquare));
    });
    
    //remove dead or off screen enemies
    for (var i = enemies.length-1; i >= 0; i--){  
        if (!enemies[i].isAlive() || enemies[i].isOffScreen()){              
            enemies.splice(i,1);
        }
    }
    
    //remove used up or off screen bullets
    for (var i = bullets.length-1; i >= 0; i--){
        if (bullets[i].usedUp || bullets[i].isOffScreen()){
            bullets.splice(i,1);
        }
    }
    
    redrawAll();
}

function onMouseDown(event) {
    
	/*var clickX = event.pageX - canvas.offsetLeft;
	var clickY = event.pageY - canvas.offsetTop;
    
	var x = mySquare.x;
	var y = mySquare.y;

	var dirX = clickX - mySquare.x;
	var dirY = clickY - mySquare.y;
	
	var newBullet = makeBullet1(x, y, dirX, dirY);
	bullets.push(newBullet);
	
	score += 100;*/
    
}

function run() {
	//canvas.addEventListener('mousedown', onMouseDown, false);
	canvas.addEventListener('keydown', this.keyPressed, false);
	canvas.addEventListener('keyup', this.keyReleased, false);
    // make canvas focusable, then give it focus!
    canvas.setAttribute('tabindex','0');
    canvas.focus();
    intervalId = setInterval(onTimer, timerDelay);
	
}

run();