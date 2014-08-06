var BoardClass = function(){
	this.piecePosition = {col: 0, row: 0};
	
	this.boardState = [
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
	
	this.cols = this.boardState[0].length;
	this.rows = this.boardState.length;
	this.piece = [];
};

BoardClass.prototype = function(){ 

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
	
	function start(startingPiece, startingPieceBoardState, startingRotation){
		if(startingPiece)
			this.piece = startingPiece;
		else
			this.piece = getRandomPiece();
	}

	function getRandomArbitrary(min, max) {
	  return Math.floor(Math.random() * (max - min)) + min;
	}

	function getRandomPiece(){
		return pieces[ getRandomArbitrary(0, pieces.length)];
	}

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
		this.piece = pieces[ getRandomArbitrary(0, pieces.length)];
		this.piecePosition.row = 0;
		this.piecePosition.col = getRandomArbitrary(0,this.cols-this.piece[0].length +1);
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
	
	return {
		start : start,
		step : step,
		getPieceWithPosition : getPieceWithPosition,
		moveRight : moveRight,
		moveLeft : moveLeft,
		rotatePiece : rotatePiece
	};
}();

var Board = new BoardClass();
var Board2 = new BoardClass();