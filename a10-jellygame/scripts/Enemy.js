// JavaScript File
/*global $*/
///* global random */
/* global winningDiameter*/ 
/* global losingDiameter*/
/* global growDiameter*/                    
/* shrinkDiameter */    
///* global Blob */
/* global Player */
/* global player */
/* global testingMode */


var minDiameter = 5;                   // random size >= this
var maxDiameter = window.innerWidth/4; // random size <= this
var enemyDuration = 5000;              // time to cross the document

function Enemy(){
    var diameter = 0;
    if (testingMode == 'grow'){
        diameter = 10;
        //console.log("diameter: "+ diameter)
    }
    else
    if (testingMode == 'shrink'){
        diameter = 75;
    }
    else {
        diameter = random.intBetween(minDiameter, maxDiameter)
    }
    Blob.call(this, random.color, diameter);
    var directions = ['left', 'right', 'down','up']
    this.direction = random.arrayElt(directions);
    this.setCoords();
    this.pastcollide = false;
    this.player = player;
}

Enemy.prototype = Object.create(Blob.prototype);
Enemy.prototype.constructor = Enemy;


//setCoords which sets the initial X,Y coordinates of the enemy,
//based on the side it enters from and what testing mode we are in.
//This method is invoked from the constructor.
Enemy.prototype.setCoords = function(){

if (testingMode == false) {
    if (this.direction == "left"){
        this.setX(window.innerWidth)
        this.setY(random.intBetween(0, window.innerHeight));
    }
    if (this.direction == "right"){
        this.setX(0);
        this.setY(random.intBetween(0, window.innerHeight));
    }
    if (this.direction == "up"){
        this.setX(random.intBetween(0, window.innerWidth));
        this.setY(window.innerHeight);
    }
    if (this.direction == "down"){
        this.setX(random.intBetween(0, window.innerWidth));
        this.setY(0);
    }
}
else {
                if (this.direction == "left"){
                //console.log('window height', window.innerHeight, 'and', window.innerHeight/2)
                this.setY(window.innerHeight/2);
                this.setX(window.innerWidth)
            }
                            if (this.direction == "right"){
                //console.log('window height', window.innerHeight, 'and', window.innerHeight/2)
                this.setY(window.innerHeight/2);
                this.setX(0)
            }
            if (this.direction == "up"){
                //console.log('window width', window.innerWidth, 'and', window.innerWidth/2)
                this.setX(window.innerWidth/2);
                this.setY(window.innerHeight)
            }
                        if (this.direction == "down"){
                //console.log('window width', window.innerWidth, 'and', window.innerWidth/2)
                this.setX(window.innerWidth/2);
                this.setY(0)
            }
}
}


//maybeCollide 
//checks for a collision. 
//It's invoked during the animation of the movement of the enemy. 
//The method first checks to see if this enemy 
//has collided with the Player in the past and if so, skips any further processing.
//If it hasn't collided in the past, it updates the X and Y location, 
//checks to see if there is an intersection (using the intersects method above) 
//and if so, invokes the collide method that we just discussed.
Enemy.prototype.maybeCollide = function(){
   // console.log("maybeCollide() before collide");
    if (this.pastcollide == false)
    {
        if (this.intersects(this.player)){
            this.collide();
            this.pastcollide = true;
            //console.log("COLLIDE CALLED")
        }
    }
}


//uses the intersects method on itself and the Player. 
//If that indicates that an collision has occurred,
//it invokes the Player's collide method
Enemy.prototype.collide = function(){
        //console.log("player " + this.player.getDiameter());
        this.player.collide(this);
        this.remove();
}


//remove which removes this enemy from the board
Enemy.prototype.remove = function(){
    $('#'+ this.count).remove();
}

//start which starts the jQuery animation of this enemy moving across the board
Enemy.prototype.start = function(){
if (this.direction == 'left'){
    $('#' + this.count)
        .animate({ left: '-=' + window.innerWidth},
                 {
                     duration: enemyDuration,
                     progress: function() {
                         this.maybeCollide();
                         //console.log("maybeCollide for LEFT")
                         var $elt = $('#' + this.count);
                         var left = parseInt($elt.css("left"), 10);
                         var x = left + this.radius; // radius is 100
                         this.setX(x);
                         //console.log("enemy " + this.count + " x is now " + x);
                     }.bind(this),
                     complete: function() {
                         this.remove();
                     }.bind(this)
                 });
}

if (this.direction == 'right'){
       $('#' + this.count)
        .animate({ left: '+=' + window.innerWidth},
                 {
                     duration: enemyDuration,
                     progress: function() {
                         this.maybeCollide();
                         //console.log("maybeCollide for RIGHT");
                         var $elt = $('#' + this.count);
                         var left = parseInt($elt.css("left"), 10);
                         var x = left + this.radius; // radius is 100
                         this.setX(x);
                         //console.log("x is now " + x);
                     }.bind(this),
                     complete: function() {
                         this.remove();
                     }.bind(this)
                 });
}

if (this.direction == "up"){
       $('#' + this.count)
        .animate({ top: '-=' + window.innerHeight},
                 {
                     duration: enemyDuration,
                     progress: function() {
                         this.maybeCollide();
                         //console.log("maybeCollide for UP");
                         var $elt = $('#' + this.count);
                         var top = parseInt($elt.css("top"), 10);
                         var y = top + this.radius; 
                         this.setY(y);
                         //console.log("y is now " + y);
                     }.bind(this),
                     complete: function() {
                         this.remove();
                     }.bind(this)
                 });
}

if (this.direction == 'down'){
       $('#' + this.count)
        .animate({ top: '+=' + window.innerHeight},
                 {
                     duration: enemyDuration,
                     progress: function() {
                         this.maybeCollide();
                         //console.log("maybeCollide for DOWN");
                         var $elt = $('#' + this.count);
                         var top = parseInt($elt.css("top"), 10);
                         var y = top + this.radius; // radius is 100
                         this.setY(y);
                         //console.log("y is now " + y);
                     }.bind(this),
                     complete: function() {
                         this.remove();
                     }.bind(this)
                 });
}

}

                 