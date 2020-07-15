/*currently just testing*/
const print = args => {console.log(args);};

var newGame = new Game();
newGame.addPlayerShips();
newGame.drawPlayerShips();
newGame.addEnemyShipSet();
newGame.drawEnemyShips();
newGame.updateControls();