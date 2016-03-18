angular.module('starter.controllers', ['main.models'])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('PlaylistsCtrl', function($scope, $ionicModal, $ionicPopup, product, total) {
        $scope.items = [];
        $scope.subtotal = 0;
        $scope.iva = 0;
        $scope.total = 0;
        $scope.listCanSwipe = true;
        $scope.shouldShowDelete = false;
        $scope.data = {};
        
        
        $scope.clearSearch = function() {
            $scope.data = {};
            console.log('Clear...');
        };
        
        var query = product.get(function() {
            $scope.products = query.product;
        });
    
        $ionicModal.fromTemplateUrl('templates/product_search.html', {
            scope: $scope,
            animation: 'slide-in-up',
            focusFirstInput: true
        }).then(function(modal) {
            $scope.modal = modal
        })

        $scope.openModal = function() {
            $scope.modal.show()
        }

        $scope.closeModal = function() {
            $scope.data = {};
            $scope.modal.hide();
        }

        $scope.$on('$destroy', function() {
            $scope.modal.remove();
        })
        
        // Perform the update action when the user submits the form
        $scope.doAdd = function(product_id) {
            var item = product.get({ id: product_id }, function() {
                var row = {};
                    row.product_id = item.product[0].product_id;
                    row.product_name = item.product[0].product_name;
                    row.product_price = item.product[0].product_price_1;
                    row.unit_name = item.product[0].unit_name;
                    row.product_qty = '1';
                $scope.items.push(row);
                updateTotals();
                console.log('add; ' + JSON.stringify($scope.items));
            });
 
            $scope.closeModal();
        }
        
        $scope.openQty = function(index) {
            var qty = Number($scope.items[index].product_qty);
            
            $scope.quantity = { value: qty }
            var promptPopup = $ionicPopup.prompt({
                title: 'Modificar cantidad',
                templateUrl : 'popup-template.html',
                scope: $scope,
                inputPlaceholder: 'Cantidad numerica'
            });
            
            promptPopup.then(function(res) {
                $scope.items[index].product_qty = $scope.quantity.value;
                updateTotals();
            });   
        }
        
        $scope.deleteItem = function(item) {
            $scope.items.splice(item,1);
            updateTotals();
        };
        
        function updateTotals() {
            $scope.subtotal = total($scope.items);
        }
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
})

.controller('ProductsCtrl', function($scope, product) {
//    get all products
    var query = product.get(function() {
        $scope.products = query.product;
    });
})

.controller('CustomersCtrl', function($scope, product) {
//    get all customers
    var query = product.get(function() {
        $scope.products = query.product;
    });
});
