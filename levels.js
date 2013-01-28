function Level(levelNum){
    // this.numWaves = Math.ceil(levelNum / 2) + 1;

    function makeEnemies(){
        var numWaves = Math.ceil(levelNum / 2) + 1;
        var enemyList = [];
        while (numWaves > 0){
            var randomNumber=Math.floor(Math.random()*4);
            var enemyToAdd;
            if (randomNumber === 0)
                enemyToAdd = makeEnemy1(800,0);
            else if(randomNumber === 1)
                enemyToAdd = makeEnemy2(800,0);
            else if(randomNumber === 1)
                enemyToAdd = makeEnemy3(800,500);
            else 
                enemyToAdd = makeEnemy4(800,400);
            enemyList.push(enemyToAdd);
            numWaves--;
        }
        return enemyList;
    }

    this.enemies = makeEnemies();
    this.levelNum = levelNum;
}
