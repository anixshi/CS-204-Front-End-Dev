// JavaScript File
/* global $ */

// to bypass AJAX loading

var tree1 = {
	"Q": " Is the subject real? (not imaginary)",
	"Y": {
		"Q": " Is the subject a US President?",
		"Y": " Is the subject Abraham Lincoln?",
		"N": {
			"Q": " Is the subject a revolutionary war figure?",
			"Y": " Is the subject Alexander Hamilton?",
			"N": " Is the subject Martin Luther King, Jr?"
		}
	},
	"N": {
		"Q": " Is the subject a Star Wars Character?",
		"Y": " Is the subject Darth Vader?",
		"N": {
			"Q": "Is the subject a character from Lord of the Rings?",
			"Y": "Is the subject Frodo Baggins?",
			"N": "Is the subject Captain Kirk?"
		}
	}
};

function isLeaf(node) {
	return (typeof node === 'string');
}

function makeWholeTree(selector, node) {

	function makeTree(node) {
		if (isLeaf(node)) { // a guess
			return $("<p>").addClass("leaf").text(node);
		}
		else {
			var parent_div = $("<div>").addClass("node");
			
			parent_div.append(node.Q);
			parent_div.append(makeTree(node.Y));
			parent_div.append(makeTree(node.N));
			return parent_div;
		}
	}

	var dom_elt = makeTree(tree1);
	$("#tree-display").empty().append(dom_elt);
	
}

$("#show-tree").on('click', function() {
	if ($("#tree-display").is(":empty")) {
		makeWholeTree(tree1);
		$("#show-tree").text("Hide Tree");
		
	} else {
		$("#tree-display").empty();
		$("#show-tree").text("Show Tree");
	}
});


$("#start-game").on('click', function() {
	$("#question-list").empty();
	askQuestion(tree1);
})

function requestData() {
    $.get("https://cs.wellesley.edu/~cs204/assignments/a09/tree1.text",askQuestion,"text");
}
        
function askQuestion (node) {
    
    // Buttons
    var $computer = $("<button></button").addClass("cpu").text("Yes, you win");
    var $player = $("<button></button").addClass("player").text("No, I win");
    
    var $yesButton = $("<button></button>").addClass("yes").text('Yes');
    var $noButton = $("<button></button>").addClass("no").text('No');
    
    if (isLeaf(node)){
    	
    	$("#questions-list").append("<li id='question-item'>"+node+"</li>");
    	$("#questions-list").append($computer);
    	$("#questions-list").append($player);
    	
    } else {
    	$("#questions-list").append("<li id='question-item'>"+node['Q']+"</li>");
    	
    	$("#questions-list").append($yesButton);
    	$("#questions-list").append($noButton);
    	
    }
    
    $yesButton.on('click', function () {
    	$("button").remove(".yes");
    	$("button").remove(".no");
    	var nextNode = node['Y'];
    	askQuestion(nextNode)
    });
    
    $noButton.on('click', function () {
    	$("button").remove(".yes");
    	$("button").remove(".no");
    	var nextNode = node['N'];
    	askQuestion(nextNode)
    });
    
    $computer.on('click', function () {
    	$("button").remove(".cpu");
    	$("button").remove(".player");
    	$("#question-list").append("<li>"+"Yay! Click new game to begin"+"</li>");
    	
    })
    
    $player.on('click', function () {
    	$("button").remove(".cpu");
    	$("button").remove(".player");
    	$("#question-list").append("<li>"+"Boo! I lost. Click new game to play again."+"</li>");
    	
    })
}
