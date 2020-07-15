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
    ship.setHull(20);
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
    ship.setHull(Math.floor(rnd(3,6)));
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