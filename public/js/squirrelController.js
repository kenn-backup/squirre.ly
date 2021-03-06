var squirrelController = function(){
  var squirrelCache;

  var getSquirrels = function(){
    Squirrel.all(function(squirrels){
      squirrelCache = squirrels;
      var evnt = new CustomEvent( 'getSquirrelsCompleted', 
                              {detail: {sqrls: squirrelCache}});
      document.dispatchEvent(evnt); 
    });
  };

  var getSquirrel = function(id){
    var squirrel;
    Squirrel.find(id,function(squirrel){
      console.log(squirrel);
    });
  };

  var deleteSquirrel = function( id ){
    sqrl = $.grep(squirrelCache, function(e){ return e.id == id; })[0];
    sqrl.destroy(function(){
      var evnt = new CustomEvent( 'deleteSquirrelCompleted',
                                  {detail: {id: sqrl.id}});
      document.dispatchEvent(evnt);
    });  
  }

  var updateSquirrel = function( squirrel ){
    squirrel = new Squirrel(param);
    squirrel.save(function(id){
      squirrel.id = id;    
      console.log(squirrel);
    });
  }

  var createSquirrel = function( params ){
    Squirrel.create( params, function(squirrel){
      console.log(squirrel); 
    });
  };

  document.addEventListener('deleteSqrlClicked',function(e){
    deleteSquirrel(e.detail.id); 
  },false);

  return{
    index:    getSquirrels,
    show:     getSquirrel,
    destroy:  deleteSquirrel
  }

}();
