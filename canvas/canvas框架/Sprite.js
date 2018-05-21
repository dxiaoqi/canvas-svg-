// var Fun=[Rect,Circle]
class Sprite{
	constructor(option){
		this.site=option.site;
		this.v 	 =option.v?option.v:new Vector2(0,0);
		this.alpha=option.alpha?option.alpha:1;
		this.todo=[];
		this.offCtx=option.ctx;
		this.tree=option.tree;
		this.ctx=this.Render();
	}
	Rect(x,y,w,h,style,attr){
		var ctx=this.ctx;
		ctx.save();
		for(let s=0;s<style.length;s++){
			ctx[style[s]]=attr[s];
		}
		ctx.Rect(x,y,w,h);
		ctx.fill();
		ctx.stroke();
		ctx.restore();
	}
	update(fn){
		fn.call(this);
	}
	back(){
		this.offCtx.drawImage(this.tree.lastStatues,0,0);
	}
	draw(fn){
		var w=this.offCtx.canvas.width;
		var h=this.offCtx.canvas.height;
		fn.call(this);
		var data=this.ctx.getImageData(0,0,w,h);
		this.offCtx.drawImage(this.ctx.canvas,0,0);
		this.tree.lastStatues=data;
	}
	active(fn1,fn2){
		var _self=this;
		this.draw(fn1);
		if(fn2) fn2.call(this);
	}
	Render() {
	    var canva=this.offCtx.canvas;
	    var backBuffer=document.createElement('canvas');
	    backBuffer.width=canva.width;
	    backBuffer.height=canva.height;
	    var backBufferctx=backBuffer.getContext('2d');
	    return backBufferctx;
    
	}
}



window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();