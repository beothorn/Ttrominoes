var ScorePainter = function(canvasContext, x, y, width){
    this.x = x;
    this.y = y;
    this.context = canvasContext;
    this.width = width;
};

ScorePainter.prototype = function(){
    
    function draw(){
        
        this.context.fillStyle = "yellow";
        this.context.fillRect(this.x, this.y , this.width, this.context.height);
        
        this.context.font = "bold "+this.width+"px Arial";
        this.context.strokeStyle = "black";
        this.context.lineWidth = 3;
        this.context.fillStyle = "white";
        var text = "Score:";
        this.context.strokeText(text, this.x, this.y);
        this.context.fillText(text, this.x, this.y);
    }
    
    function getWidth(){
        return this.width;
    }
    
    return{
        getWidth : getWidth,
        draw : draw
    };
}();