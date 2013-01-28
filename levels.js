function Level(levelNum){
    this.numWaves = Math.ceil(levelNum / 2) + 1;

    function makeEnemies(){
        var numWaves = Math.ceil(levelNum / 2) + 1;
        var enemyList = [];
        while (numWaves > 0){
            var randomNumber=Math.floor(Math.random()*4);
            console.log(randomNumber);
            if (randomNumber === 0){
                enemyList.push(makeEnemy1(800,0, levelNum));
                enemyList.push(makeEnemy1(800,0, levelNum));
                enemyList.push(makeEnemy1(800,0, levelNum));
                enemyList.push(makeEnemy1(800,0, levelNum));
            }
            else if(randomNumber === 1){
                enemyList.push(makeEnemy2(800,0, levelNum));
                enemyList.push(makeEnemy2(800,0, levelNum));
                enemyList.push(makeEnemy2(800,0, levelNum));
                enemyList.push(makeEnemy2(800,0, levelNum));
            }
            else if(randomNumber === 2){
                enemyList.push(makeEnemy3(800,300, levelNum));
                enemyList.push(makeEnemy3(800,300, levelNum));
                enemyList.push(makeEnemy3(800,300, levelNum));
                enemyList.push(makeEnemy3(800,300, levelNum));
            }
            else{
                enemyList.push(makeEnemy4(800,400, levelNum));
                enemyList.push(makeEnemy4(800,400, levelNum));
                enemyList.push(makeEnemy4(800,400, levelNum));
                enemyList.push(makeEnemy4(800,400, levelNum));
            } 
            numWaves--;
        }
        return enemyList;
    }

    this.enemies = makeEnemies();
    this.levelNum = levelNum;
}
