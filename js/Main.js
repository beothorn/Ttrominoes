var w = window.innerWidth;
var h = window.innerHeight;

var canvas= document.getElementById("game-canvas");
canvas.width  = w;
canvas.height = h;
var context= canvas.getContext("2d");
context.font = "bold 20px Arial";
context.strokeStyle = "black";
context.lineWidth = 3;
context.fillStyle = "white";

function fillStrokedText(text, x, y){
    console.log("'"+text+"' on "+x+","+y);
	context.strokeText(text, x, y);
	context.fillText(text, x, y);
}

var pieceSize = Math.floor(canvas.height/22);

function textHeight(text){
    var d = document.createElement("span");
    d.font = context.font;
    d.textContent = text;
    document.body.appendChild(d);
    var emHeight = d.offsetHeight;
    document.body.removeChild(d);
    return emHeight;
}

var textHeight = textHeight("ColorTetris");
//fillStrokedText("ColorTetris", 0, textHeight);

context.lineWidth = 1;
var boardX = (canvas.width/2)-((Board.boardState[0].length*pieceSize)/2);
var boardY = 0;

window.onresize = function(event) {
	w = window.innerWidth;
	h = window.innerHeight;
	var canvas= document.getElementById("game-canvas");
	canvas.width  = w;
	canvas.height = h;
	pieceSize = Math.floor(canvas.height/22);
	boardX = (canvas.width/2)-((Board.boardState[0].length*pieceSize)/2);
	boardY = 0;
};

function draw(){
    context.fillStyle = "white";
	
	var pieceWithPosition = Board.getPieceWithPosition();
	
	var pieceColPos = pieceWithPosition.col;
	var pieceRowPos = pieceWithPosition.row;
	var piece = pieceWithPosition.piece;
	var boardState = Board.boardState;
	var rows = boardState.length;
	var cols = boardState[0].length;
	
    for(var row = 0; row < rows; row++){
        for(var col = 0; col < cols; col++){
            context.fillRect(col*pieceSize + boardX, row*pieceSize + boardY , pieceSize, pieceSize);
            context.strokeRect(col*pieceSize + boardX, row*pieceSize + boardY , pieceSize, pieceSize);
        }
    }
    
    context.fillStyle = "green";
    for(var row = 0; row < rows; row++){
        for(var col = 0; col < cols; col++){
            if(boardState[row][col] == '#')
                context.fillRect(col*pieceSize + boardX, row*pieceSize + boardY , pieceSize, pieceSize);
        }
    }
    
    for(var pieceRow = 0; pieceRow < piece.length; pieceRow++){
        for(var pieceCol = 0; pieceCol < piece[pieceRow].length; pieceCol++){
            if(piece[pieceRow][pieceCol] == '#')
                context.fillRect((pieceColPos+pieceCol)*pieceSize + boardX, (pieceRowPos+pieceRow)*pieceSize + boardY , pieceSize, pieceSize);
        }
    }
	
	for(var row = 0; row < rows; row++){
        for(var col = 0; col < cols; col++){
            context.strokeRect(col*pieceSize + boardX, row*pieceSize + boardY , pieceSize, pieceSize);
        }
    }
}   

function pieceScores(){
	for(var pieceIndex = 0; pieceIndex < pieces.length;  pieceIndex++){
		var piece = pieces[pieceIndex];
		var score = evaluatePiece(piece);
	}
}

var oneSecond = 1000;
var FPS = 30;
var frameLimit = Math.floor(oneSecond/FPS);
var timePassed = 0;
var lastLoopTime = Date.now();
var delta = 0;

var speed = 1;

var lastMoveTime = 0;

function loop(){
	
    var currentTime = Date.now();
	delta += currentTime - lastLoopTime;
	if(delta < frameLimit){
		lastLoopTime = Date.now();
		requestAnimationFrame(loop);
		return;	
	}
	timePassed+=frameLimit;
	var timePassedInSeconds = Math.floor(timePassed/1000);
    
    if(timePassedInSeconds-lastMoveTime >= speed){
		lastMoveTime = timePassedInSeconds;
        Board.step();
	}
    
    draw();
    
    lastLoopTime = Date.now();
	delta = 0;
	requestAnimationFrame(loop);			
}

requestAnimationFrame(loop);

var left = 37;
var up = 38;
var right = 39;
var down = 40;

document.onkeydown = function(e) {
	if(e.keyCode === right){
		Board.moveRight();
		e.preventDefault();
	}
	if(e.keyCode === left){
		Board.moveLeft();
		e.preventDefault();
	}
	if(e.keyCode === down){
		speed = 0;
		e.preventDefault();
	}
	if(e.keyCode === up){
		Board.rotatePiece();
		e.preventDefault();
	}
};

document.onkeyup = function(e) {
	if(e.keyCode === down){
		speed = 1;
		e.preventDefault();
	}
};

document.ontouchstart = function(e) {
	var touchobj = e.changedTouches[0] // reference first touch point (ie: first finger)
  	var startx = parseInt(touchobj.clientX);
	var starty = parseInt(touchobj.clientY);
	if(startx < boardX){
		Board.moveLeft();
		e.preventDefault();
		return;
	}
	if(startx > boardX + (Board.boardState[0].length*pieceSize)){
		Board.moveRight();
		e.preventDefault();
		return;
	}
	
	if(starty > boardY + (Board.boardState.length*pieceSize) - (3*pieceSize)){
		speed = 0;
		e.preventDefault();
		return;
	}
	
	Board.rotatePiece();
	e.preventDefault();
};

document.ontouchend = function(e) {
	speed = 1;
	e.preventDefault();
};