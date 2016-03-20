angular.module('totals', [])

.filter('total', function() {
    return function (items) {
            var total =  0;
            for(var i=0;i<items.length;i++)  
            {                    
                  console.log('item; ' + items[i].product_price);
                  total += Number(items[i].product_price * items[i].product_qty);  
            }  
            return total;
        };
});