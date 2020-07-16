/**Initializes player/enemy ship to player/enemy space with up to date player/enemy SpaceShip data*/
function drawShip(ship){
    switch (ship.getFaction()){
        case 'player':{
            let section_player = document.getElementById('player_space');
            section_player.innerHTML = playerShipHTML.replace('<id>',ship.getID()).replace('<hull>',ship.getHull()).replace('<fp>',ship.getFirepower()).replace('<acc>',ship.getAccuracy());
            break
        }
        case 'enemy':{
            let section_enemy = document.getElementById('enemy_space');
            section_enemy.innerHTML = enemyShipHTML.replace('<id>',ship.getID()).replace('x',ship.getID().toUpperCase()).replace('<hull>',ship.getHull()).replace('<fp>',ship.getFirepower()).replace('<acc>',ship.getAccuracy());
            break
        }
        default:{
            console.log('Error loading ship faction\n'+ship);
        }
    }
}
/**Updates player/enemy ship html data */
function updateShip(ship){
    let shipHTML = document.getElementById(ship.getID());
    let shipHull = shipHTML.querySelector('#hull');
    shipHull.innerHTML = ship.getHull();
    shipHull.style.background = `linear-gradient(to right, green ${Math.floor((ship.getHull()/ship.getBaseHull())*100)}%, brown 0%)`;
}
/**Removes player/enemy ship from player/enemy space */
function removeShip(ship){
    let shipHTML = document.getElementById(ship.getID());
    shipHTML.remove();
}

/**Sets up controls based on game state */
function updateControls(game){
    let controlBox = document.getElementById('player_controls').querySelector('#controls');
    switch (game.getGameState()){
        case 'start':{
            controlBox.innerHTML = startBtnHTML;
            let startBtn = document.querySelector('#game_start');
            startBtn.setAttribute("onclick",`updateGame('battle')`);
            break;
        }
        case 'battle':{
            controlBox.innerHTML = playBtnsHTML;
            let atkBtn = document.querySelector('#battle_attack');
            atkBtn.setAttribute("onclick",`attack()`);
            let retBtn = document.querySelector('#battle_retreat');
            retBtn.setAttribute("onclick",`retreat()`);
            break;
        }
        case 'game_completed':{
            controlBox.innerHTML = startBtnHTML;
            let startBtn = document.querySelector('#game_start');
            startBtn.setAttribute("onclick",`newGame();updateGame('battle')`);
            break;
        }
        default:{
            console.log('failed to read game state!');
        }
    }
}

/**following functions will assist in writing and clearing the message log box*/
function writeMessageBox(str){
    let messageBox = document.getElementById('log');
    let temp = messageBox.innerHTML;
    clearMessageBox()
    messageBox.innerHTML = str + temp;
}
function clearMessageBox(){
    let messageBox = document.getElementById('log');
    messageBox.innerHTML = "";
}