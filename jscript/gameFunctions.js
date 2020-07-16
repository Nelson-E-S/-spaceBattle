/**Requires: min/max numbers; get random decimal number between min/max inclusive of both*/
function rnd(min, max){
    return (Math.random() * (max - min + 1)) + min;
}

/**Standard Player ship setup returning SpaceShip object*/
function loadPlayer(){
    let ship = new SpaceShip;
    ship.setType('player_main');
    ship.setID('player_main');
    ship.setFaction('player');
    let hull = 20;
    ship.setHull(hull);
    ship.setBaseHull(hull);
    ship.setFirepower(5);
    ship.setAccuracy(0.7);
    return ship;
}

/**Requires: id; return SpaceShip object for enemy with randomized stats*/
function loadEnemy(i){
    let ship = new SpaceShip;
    ship.setType('enemy_simple')
    ship.setID(`enemy_${i}`);
    ship.setFaction('enemy');
    let hull = Math.floor(rnd(3,6));
    ship.setHull(hull);
    ship.setBaseHull(hull);
    ship.setFirepower(Math.floor(rnd(2,4)));
    ship.setAccuracy(Math.floor(rnd(6,8))/10);
    return ship;
}

/**Requires: number of enemies to spawn; returns and array of Enemy SpaceShip objects*/
function loadEnemySet(n){
    let shipSet = [];
    for(let i = 1; i <= n; i++)
        shipSet.push(loadEnemy(i));
    return shipSet;
}

/**updates controls as necessary, uses a global Game object*/
function updateGame(state){
    window.game.setGameState(state);
}

/**creates a new game and initializes actors and setups */
function newGame(){
    clearEnemySpace();
    window.game = new Game()
    window.game.addPlayerShips();
    window.game.drawPlayerShips();
    window.game.addEnemyShipSet();
    window.game.drawEnemyShips();
    window.game.setPlayerWinState("undecided");
    window.game.eraseMessageBox();
    window.game.updateGameControls();
}

/**calls the Game objects attack phase plan */
function attack(){
    window.game.attackPhase();
}
function retreat(){
    window.game.retreatPhase()
}

/**get all number of currently drawn enemies*/
function getCurrentEnemeies(){
    return document.querySelectorAll(".enemy").length;
}

/**checkbox handler for player choice*/
function sendPlayerChoice(cBox){
    let enemies = document.querySelectorAll('.enemy');
    if(cBox.checked){
        for(enemy in enemies){
            if(enemies[enemy].id === cBox.value){
                window.game.setPlayerChoice(enemy);
                let eSelector = document.querySelectorAll(".enemySelector");
                for(e in eSelector){
                    if (e != enemy)
                        eSelector[e].checked = false;
                }
            }
        }
    } else
        window.game.setPlayerChoice(0);
    
}