function  Vector2(x,y) {
	this.x=x;
	this.y=y;
}
Vector2.prototype.move = function(vec2) {
	this.x+=vec2.x;
	this.y+=vec2.y;
};
Vector2.prototype.normalize = function(vec2) {
	var x=vec2.x-this.x;
	var y=vec2.y-this.y;
	var tan =y/x;
	return {
		x:x/Math.sqrt(x*x+y*y),
		y:y/Math.sqrt(x*x+y*y)
	}
};