'use strict';

angular.module('myApp.settings')
  .controller('InventoryController', ['$scope','Inventory',  function($scope, Inventory) {
      $scope.items = Inventory.getList();
  }
]);