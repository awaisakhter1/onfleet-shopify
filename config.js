/*var config = {
    database: {
        host:      'localhost',     // database host
        user:       'root',         // your database username
        password: 'root',         // your database password
        port:       3306,         // default MySQL port
        db:       'test'         // your database name
    },
    server: {
        host: '127.0.0.1',
        port: '3000'
    }
}
 
module.exports = config*/

//----------------Local database Connection------------------//
var config = {
    database: {
        host:      'localhost',           // database host
        user:      'root',                // your database username
        password:  '',         			  // your database password
        db:        'db_test_shopify_app', // your database name
        Timeout :  60000
	}
}

//----------------Live database Connection------------------// 
/*var config = {
    database: {
        host:      'shopify.crsj1hbpcprn.us-east-1.rds.amazonaws.com',          // database host
        user:      'onfleet',                									// your database username
        password:  '0%5K6$%!2je904I1#G61',         			 				    // your database password
        db:        'shopify',   												// your database name
		Timeout :  60000
    }
}*/
 
module.exports = config