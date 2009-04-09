
// EvoJS - Core - Copyright (c) TJ Holowaychuk <tj@vision-media.ca>

(function(){
  
  this.Evo = { version : '0.0.1' }
  
  /**
   * Merge methods and properties of _other_.
   *
   * @param  {hash} other
   * @return {mixed} this
   * @api public
   */
  
  Object.prototype.extend = function(other) {
    for (key in other)
      if (other.hasOwnProperty(key))
        this[key] = other[key]
    return this
  }
  
  /**
   * Merge prototype with methods and properties with _mixin_.
   *
   * @param  {hash} mixin
   * @return {mixed} this
   * @api public
   */
  
  Object.prototype.include = function(mixin) {
    return this.prototype.extend(mixin)
  }
  
})()