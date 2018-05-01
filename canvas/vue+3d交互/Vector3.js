var fallLength = 250, centerX = 200/ 2, centerY = 200 / 2;


  function Vector3(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
    this._get2d = function() {
      var scale = fallLength / (fallLength + this.z);
      var x = centerX + this.x * scale;
      var y = centerY + this.y * scale;
      return { x: x, 
              y: y };
    }
  }
  function rotateX(vec3,angleX) {
    var cos = Math.cos(angleX);
    var sin = Math.sin(angleX);
 
      var y1 = vec3.y * cos - vec3.z * sin;
      var z1 = vec3.z * cos + vec3.y * sin;
      vec3.y = y1;
      vec3.z = z1;

  }

  function rotateY(vec3,angleY) {
    var cos = Math.cos(angleY);
    var sin = Math.sin(angleY);

      var x1 = vec3.x * cos - vec3.z * sin;
      var z1 = vec3.z * cos + vec3.x * sin;
      vec3.x = x1;
      vec3.z = z1;
  }
// new shape({
// 	site:new Vector3(),
// 	path:[],
//  pro:{}

// })
var shapes=[];
function shape(option) {
	this.points=[];
	this.site=new Vector3(0,0,0);
	this.create(option);
	this.face=[];
	this.ctx={};
}
shape.prototype.defaults = {
  stroke: true,
  fill: false,
  color: 'black',
  lineWidth: 1,
  closed: true,
  rendering: true,
  paths: [ {} ],
};
shape.prototype.create = function(option) {
	var defaults=this.defaults;
	for(let pro in option){
			this[pro]=option[pro];
	}
	shapes.push(this);

};
shape.prototype.render = function(ctx) {
	this.ctx=ctx;
    for(let f =0;f<this.paths.length;f++){
    	this.face[f]=new Face(this.ctx,this.color,...this.paths[f]);
    }
    this.face.sort(function(a,b){
    	return a-b;
    })
    this.face.forEach( function(face, index) {
    	face.draw(ctx);
    });
  }

  shape.prototype.rotate = function(angleX,angleY) {
    for(let f =0;f<this.face.length;f++){
    	let {v1,v2,v3,v4}=this.face[f];
    		rotateX(v1,angleX);
    		rotateX(v2,angleX);
    		rotateX(v3,angleX);
    		rotateX(v4,angleX);
    		rotateY(v1,angleY);
    		rotateY(v2,angleY);
    		rotateY(v3,angleY);
    		rotateY(v4,angleY);
    }  	
  };

function Face(ctx,color,vector1, vector2, vector3, vector4) {
	this.ctx={};
    this.v1 = vector1;
    this.v2 = vector2;
    this.v3 = vector3;
    this.v4 = vector4;
    this.color = color;
    this.zIndex = this.v1.z + this.v2.z + this.v3.z + this.v4.z;
    this.draw = function(ctx) {
         var {x:x1,y:y1}=this.v1._get2d();
         var {x:x2,y:y2}=this.v2._get2d();
         var {x:x3,y:y3}=this.v3._get2d();
         var {x:x4,y:y4}=this.v4._get2d();
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(x1,y1);
      ctx.bezierCurveTo(x2,y2,x3,y3,x4,y4);
      ctx.closePath();
      ctx.fillStyle = this.color;
      ctx.fill();
      ctx.restore();
    }
  }

