/*currently just testing*/
const print = args => {console.log(args);};

var player = loadPlayer();
var enemies = loadEnemySet(6);

drawShip(player);
drawShip(enemies[0]);

print(player);
print(enemies)