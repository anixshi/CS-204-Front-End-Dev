/* Q: is the subject real? (not imaginary)
    YQ: is the subject a US President?
        YG: is the subject Abraham Lincoln?
        NQ: is the subject a revolutionary war figure?
            YG: is the subject Alexander Hamilton?
            NG: is the subject Martin Luther King, Jr?
    NQ: is the subject a Star Wars Character?
        YG: is the subject Darth Vader?
        NQ: is the subject a character from Lord of the Rings?
            YG: Is the subject Frodo Baggins?
            NG: is the subject Captain Kirk? */
            
/* global questions */
/* global $ */



function parseTree(text) {
    text = text.trim();
    var lines = text.split("\n");

    // recursive function to read a subtree from the array of lines,
    // returning the subtree
    function readNode() {
        if( lines.length == 0 ) {
            throw new Error("out of lines");
        }
        var line = lines.shift();
        var parts = line.trim().split(":");
        var nodeType = parts[0];
        // console.log('nodetype: ',nodeType);
        if( ['Q', 'YQ', 'NQ' ].indexOf(nodeType) != -1 ) {
            // two children
            var ychild = readNode();
            var nchild = readNode();
            var node = {Q: parts[1], Y: ychild, N: nchild};
            return node;
        } else if ( ['YG', 'NG'].indexOf(nodeType) != -1 ) {
            // leaf
            console.log('Found leaf: ',line);
            return parts[1];
        } else {
            throw new Error('Wrong node type: '+nodeType);
        }
    }

    // return the value of the outermost recursive call
    return readNode();
};



function requestData() {
    console.log("Requesting data from the server");
    $.get("https://cs.wellesley.edu/~cs204/assignments/a09/tree1.text", function(response){console.log('Got '+response);}, 'text');
}

$("#get-tree").click(requestData);

