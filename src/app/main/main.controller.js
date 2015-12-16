(function() {
  'use strict';

  angular
    .module('gulpGrid')
    .directive('draggable', draggable)
    .directive('droppable', droppable)
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($timeout, webDevTec, toastr) {
    var vm = this;

    vm.drop = drop;
    vm.drag = drag;

    var x = new Array(6);

    for (var i = 0; i < 6; i++) {
      x[i] = buildArray(i)
    }

    function buildArray(row){

    var obj = [
      {col: [1,2,3,4],droppable:[0,1,2,3,4,5]},
      {col: [0,5],droppable:[0,5]},
      {col: [0,2,3,5],droppable:[0,2,3,5]},
      {col: [0,2,3,5],droppable:[0,2,3,5]},
      {col: [0,2,3,5],droppable:[0,2,3,5]},
      {col: [0,2,3,5],droppable:[0,2,3,5]}
    ]

      var arr = [];
      for(var i =0;i< 6;i++){
        var  newObj = { camera: false,sensor:false,parking:false,droppable: false, column: i, row : row};
        if(obj[row].col.indexOf(i) >= 0){
          newObj.parking = true;
        }
        if(obj[row].droppable.indexOf(i) >= 0){
          newObj.droppable = true;
        }
        arr.push(newObj);
      }
      return arr
    }



    // for(var i =0;i< x.length;i++){
    //   console.log(x[i].length);
    // }

    console.log(x);
    
    //vm.grid[8][8];
    vm.grid = x



    vm.cameras = [];

    function drop(i,j){
      console.log(i)
      console.log(j)
    }

    function drag(item){
      console.log(item)
    }
  }

  function draggable(){
    return {
      restrict:'A',
      link:function(scope, element, attrs){
        element.draggable({
          helper:'clone',
          start:function(event,ui){
          },
          stop:function(event,ui){
          }
        })
      }
    }
  }

  function droppable(){
    return {
      restrict:'A',
      scope:{
        tableCell: '='
      },
      link:function(scope,element,attrs){
        element.droppable({
          drop:function(event,ui){
            if(event.toElement.title =='camera'){
              scope.tableCell.camera = true
            }
            if(event.toElement.title =='sensor'){
              scope.tableCell.sensor = true
            }
            scope.$apply();
          }
        })
      }
    }
  }

})();
