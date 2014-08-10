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
			//fair piece generator
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
		this.piece = rotateThisPiece.call(this,this.piece);
		while(piecePosition.col+this.piece[0].length > this.cols){
			piecePosition.col--;
		}
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
		if(this.piecePosition.col + this.piece[0].length < this.cols)
			this.piecePosition.col++;
	}
	
	function moveLeft(){
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

var PieceGeneratorClass = function(giveBestPiece){
	this.shouldGiveBestPiece = giveBestPiece || false;
};

PieceGeneratorClass.prototype = (function(){
	
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
		return pieces[0];
	}
	
	function evaluate(board){
		for(var row = 0; row < board.length; row++){
			for(var col = 0; col < board[row].length; col++){
				if(board[row][col] == '#'){
					return board.length-(board.length-row);			
				}
			}
		}
		return board.length;
	}
	
	function generatePieceForBoardState(boardState){
		
		if( evaluate(boardState) > boardState.length - 3){
			var piece = pieces[ getRandomArbitrary(0, pieces.length)];
			return {piece: piece, position: {col: getRandomArbitrary(0,boardState[0].length-piece[0].length +1), row: 0}};
		}
		
		var topScore = -1;
		var pieceToBeUsed = 0;
		for(var pieceI = 0 ; pieceI < pieces.length; pieceI++){	
			var bestPieceScore = 0;
			for(var rotation = 0 ; rotation < 4; rotation++){
				for(var colI = 0 ; colI < boardState[0].length; colI++){
					var startingConditions = new function(){
						this.generatePieceForBoardState = function(){
							var piece = pieces[pieceI];
							var col = colI;
							while(col+piece[0].length > boardState[0].length){
								col--;
							}
							return {piece: piece, position: {col: col, row: 0}};
						}
					}
					
					var testBoard = new BoardClass(startingConditions, boardState);
					for(var i = 0; i < rotation; i++){
						testBoard.rotatePiece();
					}
					testBoard.stepUntilPieceIsAtBottom();
					var playScore = evaluate(testBoard.boardState);
					
					if(playScore > bestPieceScore){
						bestPieceScore = playScore;
					}
				}
			}
			if(this.shouldGiveBestPiece){
				if(bestPieceScore >= topScore || topScore == -1){
					if(bestPieceScore > topScore){
						pieceToBeUsed = pieceI;
						topScore = bestPieceScore;
					}else{
						if(getRandomArbitrary(0, 2) == 1){
							pieceToBeUsed = pieceI;
							topScore = bestPieceScore;
						}
					}
				}
			}else{
				if(bestPieceScore <= topScore || topScore == -1){
					if(bestPieceScore < topScore){
						pieceToBeUsed = pieceI;
						topScore = bestPieceScore;
					}else{
						if(getRandomArbitrary(0, 2) == 1){
							pieceToBeUsed = pieceI;
							topScore = bestPieceScore;
						}
					}
				}
			}
		}
		
		
		var piece = pieces[pieceToBeUsed];
		return {piece: piece, position: {col: getRandomArbitrary(0,boardState[0].length-piece[0].length +1), row: 0}};
	}
	
	return {
		generatePieceForBoardState : generatePieceForBoardState
	};
})();

var letterPieceGenerator = new function(){
	var pieces = [
		[
			['#','#','#'],
			['#',' ','#'],
			['#','#','#'],
			['#',' ','#'],
			['#',' ','#']
		],
		[
			['#','#','#'],
			['#',' ','#'],
			['#','#',' '],
			['#',' ','#'],
			['#','#','#']
		],
		[
			['#','#','#'],
			['#',' ',' '],
			['#',' ',' '],
			['#',' ',' '],
			['#','#','#']
		],
		[
			['#','#',' '],
			['#',' ','#'],
			['#',' ','#'],
			['#',' ','#'],
			['#','#',' ']
		],
		[
			['#','#','#'],
			['#',' ',' '],
			['#','#',' '],
			['#',' ',' '],
			['#','#','#']
		],
		[
			['#','#','#'],
			['#',' ',' '],
			['#','#',' '],
			['#',' ',' '],
			['#',' ',' ']
		],
		[
			['#','#','#'],
			['#',' ',' '],
			['#','#','#'],
			['#',' ','#'],
			['#','#','#']
		],
		[
			['#',' ','#'],
			['#',' ','#'],
			['#','#','#'],
			['#',' ','#'],
			['#',' ','#']
		],
		[
			['#'],
			['#'],
			['#'],
			['#'],
			['#']
		],
		[
			[' ',' ','#'],
			[' ',' ','#'],
			[' ',' ','#'],
			['#',' ','#'],
			[' ','#',' ']
		],
		[
			['#',' ','#'],
			['#',' ','#'],
			['#','#',' '],
			['#',' ','#'],
			['#',' ','#']
		],
		[
			['#',' '],
			['#',' '],
			['#',' '],
			['#',' '],
			['#','#']
		],
		[
			['#',' ','#'],
			['#','#','#'],
			['#',' ','#'],
			['#',' ','#'],
			['#',' ','#']
		],
		[
			['#',' ','#'],
			['#',' ','#'],
			['#','#','#'],
			['#',' ','#'],
			['#',' ','#']
		],
		[
			[' ','#',' '],
			['#',' ','#'],
			['#',' ','#'],
			['#',' ','#'],
			[' ','#',' ']
		],
		[
			['#','#',' '],
			['#',' ','#'],
			['#','#',' '],
			['#',' ',' '],
			['#',' ',' ']
		],
		[
			['#','#','#'],
			['#',' ','#'],
			['#',' ','#'],
			['#',' ','#'],
			['#','#','#'],
			[' ',' ','#']
		],
		[
			['#','#',' '],
			['#',' ','#'],
			['#','#',' '],
			['#',' ','#'],
			['#',' ','#']
		],
		[
			['#','#','#'],
			['#',' ',' '],
			[' ','#','#'],
			[' ',' ','#'],
			['#','#','#']
		],
		[
			['#','#','#'],
			[' ','#',' '],
			[' ','#',' '],
			[' ','#',' '],
			[' ','#',' ']
		],
		[
			['#',' ','#'],
			['#',' ','#'],
			['#',' ','#'],
			['#',' ','#'],
			['#','#','#']
		],
		[
			['#',' ','#'],
			['#',' ','#'],
			['#',' ','#'],
			['#',' ','#'],
			[' ','#',' ']
		],
		[
			['#',' ','#'],
			['#',' ','#'],
			[' ','#',' '],
			['#',' ','#'],
			['#',' ','#']
		],
		[
			['#',' ','#'],
			['#',' ','#'],
			[' ','#',' '],
			[' ','#',' '],
			[' ','#',' ']
		],
		[
			['#','#','#'],
			[' ',' ','#'],
			[' ','#',' '],
			['#',' ',' '],
			['#','#','#']
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

var pieceGenerator = new PieceGeneratorClass(true);
var Board =  new BoardClass(pieceGenerator);