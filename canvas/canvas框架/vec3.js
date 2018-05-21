

  function Vector3(x, y, z,fallLength,centerX,centerY) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.zeroX=centerX/2;
    this.zeroY=centerY/2;
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