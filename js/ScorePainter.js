var ScorePainter = function(canvasContext){
    this.context = canvasContext;
    this.score = 0;
};

ScorePainter.prototype = function(){
    
    function textHeight(text){
        var d = document.createElement("span");
        d.font = context.font;
        d.textContent = text;
        document.body.appendChild(d);
        var emHeight = d.offsetHeight;
        document.body.removeChild(d);
        return emHeight;
    }
    
    function draw(){
        
        this.context.fillStyle = "yellow";
        this.context.fillRect(this.x, this.y , this.width, this.width);
        
        var fontSize = this.width/4;
        
        this.context.font = "bold "+fontSize+"px Arial";
        this.context.strokeStyle = "black";
        this.context.lineWidth = 3;
        this.context.fillStyle = "white";
        var text = "Score: "+this.score;
        
        var metrics = context.measureText(text);
        var textWidth = metrics.width;
        
        var textH = textHeight(text);
        this.context.strokeText(text, this.x + (textWidth/ 2) - (this.width/2), this.y+textH);
        this.context.fillText(text, this.x + (textWidth/ 2) - (this.width/2), this.y+textH);
    }
    
    function setPosition(x, y){
        this.x = x;
        this.y = y;
    }
    
    function setWidth(width){
        this.width = width;
    }
    
    function getWidth(){
        return this.width;
    }
    
    function addScore(score){
        this.score += score;
    }
    
    return{
        getWidth : getWidth,
        setWidth : setWidth,
        draw : draw,
        setPosition : setPosition,
        addScore : addScore
    };
}();