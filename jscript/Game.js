class Game{
    constructor(){
        this.game_state = "start";
        this.player = [];
        this.enemy = [];
        this.roundNumber = 1;
        this.playerWinState = "undecided";
        this.playerChoice = 0;
        this.playerMissileChoice = false;
        this.playerMissile = "";
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
    };
    getPlayerWinState(){
        return this.playerWinState;
    };
    getPlayerChoice(){
        return this.playerChoice;
    };
    getPlayerMissileChoice(){
        return this.playerMissileChoice;
    };
    getPlayerMissile(){
        return this.playerMissile;
    }
    setPlayerMissileChoice(m){
        this.playerMissileChoice = m;
    };
    setPlayerMissile(m){
        this.playerMissile = m;
    };
    setPlayerChoice(c){
        this.playerChoice = c;
    };
    setPlayerWinState(s){
        /*'undecided' or 'determining' or 'player_win' or 'player_lost'*/
        this.playerWinState = s;
    };
    updateRoundNumber(){
        if(this.getPlayerWinState() === 'determining')
            this.roundNumber++;
        else
            this.roundNumber = 1;
    };
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
    };
    addEnemyShipSet(){
        this.enemy = loadEnemySet(6);
        this.enemy.push(loadEnemyBoss());
    };
    drawEnemyShips(){
        if(getCurrentEnemeies() === 0){
            if(this.getEnemy().length === 1)
                drawShip(this.getEnemy()[0]);
            else{
                if(this.getEnemy()[1].getID() === "enemy_boss")
                    drawShip(this.getEnemy()[0]);
                else{
                    for(let i = 0; i <= Math.floor(rnd(0,1)); i++)
                        drawShip(this.getEnemy()[i]);
                }
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
        this.getEnemy()[this.getPlayerChoice()].setHull(h);
    };
    updateGameControls(){
        updateControls(this);
    };
    updateMessageBox(str){
        writeMessageBox(str);
    };
    disablePlayerMissile(){
        disableMissile(this.getPlayerMissile());
    }
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
    updateBossDamageData(cP,d){
        let rootHealth = this.getEnemy()[this.getPlayerChoice()].getBaseHull() / (this.getEnemy()[this.getPlayerChoice()].getFirePodHealth().length + 1);
        let resultSign = 0;
        resultSign = this.getEnemy()[this.getPlayerChoice()].getFirePodHealth()[cP] - d;
        if (resultSign < 0){
            this.getEnemy()[this.getPlayerChoice()].getFirePodHealth()[cP] = 0;
            resultSign = Math.abs(resultSign);
            if(cP + 1 < this.getEnemy()[this.getPlayerChoice()].getFirePodHealth().length)
                this.updateBossDamageData((cP+1),resultSign);
            else
                this.getEnemy()[this.getPlayerChoice()].setHull(this.getEnemy()[this.getPlayerChoice()].getHull() - d);
        } else {
            this.getEnemy()[this.getPlayerChoice()].getFirePodHealth()[cP] = resultSign;
        }
    }
    attackPhase(){
        this.updateMessageBox(startRound.replace("<x>",this.getRoundNumber()));
        if(this.getGameState() === "battle"){
            let enemyDown = false;
            let playerDown = false;
            this.setPlayerWinState("determining");
            if(this.attack(this.getPlayer()[0]) || this.getPlayerMissileChoice()){
                this.updateMessageBox(playerAcc.replace("<h/m>","hit"));
                if(this.getPlayerMissileChoice()){
                    if(this.getEnemy()[this.getPlayerChoice()].getID() === "enemy_boss")
                        this.updateBossDamageData(0,10);
                    this.getEnemy()[this.getPlayerChoice()].setHull(this.getEnemy()[this.getPlayerChoice()].getHull() - 10);
                    this.disablePlayerMissile();
                    this.updateMessageBox(playerDmg.replace("<x>",10));
                } else {
                    if(this.getEnemy()[this.getPlayerChoice()].getID() === "enemy_boss")
                        this.updateBossDamageData(0,this.getPlayer()[0].getFirepower());
                    this.getEnemy()[this.getPlayerChoice()].setHull(this.getEnemy()[this.getPlayerChoice()].getHull() - this.getPlayer()[0].getFirepower());
                    this.updateMessageBox(playerDmg.replace("<x>",this.getPlayer()[0].getFirepower()));
                };
                this.setPlayerMissileChoice(false);
                this.setPlayerMissile("");
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
                let bossPower = [];
                let numAtks = 0;
                for(let i = 0; i < getCurrentEnemeies(); i++){
                    if(!playerDown){
                        if(this.getEnemy()[i].getID() === "enemy_boss"){
                            bossPower = this.getEnemy()[i].getFirePodHealth();
                            for(let p of bossPower){
                                if (p > 0)
                                    numAtks++;
                            }
                        }else
                            numAtks = 1;
                        while(numAtks > 0 && !playerDown){
                            if(this.attack(this.getEnemy()[i])){
                                let damage = this.getEnemy()[i].getFirepower();
                                let resultSign = this.getPlayer()[0].getShield() - damage;
                                if (this.getPlayer()[0].getShield() === 0){
                                    this.getPlayer()[0].setHull(this.getPlayer()[0].getHull() - damage);
                                }else if(resultSign < 0){
                                    this.getPlayer()[0].setShield(0);
                                    this.getPlayer()[0].setHull(this.getPlayer()[0].getHull() - Math.abs(resultSign));
                                }else{
                                    this.getPlayer()[0].setShield(this.getPlayer()[0].getShield() - damage);
                                }
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
                            numAtks--;
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