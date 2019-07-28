// JavaScript File
// Anika Shields and Janjan 

/*global id*/
/*global $*/

//provided functions
var board;

function shuffleImages () {
    board = new Array(16);
    // store two copies of each integer from 1 to 8
    for (var i = 0; i <= 15; i++){
        board[i] = i % 8 + 1;
    }
    if( ! /grading$/.test(window.location.href) ) {
        // randomize the order of the integers in the array
        for (var i = 15; i >= 0; --i){
            var randPos = Math.floor(i * Math.random());
            var tmpStore = board[i];
            board[i] = board[randPos];
            board[randPos] = tmpStore;
        }
    }
}

function getImage (id) {
    var cell = parseInt(id);
    var filename = "images/im" + board[cell-1] + ".jpg";
    return filename;
}

var totalClickNum = 0;
var totalMatchNum = 0;
var clickNumber = 1;
var imageID;

shuffleImages();

function showImage(id){
    $("#"+id).attr("src", getImage(id));
}
        
function hideImage(id){
    $("#"+id).attr("src","images/blank.jpg");
}

function addClickHandler(id){
   'use strict';
   var elt = document.getElementById(id);
   elt.addEventListener('click', function (event) {
        event.preventDefault();
        processClick(id);
   });
}

function initializeEvents() {
    for( var i = 1; i <= 16; i++ ) {
        addClickHandler(i);
    }
}

function processClick(id){
    showImage(id);
    totalClickNum++;
    $("#clickCount").text(totalClickNum);
    if(clickNumber == 1){
        imageID = id;
        clickNumber = 2;
    }
    else if(clickNumber == 2){
        if (getImage(id) != getImage(imageID)){
            showImage(id);
            setTimeout(function() {hideImage(id); }, 1000);
            setTimeout(function() {hideImage(imageID); }, 1000);
            console.log("no match!");
        }
        else{
            totalMatchNum++;
            $("#matchCount").text(totalMatchNum);
        }
        clickNumber = 1;
    }
}
    

function startNewGame(){
    shuffleImages();
    totalClickNum = 0;
    totalMatchNum = 0;
    clickNumber = 1;
    
    $("#clickCount").text(0);
    $("#matchCount").text(0);
    $(".squares").attr("src","images/blank.jpg");
}

$("#restart-button").click(startNewGame);

initializeEvents()