define(['game_state'], function(gameState){
  var canvas_ = null;
  var ctx_ = null;

  function step() {
    gameState.incX();
  }
  
  function update() {
    
  }
  
  function draw() {
    // debug:
    // take the canvas and drawing something on it  
    ctx_.clearRect(0,0,500,640);
    ctx_.fillStyle = 'rgb(0,0,255)';
    ctx_.fillRect(gameState.getX(),25,150,100);    
  }  
  
  function newFrame() {
    step();
    update();
    draw();
    window.requestAnimationFrame(newFrame);
  };

  function init(canvasId) {
    // creation of the field and initialization of the canvas
    gameState.init();
    canvas_ = document.getElementById(canvasId);
    ctx_ = canvas.getContext('2d');
    newFrame();
  }
  
  
  return {
    init: init
  };

});
