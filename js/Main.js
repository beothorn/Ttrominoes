var w = window.innerWidth;
var h = window.innerHeight;

var canvas= document.getElementById("game-canvas");
canvas.width  = w;
canvas.height = h;
var context= canvas.getContext("2d");


//var pieceGenerator = new PieceGeneratorClass(true);
var pieceGenerator = new PieceGeneratorClass();
var board =  new Board(pieceGenerator);

var startingPieceSize = Math.floor(canvas.height/22);
var scorePainter = new ScorePainter(context);
var boardPainter = new BoardPainter(board,context);

board.setRemovedLineListener(function(lines){
	scorePainter.addScore(lines);
});

function adaptToSize(){
	canvas.width  =  window.innerWidth;
	canvas.height = window.innerHeight;
	var blockSize = Math.floor(canvas.height/22);
	
	scorePainter.setWidth(blockSize*3);
	boardPainter.setPieceSize(blockSize);
    boardPainter.setPosition((canvas.width/2)-(boardPainter.getWidth()/2)-scorePainter.getWidth(),0);
	scorePainter.setPosition(boardPainter.getX()+boardPainter.getWidth(),0);
}

adaptToSize();

function fillStrokedText(text, x, y){
	context.strokeStyle = "black";
	context.lineWidth = 3;
	context.fillStyle = "white";
	context.strokeText(text, x, y);
	context.fillText(text, x, y);
}

window.onresize = adaptToSize;

function draw(){
	context.strokeStyle = "#4670a1";
	
	context.fillStyle = 'rgba(80,110,125,0.4)';
	context.fillRect(0, 0 , w, h);
	
	boardPainter.draw();
	scorePainter.draw();
	
	if(board.isGameOver()){
		var gameOver = "Game over";
		context.font = "bold "+(canvas.width/10)+"px Arial";
		fillStrokedText(gameOver, canvas.width/2 - ((canvas.width/10)*4), canvas.height/2)
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
        if(!board.isGameOver()) board.step();
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
		board.moveRight();
		e.preventDefault();
	}
	if(e.keyCode === left){
		board.moveLeft();
		e.preventDefault();
	}
	if(e.keyCode === down){
		speed = 0;
		e.preventDefault();
	}
	if(e.keyCode === up){
		board.rotatePiece();
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
		board.moveLeft();
		e.preventDefault();
		return;
	}
	if(startx > boardX + (board.boardState[0].length*pieceSize)){
		board.moveRight();
		e.preventDefault();
		return;
	}
	
	if(starty > boardY + (board.boardState.length*pieceSize) - (3*pieceSize)){
		speed = 0;
		e.preventDefault();
		return;
	}
	
	board.rotatePiece();
	e.preventDefault();
};

document.ontouchend = function(e) {
	speed = 1;
	e.preventDefault();
};