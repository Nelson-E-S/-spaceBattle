/*ship references*/
var playerShipHTML = 
    `<div class="player" id="player_1">
        <div id="pic"></div>
        <div id="hull"></div>
        <div id="aux">
            <div id="fire"></div>
            <div id="acc"></div>
        </div>
    </div>`;
var enemyShipHTML = 
    `<div class="enemy" id="enemy_<id>">
        <div id="pic"></div>
        <div id="hull"></div>
        <div id="aux">
            <div id="fire"></div>
            <div id="acc"></div>
        </div>
    </div>`

/**Adds player ship to player space */
function drawPlayer(){
    let section_player = document.getElementById('player_space');
    console.log(section_player)
    section_player.innerHTML = playerShipHTML;
}

function removePlayer(){
    let player = document.getElementById('player_1');
    player.remove();
}