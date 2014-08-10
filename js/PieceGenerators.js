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
	var phrase = "helloworld";
	var index = -1;
	
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
			['#',' ','#'],
			['#','#','#'],
			['#','#','#']
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
	
	this.generatePieceForBoardState = function(boardState){
		index = index + 1;
		console.log(String.fromCharCode(phrase.charCodeAt(index % phrase.length))); 
		var piece = pieces[phrase.charCodeAt(index % phrase.length) - 97];
		return {piece: piece, position: {col: getRandomArbitrary(0,boardState[0].length-piece[0].length +1), row: 0}};
	}
};