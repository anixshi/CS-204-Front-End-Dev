// JavaScript File
/*global $*/
///* global random */
/* global winningDiameter*/ 
/* global losingDiameter*/
/* global growDiameter*/                    
/* shrinkDiameter */    
///* global Blob */
///* global Enemy */
/* global Player */
/* global endgame */


function Player(color, diameter){
    Blob.call(this,color,diameter);
    this.isPlaying= true;
}

Player.prototype = Object.create(Blob.prototype);
Player.prototype.constructor = Player; 

//move which takes a mouse movement event object as its argument
//and moves the DIV so that the center is in the new location.
Player.prototype.move = function(mouseEvent) {
    this.setX(mouseEvent.clientX + this.radius);
    this.setY(mouseEvent.clientY + this.radius);
}

var winningDiameter = window.innerHeight/2; // bigger than this wins
var losingDiameter = 5;                     // smaller than this loses
var growDiameter = 50;                      // grow by this many pixels
var shrinkDiameter = 5;                     // shrink by this many pixels

Player.prototype.grow = function(){
    this.diameter = growDiameter + this.diameter;
    // $('#'+ this.count).css("top", this.y - growDiameter);
    // $('#'+ this.count).css("left", this.x - growDiameter);
    $('#'+ this.count).css("min-width", this.diameter);
    $('#' + this.count).css("min-height", this.diameter);
    if (this.diameter >= winningDiameter){
        $("#test-container").stop();
        var $p = $('<div></div>', {
            'id': "outcome"})
            $p.css({
                'position': 'absolute', 
                'top': window.innerHeight/2,
                'left': window.innerHeight/2
            });
        var text = "You win!";
        $($p).append(text)
        $("#start").append($p)
        this.isPlaying = false;
        console.log("isplaying variable: " + this.isPlaying)
        
    }
};

Player.prototype.shrink = function(){
    this.diameter = this.diameter - shrinkDiameter;
    $('#'+ this.count).css("min-width", this.diameter);
    $('#' + this.count).css("min-height", this.diameter);
    
    if (this.diameter <= losingDiameter){
        // $("player").stop();
        $("#test-container").stop();
       var $p = $('<div></div>', {
            'id': "outcome"})
            $p.css({
                'position': 'absolute', 
                'top': window.innerHeight/2,
                'left': window.innerHeight/2
            });
        var text = "You lost!";
        $($p).append(text)
        $("#start").append($p)
        this.isPlaying = false;
        // $("#test-container").empty();
        
    }
};

//invoked when a collision happens. 
//It takes an enemy blob as an argument
//either grows or shrinks the player as appropriate
Player.prototype.collide = function(enemyBlob){
    //console.log('colliding in player', this.x, this.y);
    
    //debugger;
    if (enemyBlob.getDiameter() > this.diameter){
        this.shrink();
    }
    else{
        this.grow();
    }
}


Player.prototype.inGame = function(){
    return this.isPlaying;
}