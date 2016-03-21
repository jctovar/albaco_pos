angular.module('main.models', ['ngResource'])
.constant("server_config",{url : "https://goritec.com:3000", key : "84656ca7c7ccc6b44523a18b6bdf94140220bfc8"})

.factory('account', function($resource, server_config) {
	return $resource(server_config.url + '/account/:id', { account_key : server_config.key, id : '@_id' },
    {
        'update': { method:'PUT' }
    });
})

.factory('customer', function($resource, server_config) {
	return $resource(server_config.url + '/customer/:id', { account_key : server_config.key, id : '@_id' },
    {
        'update': { method:'PUT' }
    });
})

.factory('invoice', function($resource, server_config) {
	return $resource(server_config.url + '/invoice/:id', { account_key : server_config.key, id : '@_id' },
    {
        'update': { method:'PUT' }
    });
})

.factory('product', function($resource, server_config) {
	return $resource(server_config.url + '/product/:id', { account_key : server_config.key, id : '@_id' },
    {
        'update': { method:'PUT' }
    });
})

.factory('category', function($resource, server_config) {
	return $resource(server_config.url + '/category/:id', { account_key : server_config.key, id : '@_id' },
    {
        'update': { method:'PUT' }
    });
})

.factory('detail', function($resource, server_config) {
	return $resource(server_config.url + '/detail/:id', { account_key : server_config.key, id : '@_id' },
    {
        'update': { method:'PUT' }
    });
});

