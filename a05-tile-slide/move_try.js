//Anika Shields, Tabia Smith

var TILE_IMAGE_SELECTOR = '[data-image-role="tile"]';
var tiles= $(TILE_IMAGE_SELECTOR);
var blank = $("#blank");
var UP_KEY = 87;
var DOWN_KEY = 83;
var RIGHT_KEY = 68;
var LEFT_KEY = 65;
/*global $*/

//when each key is pressed, the key evokes a corresponding function for that move    
function doMove(direction){
    if (direction == LEFT_KEY){
        doRightMove();
    } else if (direction == RIGHT_KEY){
        doLeftMove();
    } else if (direction == UP_KEY){
        doDownMove();
    } else if (direction == DOWN_KEY){
        doUpMove();
    }
}

/*This function finds the position of the blank tile, then gets the left and top values in the css file. 
Then it iterates through the possible tiles and finds the tile that has the location to the right
(so +200 to the left) and the same top position (bc theyre on the same row). 
When it finds that right tile it returns it*/
function getRightTile(){
      'use strict';
    var blankPlace = blank.position();
    var side = blankPlace.left;
    var top = blankPlace.top;

    for (var i = 0; i < tiles.length+1; i++) {
         var tilePos = $(tiles[i]).position();
         
        if(tilePos.left== (side+200) && tilePos.top == top){
               return tiles[i];
        //return "#" +tiles[i].id;
        }
    }
}

function getLeftTile() {
      'use strict';
    var blankPlace = blank.position();
    var side = blankPlace.left;
    var top = blankPlace.top;
    
    for (var i = 0; i < tiles.length; i++) {
        var tilePos = $(tiles[i]).position();
         
        if(tilePos.left== (side-200) && tilePos.top == top){
            return tiles[i];
        //return "#" +tiles[i].id;
        }
    }
}

function getAboveTile(){
    'use strict';
    var blankPlace = blank.position();
    var side = blankPlace.left;
    var top = blankPlace.top;
    
    for (var i = 0; i < tiles.length; i++) {
         var tilePos = $(tiles[i]).position();
         
        if(tilePos.left== side && tilePos.top == (top-200)){
       
        return tiles[i];
        }
    }
}

function getBelowTile(){
    'use strict';
    var blankPlace = blank.position();
    var side = blankPlace.left;
    var top = blankPlace.top;

    for (var i = 0; i < tiles.length; i++) {
         var tilePos = $(tiles[i]).position();
         
         if(tilePos.left== side && tilePos.top == (top+200)){
             return tiles[i];
        }
    }
}

/*This function moves a tile to the right. It saves the tile to the left as a variable by using getLeftTile(), then also saves the position
and the top and left values as variables. The tile is then animated by switching the top and left values with the blank tile's, 
and the blank tile's with the left tile's position values. The other three functions have the same idea*/
function doRightMove() {
    'use strict';
    var x = getLeftTile();
   
    var blankPlace = blank.position();
    var side = blankPlace.left;
    var btop = blankPlace.top;
    
    var xPlace = $(x).position();
    var xside = xPlace.left;
    var xtop = xPlace.top;
    
    $(x).animate({
        top: btop,
        left: side,
    },500);
    side=xside;
    
   $('#blank').css("left", xside);
}

function doLeftMove() {
    'use strict';
    var x = getRightTile();
    
    var blankPlace = blank.position();
    var side = blankPlace.left;
    var btop = blankPlace.top;
    
    var xPlace = $(x).position();
    var xside = xPlace.left;
    var xtop = xPlace.top;
    
    $(x).animate({
        top: btop,
        left: side,
    },500);
    side=xside;
   $('#blank').css("left", xside);
}

function doUpMove() {
    'use strict';
    var x = getBelowTile();
    var blankPlace = blank.position();
    var side = blankPlace.left;
    var btop = blankPlace.top;
    
    var xPlace = $(x).position();
    var xside = xPlace.left;
    var xtop = xPlace.top;
    
    $(x).animate({
        top: btop,
        left: side,
    },500);
    
    btop =xtop;
   $('#blank').css("top", btop);
}

function doDownMove() {
    'use strict';
    var x = getAboveTile();
    
    var blankPlace = blank.position();
    var side = blankPlace.left;
    var btop = blankPlace.top;
    
    var xPlace = $(x).position();
    var xside = xPlace.left;
    var xtop = xPlace.top;

    $(x).animate({
        top: btop,
        left: side,
    },500);
    
    btop =xtop;
    $('#blank').css("top", btop);
}

//here we are adding the event listeners and evoking the function after each key is released
function addKeyPressHandler() {
    'use strict';
    document.body.addEventListener('keyup', function(event) {
        event.preventDefault(); 
       
        if (event.keyCode === LEFT_KEY){
            doLeftMove();
        } if (event.keyCode === RIGHT_KEY){
            doRightMove();
        } if (event.keyCode === UP_KEY){
            doUpMove();
        } if (event.keyCode === DOWN_KEY){
            doDownMove();
        }
    }); 
}

addKeyPressHandler();



