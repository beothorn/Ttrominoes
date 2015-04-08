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

	function evaluate(board){
		var boardValue = 0;
		for(var row = 0; row < board.length; row++){
			for(var col = 0; col < board[row].length; col++){
				if(board[row][col] == '#'){
					boardValue++;
				}
			}
		}
		return (board.length * board[0].length) -  boardValue;
	}

	function getBestScoreForPieceAndState(piece, boardState){
			var bestPieceScore = 0;
			var bestState;
			for(var rotation = 0 ; rotation < 4; rotation++){
				for(var colI = 0 ; colI < boardState[0].length; colI++){
					var pieceGenerator = new function(){
						this.generatePieceForBoardState = function(){
							var col = colI;
							while(col+piece[0].length > boardState[0].length){
								col--;
							}
							return {piece: piece, position: {col: col, row: 0}};
						}
					}

					var testBoard = new Board(pieceGenerator, boardState);
					for(var i = 0; i < rotation; i++){
						testBoard.rotatePiece();
					}
					testBoard.stepUntilPieceIsAtBottom();
					var playScore = evaluate(testBoard.boardState);

					if(playScore > bestPieceScore){
						bestPieceScore = playScore;
						bestState = testBoard;
					}
				}
			}

			return {bestPieceScore:bestPieceScore , state: bestState};
	}

	function generatePossiblePiecesForBoardState(boardState){
			var bestPlay = {piece:'',score:-1,state:''};
			var worstPlay = {piece:'',score:99999,state:''};

			for(var pieceI = 0 ; pieceI < pieces.length; pieceI++){
				var bestPieceScoreAndState = getBestScoreForPieceAndState(pieces[pieceI], boardState);
				var bestPieceScore = bestPieceScoreAndState.bestPieceScore;
				var resultingState = bestPieceScoreAndState.state;

				if(bestPieceScore > bestPlay.score || (bestPieceScore == bestPlay.score && getRandomArbitrary(0,2) == 1)){
						bestPlay.piece = pieceI;
						bestPlay.score = bestPieceScore;
						bestPlay.state = resultingState;
				}

				if(bestPieceScore < worstPlay.score || (bestPieceScore == worstPlay.score && getRandomArbitrary(0,2) == 1)){
						worstPlay.piece = pieceI;
						worstPlay.score = bestPieceScore;
						worstPlay.state = resultingState;
				}
			}


			return {bestPlay: bestPlay, worstPlay: worstPlay};
	}

	function generatePieceForBoardState(boardState, nextPiece){
			if(nextPiece){
					boardState = getBestScoreForPieceAndState(nextPiece, boardState).state.getState()
			}

			var possiblePieces = generatePossiblePiecesForBoardState(boardState)
			var worstPlay = possiblePieces.worstPlay;
			var bestPlay = possiblePieces.bestPlay;

			var piece = pieces[worstPlay.piece];

			if(this.shouldGiveBestPiece){
					piece = pieces[bestPlay.piece];
			}

			var x = generatePossiblePiecesForBoardState(worstPlay.state.getState());
			//console.log(JSON.stringify(pieces[x.worstPlay.piece]));

			return {
				piece: piece,
				position: {col: getRandomArbitrary(0,boardState[0].length-piece[0].length +1), row: 0}
			};
	}

	return {
		generatePieceForBoardState : generatePieceForBoardState
	};
})();
