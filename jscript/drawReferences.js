/*ship references*/
var playerShipHTML = 
    `<div class="player" id="<id>">
        <div id="pic"></div>
        <div id="hull"><hull></div>
        <div id="aux">
            <div id="fire"><fp></div>
            <div id="acc"><acc></div>
        </div>
    </div>`;
var enemyShipHTML = 
    `<div class="enemy" id="<id>">
        <div id="pic"></div>
        <div id="hull"><hull></div>
        <div id="aux">
            <div id="fire"><fp></div>
            <div id="acc"><acc></div>
        </div>
    </div>`;
/*control references*/
var startBtnHTML = 
    `<button id="start">Start</button>`;
var playBtnsHTML = 
    `<button id="attack">Attack</button>
    <button id="retreat">Retreat</button>`;