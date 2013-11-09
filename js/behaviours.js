var pathimg = '../img/',
    pathbg  = pathimg + 'bg/';

$(function(){
    var worker = new Worker("../js/worker.js");
     
    // Watch for messages from the worker
    worker.onmessage = function(e){
      // The message from the client:
      console.log(e.data);
      worker.postMessage("stop");
    };
     
    worker.postMessage("start");


   
});