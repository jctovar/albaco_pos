angular.module('customer.controllers', [])

.controller('CustomersCtrl', function($scope, $location, customer) {
    $scope.listCanSwipe = true;
    
    $scope.go = function ( path ) {
        $location.path( path );
    };
    
    $scope.doRefresh = function() {
        var query = customer.get(function() {
            $scope.customers = query.customer;
        });
        $scope.$broadcast('scroll.refreshComplete');
    };
    //  get all customers
    var query = customer.get(function() {
        $scope.customers = query.customer;
    });
    
    $scope.deleteItem = function(id) {
        alert('Se eliminara al cliente');
        customer.delete({ id: id }, function() {
            $location.path('/app/');
        });
    }
})

.controller('AddCustomerCtrl', function($scope, $location, customer, discount) {
    $scope.customer = {};
    $scope.title = "Nuevo cliente";
    
    var query1 = discount.get(function() {
        $scope.discounts = query1.discount;
    });
    //  save customer
    $scope.doSubmit = function() {
        $scope.customer.account_id = 1;
        customer.save($scope.customer, function() {
            $location.path('/app/customers');
        });
    }
})

.controller('EditCustomerCtrl', function($scope, $location, customer, discount, $stateParams) {
    $scope.customer = {};
    $scope.title = "Editar cliente";
    
    var query1 = discount.get(function() {
        $scope.discounts = query1.discount;
    });
    //  get customer
    var query2 = customer.get({ id: $stateParams.customerId }, function() {
        //console.log(JSON.stringify(query.customer[0]));
        $scope.customer = query2.customer[0];
        $scope.customer.customer_postalcode = Number(query2.customer[0].customer_postalcode);
    })
    //  save customer
    $scope.doSubmit = function() {
        customer.update($scope.customer, function() {
            $location.path('/app/customers');
        });
    };
});