// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'ngCordova', 'starter.controllers'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      //StatusBar.styleDefault();
      StatusBar.backgroundColorByHexString('#0099CC');
    }
    if(window.Connection) {
        if(navigator.connection.type == Connection.NONE) {
            $ionicPopup.confirm({
                title: "Internet Disconnected",
                content: "The internet is disconnected on your device."
            })
            .then(function(result) {
                if(!result) {
                    ionic.Platform.exitApp();
                }
            });
        }
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.categories', {
    url: '/categories',
    views: {
      'menuContent': {
        templateUrl: 'templates/categories.html',
        controller: 'CategoriesCtrl'
      }
    }
  })
  
  .state('app.category', {
        url: '/categories/:categoryId',
        views: {
        'menuContent': {
            templateUrl: 'templates/category.html',
            controller: 'CategoryCtrl'
        }
        }
    })

  .state('app.add_category', {
      url: '/add_category',
      views: {
        'menuContent': {
          templateUrl: 'templates/category_add.html',
          controller: 'AddCategoryCtrl'
        }
      }
    })

  .state('app.products', {
    url: '/products/:categoryId',
    views: {
      'menuContent': {
        templateUrl: 'templates/products.html',
        controller: 'ProductsCtrl'
      }
    }
  })

  .state('app.product', {
        url: '/product/:categoryId/:productId',
        views: {
        'menuContent': {
            templateUrl: 'templates/product.html',
            controller: 'ProductCtrl'
        }
        }
    })

  .state('app.customers', {
      url: '/customers',
      views: {
        'menuContent': {
          templateUrl: 'templates/customers.html',
          controller: 'CustomersCtrl'
        }
      }
    })
    
    .state('app.add_customer', {
      url: '/add_customer',
      views: {
        'menuContent': {
          templateUrl: 'templates/customer_add.html',
          controller: 'AddCustomerCtrl'
        }
      }
    })
    
    .state('app.edit_customer', {
      cache: false,
      url: '/edit_customer/:customerId',
      views: {
        'menuContent': {
          templateUrl: 'templates/customer_edit.html',
          controller: 'EditCustomerCtrl'
        }
      }
    })
    
    .state('app.customer', {
        cache: false,
        url: '/customers/:customerId',
        views: {
        'menuContent': {
            templateUrl: 'templates/customer_view.html',
            controller: 'CustomerCtrl'
        }
        }
    })
    
    .state('app.invoices', {
      url: '/invoices',
      views: {
        'menuContent': {
          templateUrl: 'templates/invoices.html',
          controller: 'InvoicesCtrl'
        }
      }
    })
    
    .state('app.invoice', {
        url: '/invoices/:invoiceId',
        views: {
        'menuContent': {
            templateUrl: 'templates/invoice_view.html',
            controller: 'InvoiceCtrl'
        }
        }
    })
    
    .state('app.note', {
      url: '/note',
      views: {
        'menuContent': {
          templateUrl: 'templates/note.html',
          controller: 'NoteCtrl'
        }
      }
    })

  .state('app.settings', {
    url: '/settings',
    views: {
      'menuContent': {
        templateUrl: 'templates/settings.html',
        controller: 'SettingsCtrl'
      }
    }
  })
  
  .state('app.about', {
    url: '/about',
    views: {
      'menuContent': {
        templateUrl: 'templates/about.html',
        controller: 'AboutCtrl'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/note');
});
