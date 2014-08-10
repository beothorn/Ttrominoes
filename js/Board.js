var BoardClass = function(pieceGeneratorOrState, startingBoardStateOrBoard){
	
	var startingBoardState = [
				[' ',' ',' ',' ',' ',' ',' ',' ',' ',' '],
				[' ',' ',' ',' ',' ',' ',' ',' ',' ',' '],
				[' ',' ',' ',' ',' ',' ',' ',' ',' ',' '],
				[' ',' ',' ',' ',' ',' ',' ',' ',' ',' '],
				[' ',' ',' ',' ',' ',' ',' ',' ',' ',' '],
				[' ',' ',' ',' ',' ',' ',' ',' ',' ',' '],
				[' ',' ',' ',' ',' ',' ',' ',' ',' ',' '],
				[' ',' ',' ',' ',' ',' ',' ',' ',' ',' '],
				[' ',' ',' ',' ',' ',' ',' ',' ',' ',' '],
				[' ',' ',' ',' ',' ',' ',' ',' ',' ',' '],
				[' ',' ',' ',' ',' ',' ',' ',' ',' ',' '],
				[' ',' ',' ',' ',' ',' ',' ',' ',' ',' '],
				[' ',' ',' ',' ',' ',' ',' ',' ',' ',' '],
				[' ',' ',' ',' ',' ',' ',' ',' ',' ',' '],
				[' ',' ',' ',' ',' ',' ',' ',' ',' ',' '],
				[' ',' ',' ',' ',' ',' ',' ',' ',' ',' '],
				[' ',' ',' ',' ',' ',' ',' ',' ',' ',' '],
				[' ',' ',' ',' ',' ',' ',' ',' ',' ',' '],
				[' ',' ',' ',' ',' ',' ',' ',' ',' ',' '],
				[' ',' ',' ',' ',' ',' ',' ',' ',' ',' '], 
				[' ',' ',' ',' ',' ',' ',' ',' ',' ',' '],
				[' ',' ',' ',' ',' ',' ',' ',' ',' ',' ']
			];
	
	this.pieceGenerator = new function(){
			var pieces = [
				[
					['#',' '],
					['#',' '],
					['#','#']
				],
				[
					[' ','#'],
					[' ','#'],
					['#','#']
				],
				[
					['#','#',' '],
					[' ','#','#']
				],
				[
					[' ','#','#'],
					['#','#',' ']
				],
				[
					['#','#','#'],
					[' ','#',' ']
				],
				[
					['#','#'],
					['#','#']
				],
				[
					['#'],
					['#'],
					['#'],
					['#']
				]
			];
			
			function getRandomArbitrary(min, max) {
			  return Math.floor(Math.random() * (max - min)) + min;
			}
		
			function getRandomPiece(){
				return pieces[ getRandomArbitrary(0, pieces.length)];
			}
			
			this.generatePieceForBoardState = function(boardState){
				var piece = pieces[ getRandomArbitrary(0, pieces.length)];
				return {piece: piece, position: {col: getRandomArbitrary(0,boardState[0].length-piece[0].length +1), row: 0}};
			}
		};	
	
	if(pieceGeneratorOrState instanceof Array){
		var boardStateCopy = [];
		for(var lineI = 0; lineI < pieceGeneratorOrState.length; lineI++){
			boardStateCopy.push(pieceGeneratorOrState[lineI].slice());
		}
		startingBoardState = boardStateCopy;
	}else{
		this.pieceGenerator = pieceGeneratorOrState;	
	}
	
	
		
	if(typeof(startingBoardStateOrBoard) == "undefined" || startingBoardStateOrBoard instanceof Array){
		if(startingBoardStateOrBoard instanceof Array){
			var boardStateCopy = [];
			for(var lineI = 0; lineI < startingBoardStateOrBoard.length; lineI++){
				boardStateCopy.push(startingBoardStateOrBoard[lineI].slice());
			}
			this.boardState = boardStateCopy;
		}else{
			this.boardState = startingBoardState;	
		}
		
		this.cols = this.boardState[0].length;
		this.rows = this.boardState.length;
		var generatedPiece = this.pieceGenerator.generatePieceForBoardState(this.boardState);
		this.piece = generatedPiece.piece;
		this.piecePosition = generatedPiece.position;
	}else if(typeof(startingBoardStateOrBoard) == 'object'){
		var otherBoard = startingBoardStateOrBoard;
		this.piecePosition = {col: otherBoard.piecePosition.col, row: otherBoard.piecePosition.row};
		this.boardState = [];
		for(var lineI = 0; lineI < otherBoard.boardState.length; lineI++){
			this.boardState.push(otherBoard.boardState[lineI].slice());
		}
		
		this.cols = this.boardState[0].length;
		this.rows = this.boardState.length;
		
		this.piece = [];
		for(var lineI = 0; lineI < otherBoard.piece.length; lineI++){
			this.piece.push(otherBoard.piece[lineI].slice());
		}
	}
};

BoardClass.prototype = function(){	

	function fixPieceOnBoard(){
		var piecePosition = this.piecePosition;
		for(var pieceRow = 0; pieceRow < this.piece.length; pieceRow++){
			for(var pieceCol = 0; pieceCol < this.piece[pieceRow].length; pieceCol++){
				if(this.piece[pieceRow][pieceCol] == '#')
					this.boardState[piecePosition.row+pieceRow][piecePosition.col+pieceCol] = '#';
			}
		}
	}

	function rotateThisPiece(pieceToRotate){
		var newPiece = new Array(pieceToRotate[0].length);
		for(var npieceRow = 0; npieceRow < newPiece.length; npieceRow++){
			newPiece[npieceRow] = new Array(pieceToRotate.length);
		}

		for(var pieceRow = 0; pieceRow < pieceToRotate.length; pieceRow++){
			for(var pieceCol = pieceToRotate[pieceRow].length -1; pieceCol >= 0; pieceCol--){
				var pos = pieceToRotate[pieceRow].length -1 - pieceCol;
				newPiece[pos][pieceRow] = pieceToRotate[pieceRow][pieceCol];
			}
		}
		return newPiece;
	}

	function rotatePiece(){
		var piecePosition = this.piecePosition;
		var pieceCopy = [];
		
		for(var lineI = 0; lineI < this.piece.length; lineI++){
			pieceCopy.push(this.piece[lineI].slice());
		}
		
		var positionCopy = { col: piecePosition.col, row : piecePosition.row};
		pieceCopy = rotateThisPiece.call(this,pieceCopy);
		while(positionCopy.col+pieceCopy[0].length > this.cols){
			positionCopy.col--;
		}
		
		for(var pieceRow = 0; pieceRow < pieceCopy.length; pieceRow++){
			for(var pieceCol = 0; pieceCol < pieceCopy[pieceRow].length; pieceCol++){
				var pieceBottomEdge = positionCopy.row+pieceRow;
				if(pieceBottomEdge >= this.boardState.length)
					return;
				
				var pieceRightEdge = positionCopy.col+pieceCol;
				if(pieceRightEdge >= this.boardState[0].length)
					return;
				
				if(pieceCopy[pieceRow][pieceCol] == '#' && this.boardState[pieceBottomEdge][pieceRightEdge] == '#'){
					return;
				}
			}
		}
		
		this.piece = pieceCopy;
		this.piecePosition = positionCopy;
	}

	function throwANewPiece(){
		var generatedPiece = this.pieceGenerator.generatePieceForBoardState(this.boardState);
		this.piece = generatedPiece.piece;
		this.piecePosition = generatedPiece.position;
	}

	function thereIsSomethingBelowThePiece(){
		var piecePosition = this.piecePosition;
		for(var pieceRow = 0; pieceRow < this.piece.length; pieceRow++){
			for(var pieceCol = 0; pieceCol < this.piece[pieceRow].length; pieceCol++){
				if(this.piece[pieceRow][pieceCol] == '#' && this.boardState[piecePosition.row+pieceRow+1][piecePosition.col+pieceCol] == '#'){
					return true;
				}
			}
		}
		return false;
	}
	
	function thereIsSomethingOnTheRightOfThePiece(){
		var piecePosition = this.piecePosition;
		for(var pieceRow = 0; pieceRow < this.piece.length; pieceRow++){
			for(var pieceCol = this.piece[pieceRow].length -1 ; pieceCol >= 0; pieceCol--){
				if(this.piece[pieceRow][pieceCol] == '#' && this.boardState[piecePosition.row+pieceRow][piecePosition.col+pieceCol+1] == '#'){
					return true;
				}
			}
		}
		return false;
	}
	
	function thereIsSomethingOnTheLeftOfThePiece(){
		var piecePosition = this.piecePosition;
		for(var pieceRow = 0; pieceRow < this.piece.length; pieceRow++){
			for(var pieceCol = 0; pieceCol < this.piece[pieceRow].length; pieceCol++){
				if(this.piece[pieceRow][pieceCol] == '#' && this.boardState[piecePosition.row+pieceRow][piecePosition.col+pieceCol-1] == '#'){
					return true;
				}
			}
		}
		return false;
	}

	function checkIfLineIsFull(line){
		for(var col = 0; col < this.cols; col++){
			if(this.boardState[line][col] == ' ')
				return false;
		}
		return true;
	}

	function dropLinesAbove(line){
		for(var row = line; row > 0; row--){
			for(var col = 0; col < this.cols; col++){
				this.boardState[row][col] = this.boardState[row-1][col];
			}
		}
	}

	function removeLines(){
		var linesToRemove = [];
		for(var row = this.rows -1 ; row >= 0; row--){
			if(checkIfLineIsFull.call(this,row)){
				linesToRemove.push(row);
			}
		}

		var removedCount = 0;
		for(var line = 0; line < linesToRemove.length; line++){
			dropLinesAbove.call(this,linesToRemove[line]+removedCount);
			removedCount++;
		}
	}

	function step(){
		if(this.piecePosition.row+this.piece.length == this.rows || thereIsSomethingBelowThePiece.call(this)){
			fixPieceOnBoard.call(this);
			throwANewPiece.call(this);
			removeLines.call(this);
		}else{
			this.piecePosition.row+=1;
		}
	}
	
	function stepUntilPieceIsAtBottom(){
		while(this.piecePosition.row+this.piece.length != this.rows && !thereIsSomethingBelowThePiece.call(this)){
			this.piecePosition.row+=1;
		}
		fixPieceOnBoard.call(this);
		removeLines.call(this);
	}
	
	function getPieceWithPosition(){
		return {
			piece : this.piece,
			col : this.piecePosition.col,
			row : this.piecePosition.row
		};
	}
	
	function moveRight(){
		if(thereIsSomethingOnTheRightOfThePiece.call(this)){
			return;
		}
		
		if(this.piecePosition.col + this.piece[0].length < this.cols)
			this.piecePosition.col++;
	}
	
	function moveLeft(){
		if(thereIsSomethingOnTheLeftOfThePiece.call(this)){
			return;
		}
		
		if(this.piecePosition.col > 0)
			this.piecePosition.col--;
	}
	
	function toString(){
		var boardAsString = "";
		boardAsString = boardAsString.concat("\n\[\n");
		for(var row = 0; row < this.rows; row++){
			boardAsString = boardAsString.concat("\n\t\[");
			for(var col = 0; col < this.cols; col++){
				if(col == this.cols -1)
					boardAsString = boardAsString.concat("'"+ this.boardState[row][col]+"'");
				else
					boardAsString = boardAsString.concat("'"+ this.boardState[row][col]+"',");
			}
			if(row == this.rows -1)
				boardAsString = boardAsString.concat("\]");
			else
				boardAsString = boardAsString.concat("\],\n");
		}
		boardAsString = boardAsString.concat("\n\]\n");
		return boardAsString;
	}
	
	return {
		step : step,
		stepUntilPieceIsAtBottom : stepUntilPieceIsAtBottom,
		getPieceWithPosition : getPieceWithPosition,
		moveRight : moveRight,
		moveLeft : moveLeft,
		rotatePiece : rotatePiece,
		toString : toString
	};
}();

var pieceGenerator = new PieceGeneratorClass(true);
var Board =  new BoardClass(pieceGenerator);