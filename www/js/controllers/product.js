angular.module('product.controllers', [])

.controller('ProductsCtrl', function($scope, $location, product, $stateParams) {
    $scope.listCanSwipe = true;
    
    $scope.go = function (path) {
        $location.path( path );
    };
    
    $scope.doRefresh = function() {
        var query = product.get({ categoryId: $stateParams.categoryId },function() {
            $scope.products = query.product;
        });
        $scope.$broadcast('scroll.refreshComplete');
    };
    //  get all products
    var query = product.get({ categoryId: $stateParams.categoryId },function() {
        $scope.products = query.product;
    });
    
    $scope.deleteItem = function(item) {
        alert(item);
    }
})

.controller('AddProductCtrl', function($scope, $location, product, category, unit) {
    $scope.product = {};
    $scope.title = "Agregar producto";
    
    var query2 = category.get(function() {
        $scope.categories = query2.category;
    });
    
    var query3 = unit.get(function() {
        $scope.units = query3.unit;
    });
    //  save customer
    $scope.doSubmit = function() {
        console.log('try save...');
        $scope.product.type_id = 1;
        product.save($scope.product, function() {
            $location.path('/app/categories');
        });
    }
})

.controller('EditProductCtrl', function($scope, $location, product, category, unit, $stateParams) {
    $scope.product = {};
    $scope.title = "Editar producto";
    //  get product
    var query1 = product.get({ categoryId: $stateParams.categoryId, productId: $stateParams.productId }, function() {
        $scope.product = query1.product[0];
        if (query1.product[0].product_tare_id == 1) $scope.product.product_tare_id = true;
    })
    
    var query2 = category.get(function() {
        $scope.categories = query2.category;
    });
    
    var query3 = unit.get(function() {
        $scope.units = query3.unit;
    });
    
    //  update product
    $scope.doSubmit = function() {
        console.log('try update...');
        product.update($scope.product, function() {
            $location.path('/app/products/' + $stateParams.categoryId);
        });
    };
})

.controller('CategoriesCtrl', function($scope, $location, category) {
    $scope.listCanSwipe = true;
    
    $scope.go = function ( path ) {
        $location.path( path );
    };
    
    $scope.doRefresh = function() {
        var query = category.get(function() {
        $scope.categories = query.category;
        });
        $scope.$broadcast('scroll.refreshComplete');
    };
    //  get all products
    var query = category.get(function() {
        $scope.categories = query.category;
    });
})

.controller('CategoryCtrl', function($scope, $location, product) {
    $scope.go = function ( path ) {
        $location.path( path );
    };
    //  get all products
    var query = product.get(function() {
        $scope.products = query.product;
    });
})

.controller('AddCategoryCtrl', function($scope, $location, category) {
    $scope.category = {};
    //  save customer
    $scope.doSubmit = function() {
        $scope.category.account_id = 1;
        category.save($scope.category, function() {
            $location.path('/app/categories');
        });
    }
});