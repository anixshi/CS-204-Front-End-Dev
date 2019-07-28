// JavaScript File

/*global $*/
/* global random */
/* global testingMode */


var count = 0;

function Blob(color, diameter) {
   this.color = color;
   this.count = count;


   this.diameter = diameter; 
   this.radius = diameter/2;
    
   this.height; 
   this.width;
   
  if (testingMode == "grow") {
        this.x = window.innerWidth/2;
        this.y = window.innerHeight/2;
   }
    if (testingMode == "shrink") {
        this.x = window.innerWidth/2;
        this.y = window.innerHeight/2;
   }
   this.x;
   this.y;
   this.divBlob = $('<div></div>', {
            'id': count++, 'class': "circle" })
            .css({
                'position': 'absolute', 
                'border-radius': '50%', 
                left: this.x + this.radius, 
                top: this.y + this.radius, 
                'min-width': this.diameter, 
                'min-height': this.diameter, 
                'background-color': this.color
            });
    }


//works
Blob.prototype.addToGame = function (destination_selector){
    $('#' + destination_selector).append(this.divBlob);
    //console.log("added to " + destination_selector);
};

//works
Blob.prototype.setColor = function(color){
    this.color = color;
    $('#'+ this.count).css('background-color', color);
};

//update the DOM element's width, height, left and top attributes.
//works
Blob.prototype.setDiameter = function(newDiameter){
    this.diameter = newDiameter;
    this.radius = newDiameter/2;
    $('#'+ this.count).css("min-width", newDiameter);
    $('#' + this.count).css("min-height", newDiameter);
    var oldLeft = $("#" + this.count).css("left"); 
    $('#' + this.count).css("left", oldLeft + newDiameter/2);
    var oldTop = $(".circle").css("top");
    $('#' + this.count).css("top", oldTop + newDiameter/2);
};

//works
Blob.prototype.setRadius = function(newRadius){
    this.radius = newRadius; 
    this.diameter = newRadius*2;
    $('#'+ this.count).css("min-width", newRadius*2);
    $('#' + this.count).css("min-height", newRadius*2);
    var oldLeft = $("#"+this.count).css("left"); //define left and top attribute in css first
    $('#' + this.count).css("left", oldLeft + newRadius);
    var oldTop = $("#"+this.count).css("top");
    $('#' + this.count).css("top", oldTop + newRadius);
};

//works
Blob.prototype.getDiameter = function(){
    return this.diameter;
};

//works
Blob.prototype.getRadius = function(){
    return this.radius;
};

Blob.prototype.getX = function(){
    //var width = this.width();
    //return width/2;
    return this.x;
};

Blob.prototype.getY = function(){
    // var height = this.height();
    return this.y;
};

Blob.prototype.setX = function(x){
    this.x = x;
    this.divBlob.css('left', x-this.radius);
};

Blob.prototype.setY = function(y){
    this.y = y;
    this.divBlob.css('top', y-this.radius);

};

Blob.prototype.intersects = function (other) {
    var dx = this.getX() - other.getX();
    var dy = this.getY() - other.getY();
    var distance_squared = (dx * dx + dy * dy);

    var r1 = this.getRadius();
    var r2 = other.getRadius();
    var rsum = r1+r2;
    var closer = (distance_squared <= rsum*rsum);
    return closer;
};