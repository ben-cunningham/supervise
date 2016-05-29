'use strict';

angular.module('myApp.settings')
  .controller('InventoryController', ['$scope','Inventory', '$uibModal',  function($scope, Inventory, $uibModal) {
      $scope.items = Inventory.getList();

      $scope.open = function() {

          var modalInstance = $uibModal.open({
              animation: true,
              templateUrl: '../static/settings/inventory/modal.html',
              controller: 'ModalController'
          });

          modalInstance.result.then(function (item) {
              Inventory.addItem(item, function(response) {
                  // add completion
              });
          });
      }
  }
]);

angular.module('myApp.settings')
    .controller('ModalController', function ($scope, $uibModalInstance) {

      $scope.ok = function () {
          var item = {
              'name' : $scope.name,
              'total_quantity' : $scope.total_quantity,
              'units' : $scope.units,
          }

          $uibModalInstance.close(item);
      };

      $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
      };
});