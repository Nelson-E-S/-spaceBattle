class Game{
    constructor(){
        this.game_state = "start";
        this.player = [];
        this.enemy = [];
        this.roundNumber = 1;
        this.playerWinState = "undecided";
        this.playerChoice = 0;
    };
    getGameState(){
        return this.game_state;
    };
    getPlayer(){
        return this.player;
    };
    getEnemy(){
        return this.enemy;
    };
    getRoundNumber(){
        return this.roundNumber;
    }
    getPlayerWinState(){
        return this.playerWinState;
    }
    getPlayerChoice(){
        return this.playerChoice;
    }
    setPlayerChoice(c){
        this.playerChoice = c;
    }
    setPlayerWinState(s){
        /*'undecided' or 'determining' or 'player_win' or 'player_lost'*/
        this.playerWinState = s;
    }
    updateRoundNumber(){
        if(this.getPlayerWinState() === 'determining')
            this.roundNumber++;
        else
            this.roundNumber = 1;
    }
    setGameState(g){
        this.game_state = g;
        updateControls(this);
    };
    addPlayerShips(){
        this.player.push(loadPlayer());
    };
    drawPlayerShips(){
        drawShip(this.getPlayer()[0]);
    };
    erasePlayerShips(){
        removeShip(this.getPlayer()[0]);
    };
    clearPlayerShips(){
        this.getPlayer().shift();
    };
    updatePlayerShipVisual(){
        updateShip(this.getPlayer()[0]);
    };
    updatePlayerShipData(h){
        this.getPlayer()[0].setHull(h);
    }
    addEnemyShipSet(){
        this.enemy = loadEnemySet(6);
    };
    drawEnemyShips(){
        if(getCurrentEnemeies() === 0){
            if(this.getEnemy().length === 1)
                drawShip(this.getEnemy()[0]);
            else{
                for(let i = 0; i <= Math.floor(rnd(0,1)); i++)
                    drawShip(this.getEnemy()[i]);
            }
        }
    };
    eraseEnemyShips(){
        removeShip(this.getEnemy()[this.getPlayerChoice()]);
    };
    clearEnemyShips(){
        this.getEnemy().splice(this.getPlayerChoice(),1);
    };
    updateEnemyShipVisual(){
        updateShip(this.getEnemy()[this.getPlayerChoice()]);
    };
    updateEnemyShipData(h){
        this.getEnemy()[0].setHull(h);
    };
    updateGameControls(){
        updateControls(this);
    };
    updateMessageBox(str){
        writeMessageBox(str);
    };
    updateMsgBoxPlayerWinState(){
        switch(this.getPlayerWinState()){
            case "player_won":{
                this.updateMessageBox(playerWon);
                break;
            }
            case "player_lost":{
                this.updateMessageBox(playerLost);
            }
            default:{};
        }
    }
    eraseMessageBox(){
        clearMessageBox();
    };
    attack(ship){
        let atkRoll = Math.random();
        if (atkRoll <= ship.getAccuracy())
            return true;
        return false;
    };
    attackPhase(){
        this.updateMessageBox(startRound.replace("<x>",this.getRoundNumber()));
        if(this.getGameState() === "battle"){
            let enemyDown = false;
            let playerDown = false;
            this.setPlayerWinState("determining");
            if(this.attack(this.getPlayer()[0])){
                this.getEnemy()[this.getPlayerChoice()].setHull(this.getEnemy()[this.getPlayerChoice()].getHull() - this.getPlayer()[0].getFirepower());
                this.updateMessageBox(playerAcc.replace("<h/m>","hit"));
                this.updateMessageBox(playerDmg.replace("<x>",this.getPlayer()[0].getFirepower()));
                this.updateEnemyShipVisual();
                if(this.getEnemy()[this.getPlayerChoice()].getHull() <= 0){
                    this.updateMessageBox(destroyedEnemy.replace("<enemyid>",this.getEnemy()[this.getPlayerChoice()].getID()))
                    this.eraseEnemyShips();
                    this.clearEnemyShips();
                    this.setPlayerChoice(0);
                };
                if(getCurrentEnemeies() === 0)
                    enemyDown = true;
            }else{
                this.updateMessageBox(playerAcc.replace("<h/m>","missed"));
            };
            if(!enemyDown){
                this.updateMessageBox(halfRound.replace("<x>",this.getRoundNumber()));
                for(let i = 0; i < getCurrentEnemeies(); i++){
                    if(!playerDown){
                        if(this.attack(this.getEnemy()[i])){
                            this.getPlayer()[0].setHull(this.getPlayer()[0].getHull() - this.getEnemy()[i].getFirepower());
                            this.updateMessageBox(enemyAcc.replace("<h/m>","hit").replace("-id-",this.getEnemy()[i].getID()));
                            this.updateMessageBox(enemyDmg.replace("<x>",this.getEnemy()[i].getFirepower()).replace("-id-",this.getEnemy()[i].getID()));
                            this.updatePlayerShipVisual();
                            if(this.getPlayer()[0].getHull() <= 0){
                                this.updateMessageBox(destroyedPlayer.replace("-id-",this.getEnemy()[i].getID()));
                                this.erasePlayerShips();
                                this.clearPlayerShips();
                                playerDown = true;
                            };
                        }else{
                            this.updateMessageBox(enemyAcc.replace("<h/m>","missed").replace("-id-",this.getEnemy()[i].getID()));
                        }
                    }
                }
            } else{
                if(this.getEnemy().length !== 0)
                        this.drawEnemyShips();
            }
            if(playerDown || (this.getEnemy().length === 0)){
                this.setGameState("game_completed");
                if(playerDown)
                    this.setPlayerWinState("player_lost");
                else if(this.getEnemy().length === 0)
                    this.setPlayerWinState("player_won");
            }
            this.updateMsgBoxPlayerWinState();
            this.updateRoundNumber();
            this.updateGameControls(this);
        }
    }
    retreatPhase(){
        this.erasePlayerShips();
        this.clearPlayerShips();
        this.setGameState("game_completed");
        this.setPlayerWinState("player_lost");
        this.updateMsgBoxPlayerWinState();
        this.updateRoundNumber();
        this.updateGameControls(this);
    }
}