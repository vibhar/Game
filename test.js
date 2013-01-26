var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var intervalId;
var timerDelay = 100;
var t = 0;

var health = 1000;
var healthLimbo = 0;

var bullets = [];

var enemies = [];
var foo = new makeEnemy1(0,0);
enemies.push(foo);



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

var arrX = [];
var arrY = [];
function redrawAll() {
    // erase everything -- not efficient, but simple!
    ctx.clearRect(0, 0, 800, 500);
	
    drawBackground();
	
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
        if (count === 13){enemies.push(new makeEnemy1(0,0));}
        if (count === 19){enemies.push(new makeEnemy1(0,0));}
        if (count === 24){enemies.push(new makeEnemy1(0,0));}
        if (count === 29){enemies.push(new makeEnemy1(0,0));}
    }
    t += timerDelay/100;


	score++;
    
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
            enemy.hitByBullet(bullet);
        });
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


function onKeyDown(event) {
    
    var keyDown = String.fromCharCode(event.keyCode);
	
	if (keyDown === 'G' && health >= 10){
        healthLimbo += 100;
        health-=100;
        return;
    }
	
    if (keyDown === ' '){
        var x = mySquare.posX;
	    var y = mySquare.posY;
        var newBullet = makeBullet1(x, y, 1, 0);
        bullets.push(newBullet);
        return;
    }
    
	event.onkeyup;
	
	arrX = [];
	arrY = [];
	//up Arrow
	if (event.keyCode === 38) {
		bob();
		arrY.push(-3,-5,-9);
		}
	//downArrow
	if (event.keyCode === 40){
		bob();
		arrY.push(3,5,9);

		}
	//leftArrow
	if (event.keyCode === 37){
		arrX.push(-3,-5,-9);
		}
	//rightArrow
	if (event.keyCode===39) {
		arrX.push(3,5,9);
		}
		
	function bob() {
		arrY.push(0,0,-1,0,1,2);
	}

}

function run() {
	canvas.addEventListener('mousedown', onMouseDown, false);
    canvas.addEventListener('keydown', onKeyDown, false);
    // make canvas focusable, then give it focus!
    canvas.setAttribute('tabindex','0');
    canvas.focus();
    intervalId = setInterval(onTimer, timerDelay);
	
}

run();