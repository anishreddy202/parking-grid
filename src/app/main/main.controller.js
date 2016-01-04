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
    vm.deviceInfo = {};
    vm.onDrop = false;
    vm.selectedCell = null;
    vm.save = save;
    vm.cancel =cancel;
    vm.deviceType = null;
    vm.showDeviceInfo = showDeviceInfo;
    vm.showdelete = false;
    vm.deleteDevice = deleteDevice;


    function deleteDevice(){

      if(vm.deviceType === 'camera'){
        vm.selectedCell.camera.enable = false;
        vm.selectedCell.camera.name = null;
        vm.selectedCell.camera.url = null;
      }
      if(vm.deviceType === 'sensor'){
        vm.selectedCell.sensor.enable = false;
        vm.selectedCell.sensor.name = null;
        vm.selectedCell.sensor.url = null;

      }
      vm.selectedCell = null;
      vm.deviceInfo = {};
      vm.onDrop = false;
      vm.deviceType = null;
    }
    function showDeviceInfo(col,type){
      vm.selectedCell = col;
      vm.deviceType = type;
      vm.onDrop = true;
      vm.showdelete = true;

      console.log(col);

      if(vm.deviceType === 'camera'){
        vm.deviceInfo.name = col.camera.name;
        vm.deviceInfo.url = col.camera.url;
      }
      if(vm.deviceType === 'sensor'){
        vm.deviceInfo.name = col.sensor.name;
        vm.deviceInfo.url = col.sensor.url;
      }

      console.log(vm.deviceType)
    }

    function save(){
      if(vm.deviceType === 'camera'){
        vm.selectedCell.camera.enable = true;
        vm.selectedCell.camera.name =  vm.deviceInfo.name;
        vm.selectedCell.camera.url =  vm.deviceInfo.url;
      }
      if(vm.deviceType === 'sensor'){
        vm.selectedCell.sensor.enable = true;
        vm.selectedCell.sensor.name =  vm.deviceInfo.name;
        vm.selectedCell.sensor.url =  vm.deviceInfo.url;
      }
      vm.deviceInfo = {};
      vm.onDrop = false;  
    }
    function cancel(){
      vm.selectedCell = null;
      vm.deviceInfo = {};
      vm.onDrop = false;
      vm.deviceType = null;
    }
    var x = new Array(10);


    for (var i = 0; i < 10; i++) {
      x[i] = buildArray(i)
    }

    function buildArray(row){

    var obj = [
      {col: [1,2,3,4,5,6,7,8],droppable:[0,1,2,3,4,5,6,7,8,9]},
      {col: [0,9],droppable:[0,9]},
      {col: [0,9],droppable:[0,9]},
      {col: [0,4,5,9],droppable:[0,4,5,6,9]},
      {col: [0,4,5,9],droppable:[0,4,3,5,6,9]},
      {col: [0,4,5,9],droppable:[0,4,3,5,6,9]},
      {col: [0,4,5,9],droppable:[0,4,3,5,6,9]},
      {col: [0,4,5,9],droppable:[0,4,3,5,6,9]},
      {col: [0,4,5,9],droppable:[0,4,3,5,6,9]},
      {col: [0,4,5,9],droppable:[0,4,3,5,6,9]}
    ]

      var arr = [];
      for(var i =0;i< 10;i++){
        var  newObj = { camera: { enable:false},sensor:{enable:false},parking:false,droppable: false, column: i, row : row};
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

    vm.grid = x

    vm.cameras = [];
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
      link:function(scope,element,attrs,$rootScope){
        element.droppable({
          drop:function(event,ui){

            //console.log($rootScope);
            
            scope.$parent.$parent.$parent.$parent.vm.selectedCell = scope.tableCell;
            scope.$parent.$parent.$parent.$parent.vm.deviceType = event.toElement.title;
            scope.$parent.$parent.$parent.$parent.vm.onDrop = true;
            console.log(scope.$parent.$parent.$parent.$parent.vm);
              //  scope.$parent.$parent.$parent.onDrop = true;
             //scope.$apply();
            // if(event.toElement.title =='camera'){
            //   scope.tableCell.camera.enable = true
            // }
            // if(event.toElement.title =='sensor'){
            //   scope.tableCell.sensor.enable = true
            // }
            scope.$apply();
          }
        })
      }
    }
  }

})();
