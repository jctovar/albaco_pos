angular.module('customer.controllers', [])

.controller('CustomerCtrl', function($scope, $location, customer, $stateParams) {
    $scope.go = function ( path ) {
        $location.path( path );
    };
    //  get customer
    var query = customer.get({ id: $stateParams.customerId }, function() {
        //console.log(JSON.stringify(query.customer[0]));
        $scope.customer = query.customer[0];
    })
})

.controller('AddCustomerCtrl', function($scope, $location, customer) {
    $scope.customer = {};
    //  save customer
    $scope.doSubmit = function() {
        $scope.customer.account_id = 1;
        customer.save($scope.customer, function() {
            $location.path('/app/customers');
        });
    }
})

.controller('EditCustomerCtrl', function($scope, $location, customer, $stateParams) {
    $scope.customer = {};
    //  get customer
    var query = customer.get({ id: $stateParams.customerId }, function() {
        //console.log(JSON.stringify(query.customer[0]));
        $scope.customer = query.customer[0];
        $scope.customer.customer_postalcode = Number(query.customer[0].customer_postalcode);
    })
    //  save customer
    $scope.doSubmit = function() {
        customer.update($scope.customer, function() {
            $location.path('/app/customers');
        });
    };
})

.controller('CustomersCtrl', function($scope, $location, customer) {
    $scope.go = function ( path ) {
        $location.path( path );
    };
    //  get all customers
    var query = customer.get(function() {
        $scope.customers = query.customer;
    });
});