// JavaScript File
/*global $*/
/*global Player*/
/*global Enemy*/
/* global player*/
/* global testingMode */

var endgame;
var testingMode = false;
var player = new Player("blue",30);
    
function startGame(){
    //console.log("Game is starting.");
    $("#start").empty();
    player.addToGame("start");
    player.setX(window.innerWidth/2);
    player.setY(window.innerHeight/2);
    (function () {endgame = this.setInterval(function ()  {
        var e = new Enemy();
        e.addToGame('start');
        e.start();
        if (!player.inGame()) {
            endGame();
        }
    }, 1000);})();
}

function endGame() {
    clearInterval(endgame)
}

//when user clicks any button, screen will clear so game or testing can begin 
$("#start-game").on('click', function() {
    testingMode = false;
    $(document).on('mousemove', function (event) {player.move(event)});
    startGame();
    // $(".game-container").append("hi");
});

$("#test-grow").on('click', function() {
    testingMode = 'grow';
    //console.log("TestingMode: " + testingMode);
    //startGame();
    startGame();
    
});

$("#test-shrink").on('click', function() {
    testingMode = 'shrink';
    startGame();
});