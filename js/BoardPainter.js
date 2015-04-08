var BoardPainter = function(board, canvasContext){
    this.board = board;
    this.context = canvasContext;
};

BoardPainter.prototype = function(){

    function setPieceSize(pieceSize){
        this.pieceSize = pieceSize;
    }

    function setPosition(x, y){
        this.boardX = x;
        this.boardY = y;
    }

    function createRounRectPath(x, y, width, height){
        var radius = width/2.5;
        this.context.beginPath();
        this.context.moveTo(x + radius, y);
        this.context.lineTo(x + width - radius, y);
        this.context.quadraticCurveTo(x + width, y, x + width, y + radius);
        this.context.lineTo(x + width, y + height - radius);
        this.context.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
        this.context.lineTo(x + radius, y + height);
        this.context.quadraticCurveTo(x, y + height, x, y + height - radius);
        this.context.lineTo(x, y + radius);
        this.context.quadraticCurveTo(x, y, x + radius, y);
        this.context.closePath();
    }

    function drawPieceShadow(x, y, width, height) {
        var oldFill = this.context.fillStyle;
        this.context.fillStyle = "#333333";
        createRounRectPath(x+3, y+3, width, height);
        this.context.fill();
        this.context.fillStyle = oldFill;
    }

    function drawPiece(x, y, width, height) {
        createRounRectPath(x, y, width, height);
        this.context.fill();

        var oldFill = this.context.fillStyle;
        this.context.fillStyle = 'rgba(255,255,255,0.1)';
        this.context.beginPath();
        this.context.arc(x+width/4, y+width/4, width/5,0, Math.PI*2, true);
        this.context.closePath();
        this.context.fill();

        this.context.fillStyle = oldFill;
    }


    function draw(){

        var next = board.getNextPiece();
        if(next){
            var nextPiece = next.piece;
            for(var row = 0; row < nextPiece.length; row++){
                for(var col = 0; col < nextPiece[0].length; col++){
                    if(nextPiece[row][col] == '#'){
                        drawPieceShadow(col*this.pieceSize + 10, row*this.pieceSize + 10 , this.pieceSize, this.pieceSize);
                    }
                }
            }
        }


      //---------------------
        var pieceWithPosition = board.getPieceWithPosition();

        var pieceColPos = pieceWithPosition.col;
        var pieceRowPos = pieceWithPosition.row;
        var piece = pieceWithPosition.piece;
        var boardState = board.boardState;
        var rows = boardState.length;
        var cols = boardState[0].length;

        this.context.fillStyle = 'rgba(46,70,101,0.4)';
        this.context.fillRect(this.boardX, this.boardY , cols*this.pieceSize, rows*this.pieceSize);

        for(var row = 0; row < rows; row++){
            for(var col = 0; col < cols; col++){
                if(boardState[row][col] == '#'){
                    drawPieceShadow(col*this.pieceSize + this.boardX, row*this.pieceSize + this.boardY , this.pieceSize, this.pieceSize);
                }
            }
        }

        for(var pieceRow = 0; pieceRow < piece.length; pieceRow++){
            for(var pieceCol = 0; pieceCol < piece[pieceRow].length; pieceCol++){
                if(piece[pieceRow][pieceCol] == '#'){
                    drawPieceShadow((pieceColPos+pieceCol)*this.pieceSize + this.boardX, (pieceRowPos+pieceRow)*this.pieceSize + this.boardY , this.pieceSize, this.pieceSize);
                }
            }
        }

        this.context.fillStyle = "#ff5724";
        for(var row = 0; row < rows; row++){
            for(var col = 0; col < cols; col++){
                if(boardState[row][col] == '#'){
                    drawPiece(col*this.pieceSize + this.boardX, row*this.pieceSize + this.boardY , this.pieceSize, this.pieceSize);
                }
            }
        }

        this.context.fillStyle = "#cc2929";
        for(var pieceRow = 0; pieceRow < piece.length; pieceRow++){
            for(var pieceCol = 0; pieceCol < piece[pieceRow].length; pieceCol++){
                if(piece[pieceRow][pieceCol] == '#'){
                    drawPiece((pieceColPos+pieceCol)*this.pieceSize + this.boardX, (pieceRowPos+pieceRow)*this.pieceSize + this.boardY , this.pieceSize, this.pieceSize);
                }
            }
        }
    }

    function getWidth(){
        return board.boardState[0].length * this.pieceSize;
    }

    function getX(){
        return this.boardX;
    }

    return {
        draw : draw,
        setPieceSize : setPieceSize,
        setPosition : setPosition,
        getWidth : getWidth,
        getX : getX
    }
}();
