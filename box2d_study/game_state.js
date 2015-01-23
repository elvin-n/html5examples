/**
This file describes the current state of the game. It is responsivle for calling
redrawing of the objects which are visible currently
*/

define([], function(){
  var x_;
  function init() {
    x_ = 0;
  }

  function getX() {
    return x_;
  }
  
  function incX() {
    if (x_ < 600) {
      x_++;
    } else {
      x_ = 0;
    }
  }
  
  return {
    init: init,
    getX: getX,
    incX: incX
  };

});
