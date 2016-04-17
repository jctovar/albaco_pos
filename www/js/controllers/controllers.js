angular.module('starter.controllers', ['main.models', 'main.directives', 'main.factory', 'totals'])

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

.controller('NoteCtrl', function($scope, $ionicModal, $ionicPopup, catalog, $ionicActionSheet, $cordovaBarcodeScanner, $timeout, product, invoice, detail, save_items) {
        $scope.items = []; // for shop car
        $scope.listCanSwipe = true;
        $scope.shouldShowDelete = false;
        $scope.data = {}; // for clear search
        
        $scope.clearSearch = function () {
            $scope.data = {};
            console.log('Clear...');
        };
        
        var query = catalog.get(function () {
            $scope.products = query.product;
        });
        // ver como mandar a una factory o service
        $scope.printItems = function () {
            var invoice_id;
            var invoice_data = {};
            var invoice_items = $scope.items;
            
            if ($scope.items.length != 0) {
                invoice_data.account_id = '1';
                invoice_data.customer_id = '1';
                invoice_data.status_id = '1';
                var result1 = invoice.save(invoice_data, function() {
                    invoice_id = result1.invoice.insertId;
                    // loop for items
                    for (i = 0; i < invoice_items.length; i++) {
                        var invoice_product = {};
                        invoice_product.invoice_id = invoice_id;
                        invoice_product.product_id = invoice_items[i].product_id;;
                        invoice_product.invoice_product_quantity = invoice_items[i].product_qty;
                        invoice_product.invoice_product_price = invoice_items[i].product_price;
                        var result2 = detail.save(invoice_product, function() {
                            console.log(JSON.stringify(result2));
                            if (result2.detail.affectedRows == 1) {
                                console.log('god...');
                            }
                        });
                    }
                });
            }
            $scope.items = [];
        }
    
        $ionicModal.fromTemplateUrl('templates/search.html', {
            scope: $scope,
            animation: 'slide-in-up',
            focusFirstInput: true
        }).then(function (modal) {
            $scope.modal = modal
        })

        $scope.openSearch = function () {
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
            //var data = theScanner();
            $cordovaBarcodeScanner
                .scan()
                .then(function(barcodeData) {
                    // Success! Barcode data is here
                    return barcodeData;
                }, function(error) {
                    // An error occurred
                    return error;
            });
        }
        
        // Perform the update action when the user submits the form
        $scope.doAdd = function(category_id, product_id) {
            var item = product.get({ categoryId: category_id, productId: product_id }, function() {
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
        }
        
        $scope.deleteItem = function(item) {
            $scope.items.splice(item,1);  
        }
        
        $scope.openMenu = function() {
            $ionicActionSheet.show({
                buttons: [
                    { text: '<b>Imprimir</b>' },
                    { text: 'Guardar' }
                ],
                destructiveText: 'Eliminar',
                destructiveButtonClicked: function() {
                    $scope.items = [];
                    return true;
                },
                titleText: 'Acciones de venta',
                cancelText: 'Cancel',
                buttonClicked: function(index) {
                    console.log(index);
                    switch (index){
                        case 0 :
                            //save & print recipe
                            //console.log(JSON.stringify($scope.items));
                            $scope.printItems();
                            return true;
                        case 1 :
                            //save shop car
                            $scope.printItems();
                            console.log(JSON.stringify($scope.items));
                            return true;
                    }
                }
            });
        }
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
    $scope.listCanSwipe = true;
    
    $scope.doRefresh = function() {
        var query = invoice.get(function() {
            $scope.invoices = query.invoice;
        });
        $scope.$broadcast('scroll.refreshComplete');
    };
    // get all invoices
    var query = invoice.get(function() {
        $scope.invoices = query.invoice;
    });
});