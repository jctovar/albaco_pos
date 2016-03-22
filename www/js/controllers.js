angular.module('starter.controllers', ['main.models', 'main.directives', 'totals'])

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

.controller('NoteCtrl', function($scope, $ionicModal, $ionicPopup, catalog, $ionicActionSheet, $cordovaBarcodeScanner, $timeout, product) {
        $scope.items = [];
        $scope.listCanSwipe = true;
        $scope.shouldShowDelete = false;
        $scope.data = {};
        
        $scope.clearSearch = function() {
            $scope.data = {};
            console.log('Clear...');
        };
        
        var query = catalog.get(function() {
            $scope.products = query.product;
        });
    
        $ionicModal.fromTemplateUrl('templates/search.html', {
            scope: $scope,
            animation: 'slide-in-up',
            focusFirstInput: true
        }).then(function(modal) {
            $scope.modal = modal
        })

        $scope.openSearch = function() {
            $scope.modal.show()
        }

        $scope.closeModal = function() {
            $scope.data = {};
            $scope.modal.hide();
        }

        $scope.$on('$destroy', function() {
            $scope.modal.remove();
        })
        
        $scope.openScanner = function() {
            console.log('open scanner...');
            $cordovaBarcodeScanner
                .scan()
                .then(function(barcodeData) {
                    console.log(JSON.stringify(barcodeData));
                    alert(barcodeData.text);
                    // Success! Barcode data is here
                }, function(error) {
                    // An error occurred
            });
        }
        
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
            });   
        }
        
        $scope.onDoubleTap = function(item) {
            alert(item);  
        };
        
        $scope.deleteItem = function(item) {
            $scope.items.splice(item,1);  
        };
        
        
        
        $scope.openMenu = function() {
            
            // Show the action sheet
            var hideSheet = $ionicActionSheet.show({
                buttons: [
                { text: '<b>Imprimir</b>' },
                { text: 'Guardar' }
                ],
                destructiveText: 'Eliminar',
                titleText: 'Acciones de venta',
                cancelText: 'Cerrar',
                cancel: function() {
                    // add cancel code..
                    },
                buttonClicked: function(index) {
                return true;
                }
            });

            // For example's sake, hide the sheet after two seconds
            $timeout(function() {
                hideSheet();
            }, 2000);

        };
})

.controller('InvoiceCtrl', function($scope, invoice, detail, $stateParams) {
    //  get invoice
    var query1 = invoice.get({ id: $stateParams.invoiceId }, function() {
        //console.log(JSON.stringify(query.customer[0]));
        $scope.invoice = query1.invoice[0];
    })
    
    var query2 = detail.get({ id: $stateParams.invoiceId }, function() {
        //console.log(JSON.stringify(query.customer[0]));
        $scope.details = query2.detail;
    })
})

.controller('InvoicesCtrl', function($scope, invoice) {
//    get all products
    var query = invoice.get(function() {
        $scope.invoices = query.invoice;
    });
})

.controller('ProductCtrl', function($scope, product, $stateParams) {
    //  get product
    var query = product.get({ categoryId: $stateParams.categoryId, productId: $stateParams.productId }, function() {
        console.log(JSON.stringify(query.product[0]));
        $scope.product = query.product[0];
    })
})

.controller('ProductsCtrl', function($scope, product, $stateParams) {
    //  get all products
    var query = product.get({ categoryId: $stateParams.categoryId },function() {
        $scope.products = query.product;
    });
})

.controller('CategoriesCtrl', function($scope, $location, category) {
    $scope.go = function ( path ) {
        $location.path( path );
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
})

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
})

.controller('SettingsCtrl', function($scope, $location, account) {
    $scope.account = {};
    //  get account data
    var query = account.get({ id: '1' }, function() {
        $scope.account = query.account[0];
    });
    
    //  save customer
    $scope.doSubmit = function() {
        account.update($scope.account, function() {
            $location.path('/app/customers');
        });
    };
})

.controller('AboutCtrl', function($scope, $cordovaAppVersion, $cordovaDevice) {
    //  get info device
    document.addEventListener("deviceready", function () {
        $cordovaAppVersion.getVersionNumber().then(function (version) {
            $scope.appVersion = version;
        });
        $cordovaAppVersion.getVersionCode().then(function (build) {
            $scope.appBuild = build;
        });
        $cordovaAppVersion.getAppName().then(function (name) {
            $scope.appName = name;
        });
        $scope.device = $cordovaDevice.getDevice();
        $scope.cordova = $cordovaDevice.getCordova();
        $scope.model = $cordovaDevice.getModel();
        $scope.platform = $cordovaDevice.getPlatform();
        $scope.uuid = $cordovaDevice.getUUID();
        $scope.version = $cordovaDevice.getVersion();
    });
});
