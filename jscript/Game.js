class Game{
    constructor(){
        this.game_state = "start";
        this.player = [];
        this.enemy = [];
    };
    getGameState(){
        return this.game_state;
    };
    getPlayer(){
        return this.game_state;
    };
    getEnemy(){
        return this.game_state;
    };
    setGameState(g){
        alert('hi');
        this.game_state = g;
        updateControls(this);
    };
    addPlayerShips(){
        this.player.push(loadPlayer());
    };
    drawPlayerShips(){
        drawShip(this.player[0]);
    };
    erasePlayerShips(){
        removeShip(this.player[0]);
    };
    clearPlayerShips(){
        this.player.shift();
    };
    updatePlayerShip(){
        updateShip(this.player[0]);
    }
    addEnemyShipSet(){
        this.enemy = loadEnemySet(6);
    };
    drawEnemyShips(){
        drawShip(this.enemy[0]);
    };
    eraseEnemyShips(){
        removeShip(this.enemy[0]);
    };
    clearEnemyShips(){
        this.enemy.shift();
    };
    updateEnemyShip(){
        updateShip(this.enemy[0]);
    }
    updateControls(){
        updateControls(this);
    }
}