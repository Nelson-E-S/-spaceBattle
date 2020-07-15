/**Draws player/enemy ship to player/enemy space with up to date player/enemy SpaceShip data*/
function drawShip(ship){
    switch (ship.getFaction()){
        case 'player':{
            let section_player = document.getElementById('player_space');
            section_player.innerHTML = playerShipHTML.replace('<id>',ship.getID()).replace('<hull>',ship.getHull()).replace('<fp>',ship.getFirepower()).replace('<acc>',ship.getAccuracy());
            break
        }
        case 'enemy':{
            let section_enemy = document.getElementById('enemy_space');
            section_enemy.innerHTML = enemyShipHTML.replace('<id>',ship.getID()).replace('<hull>',ship.getHull()).replace('<fp>',ship.getFirepower()).replace('<acc>',ship.getAccuracy());
            break
        }
        default:{
            console.log('Error loading ship faction\n'+ship);
        }
    }
}
/**Removes player/enemy ship from player/enemy space */
function removeShip(ship){
    let shipHTML = document.getElementById(ship.getID());
    shipHTML.remove();
}