const t=1;
function  vector2(x,y) {
	this.x=x;
	this.y=y;
}
vector2.prototype.move = function(vec2) {
	this.x+=vec2.x;
	this.y+=vec2.y;
};
vector2.prototype.normalize = function(vec2) {
	var x=vec2.x-this.x;
	var y=vec2.y-this.y;
	var tan =y/x;
	return {
		x:x/Math.sqrt(x*x+y*y),
		y:y/Math.sqrt(x*x+y*y)
	}
};
function dot(x,y,ax=0,ay=0,color="black") {
	this.site=new vector2(x,y);
	this.end=new vector2(x,y);
	this.vx=this.site.normalize(new vector2(this.endX,this.endY)).x;
	this.vy=this.site.normalize(new vector2(this.endX,this.endY)).y
	this.ax=ax;
	this.ay=ay;
	this.color=color;
	this.direction={
		hor:0,
		ver:0
	}
	this.ctx={};
}
dot.prototype.setEnd = function(vec2) {
	this.end=vec2;
	this.vx=this.site.normalize(this.end).x;
	this.vy=this.site.normalize(this.end).y;
	if(vec2.x>this.site.x){this.direction.hor=1}
	if(vec2.x<this.site.x){this.direction.hor=-1}
	if(vec2.y>this.site.y){this.direction.ver=-1}
	if(vec2.y<this.site.y){this.direction.ver=1}
};
dot.prototype.move = function() {
	this.vy+=this.ay*t;
	this.vx+=this.ax*t;
	var hor="";
	var ver="";
	switch (this.direction.hor) {
		case 1:
			hor='floor';
			break;
		case 0:
			hor='floor';
			break;
		case -1:
			hor='ceil';
		default:
			break;
	}
	switch (this.direction.ver) {
		case 1:
			ver='ceil';
			break;
		case 0:
			ver='floor';
			break;
		case -1:
			ver='floor';
		default:
			break;
	}
	if(Math[hor](this.site.x)!=this.end.x||Math[ver](this.site.y)!=this.end.y){
		this.site.move(new vector2(this.vx,this.vy));
	}
};
dot.prototype.render = function(ctx) {
	this.ctx=ctx;
	ctx.save();
	ctx.fillStyle=this.color;
	ctx.fillRect(this.site.x-size/2,this.site.y-size/2,size.size);
	ctx.fill();
	ctx.restore();
};
dot.prototype.update = function() {
	this.ctx.clearRect(0,0,canvas.width,canvas.height);
	this.move();
	this.render();
};
var vec=new dot(0,0);
vec.setEnd(new vector2(-3,4));
vec.move();
setInterval(function(argument) {
	vec.move();
},1000)