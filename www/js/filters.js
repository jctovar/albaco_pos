angular.module('totals', [])

.filter('total', function() {
    return function (items) {
            var total =  0;
            for (var i in items) {                    
                  total += Number(items[i].product_price * items[i].product_qty);  
            }  
            return total;
        };
});