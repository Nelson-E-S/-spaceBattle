/**Initializes player/enemy ship to player/enemy space with up to date player/enemy SpaceShip data*/
function drawShip(ship){
    switch (ship.getFaction()){
        case 'player':{
            let section_player = document.getElementById('player_space');
            section_player.innerHTML = playerShipHTML.replace('<id>',ship.getID()).replace('<hull>',ship.getHull()).replace('<fp>',ship.getFirepower()).replace('<acc>',ship.getAccuracy()).replace('<shield>',ship.getShield());
            let shipHTML = document.getElementById(ship.getID());
            let shipShield = shipHTML.querySelector('#shield');
            shipShield.innerHTML = ship.getShield();
            shipShield.style.background = `linear-gradient(to right, aqua ${isNaN(Math.floor((ship.getShield()/ship.getBaseShield())*100))?0:Math.floor((ship.getShield()/ship.getBaseShield())*100)}%, blue 0%)`;
            break
        }
        case 'enemy':{
            if(ship.getID() === "enemy_boss"){
                let section_enemy = document.getElementById('enemy_space');
                let tempHTML = enemyBossShipHTML.replace('-id-',ship.getID()).replace('-id-',ship.getID()).replace('-i-',ship.getID()+"_choice").replace(`:id:`,ship.getID().toUpperCase()).replace('<hull>',ship.getHull()).replace('<acc>',ship.getAccuracy());
                for(h of ship.getFirePodHealth()){
                    tempHTML = tempHTML.replace('-fp-',ship.getFirepower());
                };
                section_enemy.innerHTML += tempHTML;
                writeMessageBox(infoBoss);
            }else{
                let section_enemy = document.getElementById('enemy_space');
                section_enemy.innerHTML += enemyShipHTML.replace('-id-',ship.getID()).replace('-id-',ship.getID()).replace('-i-',ship.getID()+"_choice").replace(`:id:`,ship.getID().toUpperCase()).replace('<hull>',ship.getHull()).replace('<fp>',ship.getFirepower()).replace('<acc>',ship.getAccuracy());
            }
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
    if(ship.getID() === "enemy_boss"){
        let shipFP = document.querySelectorAll("#enemy_boss #aux .fire");
        let f = shipFP.length;
        for (let i = 0; i < f; i++){
                shipFP[i].style.background = `linear-gradient(to right, yellow ${Math.floor((ship.getFirePodHealth()[i]/(ship.getBaseHull() / (ship.getFirePodHealth().length + 1)))*100)}%, brown 0%)`;
        }
    }
    let shipShield = shipHTML.querySelector('#shield');
    shipShield.innerHTML = ship.getShield();
    if (ship.getFaction() === "player")
        shipShield.style.background = `linear-gradient(to right, aqua ${isNaN(Math.floor((ship.getShield()/ship.getBaseShield())*100))?0:Math.floor((ship.getShield()/ship.getBaseShield())*100)}%, blue 0%)`;
    else if (ship.getFaction() === "enemy")
        shipShield.style.background = `linear-gradient(to right, aqua ${isNaN(Math.floor((ship.getShield()/ship.getBaseShield())*100))?0:Math.floor((ship.getShield()/ship.getBaseShield())*100)}%, red 0%)`;
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

/**simple enemy space clear */
function clearEnemySpace(){
    let section_enemy = document.getElementById('enemy_space');
    section_enemy.innerHTML = "";
}

/**Requires: id str, disbles a missle option that was used*/
function disableMissile(id){
    let mSelector = document.querySelector(`#${id}`);
    mSelector.disabled = true;
}

/**resets all missile options for new game */
function resetMissiles(){
    let mSelector = document.querySelectorAll(`.missileSelector`);
    for(m of mSelector)
        m.disabled = false;
}