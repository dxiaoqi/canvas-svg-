 const Trees=[];
  class drawTree{
  		constructor(option){
  			this.name=option.name?option.name:"sprite";
  			this.Layer=option.Layer?option.Layer:"ui";
  			this.tag=option.tag?option.tag:'parent';
  			this.Mapdata=option.Mapdata?option.Mapdata:{
  										arratdata:new Uint8ClampedArray(),
  										width:0,
  										height:0};
  			this.child=option.child;
  			this.path=option.path?option.path:new Function();
  			this.active=option.active;
  			this.draw=option.draw;
  			this.sprite={};
  			this.ctx=option.ctx?option.ctx:console.log('error:can not get ctx');
  			this.statues=new statue();
  			if(this.ctx) this.init(this.ctx);
  			if(this.child) this.createChild(this.child);
  			if(this.tag=='parent')this.todo();
  		}
  		createChild(data){
  			var _self=this;
  			data.forEach( function(chi, index) {
  				chi.ctx=_self.ctx;
  				chi.tag='child';
  				_self.child[index]=new drawTree(chi);
  			});
  			loop();
  		}
  		init(ctx){
  			var _self=this;
  			this.sprite=new Sprite({
  				tree:_self,
  				site:{x:0,y:0},
  				ctx:_self.ctx
  			})
  			if(this.path) this.sprite.update(this.path);
  			Trees.push(this);
  		}
  		setStatus(tree){
  			this.nextStatus=tree;
  			tree.lastStatues=this;
  		}
  		todo(){
		  	this._active(this.draw,this.active);
		  	if(this.child){
		  			this.child.forEach( function(tree, index) {
		  				tree.todo();
		  			});
		  	}

  		}
  		loop(){
  			var _self=this;
		  	if (this.tag=='parent')loop(_self);
  		}
  		_active(fn1,fn2){
  			this.sprite.active(fn1,fn2);
  		}
  		back(){
  			this.sprite.back();
  		}

  }




  var util={
  	getEle:function(name){
  		for(let pos=0;pos<Trees.length;pos++){
  			if(Trees[pos].name==name){
  				return Trees[pos];
  			}else{
  				if(pos==Trees.length) return null;
  			}
  		}
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
function loop(){
	var w=Trees[0].ctx.canvas.width;
	var h=Trees[0].ctx.canvas.height;
	   	for(let pos=0;pos<Trees.length;pos++){
  				Trees[pos].sprite.ctx.clearRect(0,0,w,h);
  			if(Trees[pos].tag=='parent'){
  				Trees[pos].ctx.clearRect(0,0,w,h);
  				Trees[pos].todo();
  			}
  		}
  		requestAnimFrame(loop); 
}