//rest api to get all results
//app.get('/employees', function (req, res) {
//   connection.query('select * from employee', function (error, results, fields) {
//   if (error) throw error;
//   res.end(JSON.stringify(results));
// });
//});
 
//rest api to get a single employee data
//app.get('/employees/:id', function (req, res) {
//   console.log(req);
//   connection.query('select * from employee where id=?', [req.params.id], function (error, results, fields) {
//   if (error) throw error;
//   res.end(JSON.stringify(results));
// });
//});
 
//rest api to update record into mysql database
//app.put('/employees', function (req, res) {
//   connection.query('UPDATE `employee` SET `employee_name`=?,`employee_salary`=?,`employee_age`=? where `id`=?', [req.body.employee_name,req.body.employee_salary, req.body.employee_age, req.body.id], function (error, results, fields) {
//   if (error) throw error;
//   res.end(JSON.stringify(results));
// });
//});
 
//rest api to delete record from mysql database
//app.delete('/employees', function (req, res) {
//   console.log(req.body);
//   connection.query('DELETE FROM `employee` WHERE `id`=?', [req.body.id], function (error, results, fields) {
//   if (error) throw error;
//   res.end('Record has been deleted!');
// });
//});*/


/*//rest api to create a new record into mysql database
app.post('/faq', function (req, res) {
  var query = "insert into tbl_faq(pid,lid,question,answer,cdate) values (1,2,'test question','test answer','2015-11-14')";
   connection.query(query, function (error, results) {
   if (error) throw error;
   res.end(JSON.stringify(results));
 });
});*/


const dotenv = require('dotenv').config();
const express = require('express');
const app = express();
var http = require('http').Server(app);
const crypto = require('crypto');

const nonce = require('nonce')();
const querystring = require('querystring');
const request = require('request-promise');

const apiKey = process.env.SHOPIFY_API_KEY;
const apiSecret = process.env.SHOPIFY_API_SECRET;
const scopes = 'read_products,read_orders,write_orders';
const forwardingAddress = "https://c681eefa.ngrok.io/"; // Replace this with your HTTPS Forwarding address

var onfleet = require('onfleet')('33e1d0ed7307639a67c1a22db0ee4eed');

/*require('getmac').getMac(function(err, macAddress){
 if (err)  throw err
 console.log(macAddress)
})*/

/*require('getmac').getMac(function(err, macAddress){
  if (err)  throw err
  console.log(macAddress);
 });*/
/*var macaddress = require('macaddress');
console.log(JSON.stringify(macaddress.networkInterfaces(), null, 2));*/
 
 
/*const internalIp = require('internal-ip');

internalIp.v6().then(ip => {
	console.log(ip);
	//=> 'fe80::1'
});

internalIp.v4().then(ip => {
	console.log(ip);
	//=> '10.0.0.79'
});*/

/**
 * This module shows flash messages
 * generally used to show success or error messages
 * 
 * Flash messages are stored in session
 * So, we also have to install and use 
 * cookie-parser & session modules
 */ 
var flash = require('express-flash')
var cookieParser = require('cookie-parser');
var session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);
var options = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'db_test_shopify_app'
};
 
var sessionStore = new MySQLStore(options);
 
app.use(session({
    key: 'session_cookie_name',
    secret: 'session_cookie_secret',
    store: sessionStore,
    resave: false,
    saveUninitialized: false
}));

//var sessionStore  = new session.MemoryStore;

//console.log(sessionStore);

app.use(cookieParser('keyboard cat'));

//app.set('trust proxy', 1); // trust first proxy
/*app.use(session({ 
    secret: 'whatever',
    resave: false,
    saveUninitialized: true,
	//store: sessionStore,
    cookie: { httpOnly: false,secure: false,maxAge: 60000 }
}));*/
app.use(flash());

var path       = require('path');
var bodyParser = require('body-parser');

var mysql      = require('mysql');
/**
 * This middleware provides a consistent API 
 * for MySQL connections during request/response life cycle
 */ 
var myConnection  = require('express-myconnection')

/*var jsdom = require('jsdom');
const { JSDOM } = jsdom;

const { document } = (new JSDOM('')).window;
global.document = document;*/

//app.use('/node_modules', express.static(__dirname + '/node_modules/jquery'));
//app.use(express.static(path.join(__dirname, 'node_modules/jquery')));

var jsdom = require('jsdom');
var $ = require('jquery')(new jsdom.JSDOM().window);

//var $ = require('jquery');
/*require("jsdom").env("", function(err, window) {
    if (err) {
        console.error(err);
        return;
    }
 
    var $ = require("jquery")(window);
});*/


//start mysql connection

/**
 * Store database credentials in a separate config.js file
 * Load the file/module and its values
 */ 
var config = require('./config')
var dbOptions = {
    host:      config.database.host,
    user:       config.database.user,
    password: config.database.password,
    database: config.database.db,
	connectTimeout: config.database.Timeout, 
};
/**
 * 3 strategies can be used
 * single: Creates single database connection which is never closed.
 * pool: Creates pool of connections. Connection is auto release when response ends.
 * request: Creates new connection per new request. Connection is auto close when response ends.
 */
app.use(myConnection(mysql, dbOptions, 'pool'));

  
	/* myConnection.query('CREATE TABLE tbl_valid_days (id INT(11) AUTO_INCREMENT PRIMARY KEY, days VARCHAR(255), short_days_name VARCHAR(255))',     function (error, results) {
	 if (error) throw error;
	 console.log("Table created");
	 });*/

//end mysql connection

//console.log(path);

//Path use to Access different directories
app.use(express.static(path.join(__dirname, 'views/img')));
app.use(express.static(path.join(__dirname, 'views/images')));
app.use(express.static(path.join(__dirname, 'views/include/css')));
app.use(express.static(path.join(__dirname, 'views/include/js')));

var html = require("html");

// bodyParser Read the form Post data
var bodyParser = require('body-parser');

// set the view engine to ejs
app.set('view engine', 'ejs');


//start body-parser configuration
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));
//end body-parser configuration

app.get('/del_date_sess/:id', function(req, res) {
//app.get('/ddd', function(req, res) { 
  var id = req.params.id;
  //var id = req.query.id;
  req.session.deldate = id;
  res.locals.deldate = req.session.deldate;
  
 // res.header('Content-Type', 'text/plain');
  console.log("delivery date is now '" + req.session.deldate + "'.");
  //res.end();
});

/**
 * import routes/index.js
 * import routes/notice_time_setting.js
 * import routes/view_del_days.js
 */ 
var table            = require('./routes/tables'); 
var index            = require('./routes/index');
var nt_setting       = require('./routes/notice_time_setting');
var ddays_setting    = require('./routes/del_days_setting');
var boutdays_setting = require('./routes/blackout_days_setting');
var livedel_datetime = require('./routes/live_del_datetime');
var livedel_datetime_cart = require('./routes/live_del_datetime_cart');
var shopify_order_create = require('./routes/shopify_webhook_response_order');
var onfleet_webhook_respose = require('./routes/onfleet_webhook_response');

app.use('/create_tables', table);
app.use('/', index);
app.use('/index', index);
app.use('/pages/nt_setting', nt_setting);
app.use('/pages/del_days_setting', ddays_setting);
app.use('/pages/blackout_days_setting', boutdays_setting);
app.use('/pages/live_del_datetime', livedel_datetime);
app.use('/pages/live_del_datetime_cart', livedel_datetime_cart);

//app.use('/pages/shopify_webook_response', shopify_order_create);
app.use('/shopify_response', shopify_order_create);
app.use('/onfleet_response', onfleet_webhook_respose);


 
app.get('/install', function(req, res) {
	res.render('pages/install');
});

// Display delivery date and time page 
//var html = '';
app.get('/add-del-datetime', function(req, res) {
	/*var title = $(html).find('h1').text();
console.log(title);
res.send(title);*/
	res.render('pages/add-del-datetime');
});


// Display delivery note page 
app.get('/add-deliver-note', function(req, res) {
	res.render('pages/add-deliver-note');
});


//rest api to create delivery datetime a new record into mysql database
app.post('/add-del-datetime', function (req, res) {
   var postData  = req.body;
   connection.query('INSERT INTO tbl_delivery_datetime SET ?', postData, function (error, results, fields) {
   if (error) throw error;
   res.end(JSON.stringify(results));
 });
});

//rest api to create a new delivery note record into mysql database
app.post('/add-deliver-note', function (req, res) {
   var postData  = req.body;
   connection.query('INSERT INTO tbl_delivery_note SET ?', postData, function (error, results, fields) {
   if (error) throw error;
   res.end(JSON.stringify(results));
 });
});

//rest api to get a single shops data
app.get('/shops_result', function (req, res) {
   console.log(req);
   connection.query("select * from tbl_stores where store_url='tims-app-testing-store.myshopify.com'", function (error, results, fields) {
   if (error) throw error;
  // console.log(results);
   res.end(results[0].store_url);
   console.log(results[0].store_url);
   
 });
});

app.get('/time_windows_ajax', function(req, res){
	
	var query = require('url').parse(req.url,true).query;
	var daynum = query.dayNumber;
	var full_date = query.full_date;
	if(daynum==0){var daynum = 7;}
	
	var day_check = ''; 
	
	var data_sendback = {};
	req.getConnection(function(error, conn) {
	   
	  conn.query('select * from tbl_blackout_days where date="'+full_date+'" and store_id=26407184', function (error, results) {
	     // Check Blackout day
		 if (results.length==0) { 
		    
			req.getConnection(function(error, conn) {
				conn.query('select * from tbl_valid_times where day_id="'+daynum+'" and store_id=26407184', function (error, tw_results) {
				
				// Check No delivery day
				if(tw_results[0].delivery_day==0){
				day_check = 'No Delivery day'; 
				
				data_sendback.day_check_type=day_check;
		        
		        res.send(JSON.stringify(data_sendback));
				}
				else{
				day_check = 'Yes Delivery day';
				data_sendback.day_check_type=day_check;
			    data_sendback.time_windows=tw_results[0].times_windows;
		        res.send(JSON.stringify(data_sendback));
				}
				
			   });
	   
	       });
			
		 }
		 else {
		 day_check = 'Blackout day';  
		 data_sendback.day_check_type=day_check;
		 data_sendback.description=results[0].description;
		 res.send(JSON.stringify(data_sendback));
		 }
	  });
	});
});

app.get('/check_timewindow_orders', function(req, res, next){
	
	var query = require('url').parse(req.url,true).query;
	var date_select       = query.date_select;
	var time_window       = query.time_window.split('-');
	var time_window_start = time_window[0].replace(/\s/g, "");
	var time_window_end   = time_window[1].replace(/\s/g, "");
	
	var data_sendback = {};
	req.getConnection(function(error, conn) {
	   
      var num_order_timwindow = ''; 
	  conn.query('select * from tbl_order_booked where date="'+date_select+'" and time_window_start="'+time_window_start+'" and time_window_end="'+time_window_end+'" and store_id=26407184', 
	 
	  function (error, results) {
		if (results.length>0) {   
		 if(results[0].num_of_order<=5){
		 num_order_timwindow = 'order less than 5';
		 data_sendback.check_num_order=num_order_timwindow;
		 res.send(JSON.stringify(data_sendback));
		 }
		 else{
			 var ip = req.connection.remoteAddress;
 console.log(ip);
 var ip = req.header('x-forwarded-for') || req.connection.remoteAddress;
 console.log(ip);
			 /*// check if client sent cookie
			  var cookie = req.cookies.delDate;
			  if (cookie === undefined)
			  {
				// no: set a new cookie
			   // var randomNumber=Math.random().toString();
			   // randomNumber=randomNumber.substring(2,randomNumber.length);
				res.cookie('delDate',query.date_select, { maxAge: 900000, httpOnly: true });
				console.log('cookie created successfully');
			  } 
			  else
			  {
				// yes, cookie was already present 
				console.log('cookie exists', cookie);
			  } */
			 
			 
		 req.session.delvy_date = req.query.date_select;	 
		 req.session.delvy_time_window = req.query.time_window;
		 req.session.sessId = req.sessionID;
		 //req.session.save();
		 console.log(req.sessionID);
		 
		 console.log("delivery date is now '" + req.session.delvy_time_window + "+ +" + req.session.delvy_date + "'.");
	     num_order_timwindow = 'order greater than 5';
		 data_sendback.check_num_order=num_order_timwindow;
		 res.send(JSON.stringify(data_sendback));+
		 next(); // <-- important!
		 }
		}
		else{
			var ip = req.connection.remoteAddress;
 console.log(ip);
 var ip = req.header('x-forwarded-for') || req.connection.remoteAddress;
 console.log(ip);
			/*// check if client sent cookie
			  var cookie = req.cookies.delDate;
			  if (cookie === undefined)
			  {
				// no: set a new cookie
			   // var randomNumber=Math.random().toString();
			   // randomNumber=randomNumber.substring(2,randomNumber.length);
				res.cookie('delDate',query.date_select, { maxAge: 900000, httpOnly: true });
				console.log('cookie created successfully');
			  } 
			  else
			  {
				// yes, cookie was already present 
				console.log('cookie exists', cookie);
			  } */
			
		req.session.delvy_date = req.query.date_select;	
		req.session.delvy_time_window = req.query.time_window;
		//req.session.save();
		console.log(req.sessionID);
		console.log("delivery date is now '" + req.session.delvy_time_window + "+ +" + req.session.delvy_date + "'.");
			
		num_order_timwindow = 'No order found';	
		data_sendback.check_num_order=num_order_timwindow;
		res.send(JSON.stringify(data_sendback));
		next(); // <-- important!
	    }
	  });
	});
	//req.sessID = req.sessionID;
	//return next();
});


//---The install route expects a shop URL parameter, which it uses to redirect the merchant to the Shopify app authorization prompt where they can choose to accept or reject the installation request.---//

//app.get('/install/auth', (req, res) => {
app.get('/authorize', (req, res) => {
  const shop = req.query.shop;
  if (shop) {
    const state = nonce();
    //const redirectUri = forwardingAddress + 'install/auth';
	const redirectUri = forwardingAddress + 'authorize/callback';
    const installUrl = 'https://' + shop +
      '/admin/oauth/authorize?client_id=' + apiKey +
      '&scope=' + scopes +
      '&state=' + state +
      '&redirect_uri=' + redirectUri;

    res.cookie('state', state);
    res.redirect(installUrl);
  } else {
    return res.status(400).send('Missing shop parameter. Please add ?shop=your-development-shop.myshopify.com to your request');
  }
});


app.get('/authorize/callback', (req, res) => {
  const { shop, hmac, code, state } = req.query;
  //const stateCookie = cookie.parse(req.headers.cookie).state;

  /*if (state !== stateCookie) {
	 // return res.status(403).send('state', state);
    return res.status(403).send('Request origin cannot be verified');
  }*/

  if (shop && hmac && code) {
   //res.status(200).send('Callback route');
   
   // DONE: Validate request is from Shopify
    const map = Object.assign({}, req.query);
    delete map['signature'];
    delete map['hmac'];
    const message = querystring.stringify(map);
    const generatedHash = crypto
      .createHmac('sha256', apiSecret)
      .update(message)
      .digest('hex');

    if (generatedHash !== hmac) {
      return res.status(400).send('HMAC validation failed');
    }
	
    //res.status(200).send('HMAC validated');
	
	
    // TODO
    // Exchange temporary code for a permanent access token
    // Use access token to make API call to 'shop' endpoint
	
	//connection.query("select * from tbl_stores where store_url='tims-app-testing-store.myshopify.com'", function (error, results) {
	req.getConnection(function(error, conn) {
	conn.query('select * from tbl_stores where store_url="'+shop+'" and status=1', function (error, results) {	 
	if (error) throw error;
	//if((results[0].store_url)==''){
		if (results.length == 0) {     
		
		const accessTokenRequestUrl = 'https://' + shop + '/admin/oauth/access_token';
		const accessTokenPayload = {
		  client_id: apiKey,
		  client_secret: apiSecret,
		  code,
		};
	
		request.post(accessTokenRequestUrl, { json: accessTokenPayload })
		.then((accessTokenResponse) => {
		  const accessToken = accessTokenResponse.access_token;
	      
		  const store_url = shop; 
		  req.session.ShopifyAccessToken = accessToken;
		  req.session.save();
		  
		  //res.status(200).send("Got an access token, let's do something with it");
		  // TODO
		  // Use access token to make API call to 'shop' endpoint
		  
		  //To use the access token to make an API call to the shop endpoint
			 
				  const shopRequestUrl = 'https://' + shop + '/admin/shop.json';
				  const shopRequestHeaders = {
					'X-Shopify-Access-Token': accessToken,
				  };
				
				  request.get(shopRequestUrl, { headers: shopRequestHeaders })
				  .then((shopResponse) => {
				   //res.redirect('pages/index');
				  //res.end(shopResponse);
				 //var shopResponse = shopResponse;
				      var obj = JSON.parse(shopResponse);
					  const shop_id   = obj.shop.id;
			          const shop_name = obj.shop.name;
					  
					  req.getConnection(function(error, conn) {
					  conn.query('select * from tbl_stores where store_url="'+shop+'" and status=0', function (error, results) {	 
						  if (error) throw error;
						  if (results.length == 0) { 
						   
						   
						   req.getConnection(function(error, conn) {	
						   var qry_insert_store = 'INSERT into tbl_stores(store_name,store_url,store_front_url,store_id,store_email,status) values ("'+obj.shop.name+'","'+shop+'","'+obj.shop.domain+'","'+obj.shop.id+'","'+obj.shop.email+'",1)';
							   conn.query(qry_insert_store, function (error, results) {
							   if (error) throw error;
							   res.end(shopResponse);
							   });
							   });
						  }
						  else{
						 //var obj = JSON.parse(shopResponse);
						  req.getConnection(function(error, conn) {	   
						  var qry_update_store = 'UPDATE tbl_stores SET status=1 where id="'+obj.shop.id+'"';
							   conn.query(qry_update_store, function (error, results) {
							   if (error) throw error;
							   });
							   });	   
						  } 
					  });
					  });
							  
				  
				  })
				  .catch((error) => {
				  res.status(error.statusCode).send(error.error.error_description);
				  });
				  
		//-------------------------Shopify Order Create Webhook creation (working correctly)-----------------------------------//		  
				 var options = {
				 method: 'POST',
				 uri: 'https://' + shop + '/admin/webhooks.json',
				 //qs: {
		//			access_token: '1d842843c9196486c5566376db3a14fc' // -> uri + '?access_token=xxxxx%20xxxxx'
		//		 },
				
				 body: {
					"webhook": {
					"topic": "orders/create",
					"address": "https://19a8718e.ngrok.io/shopify_response/order_created",
					"format": "json"
				  }
				 },
				 headers: {
					'X-Shopify-Access-Token': accessToken,
					'User-Agent': 'Request-Promise',
					'Content-Type': 'application/json'
				 },
				 json: true // Automatically stringifies the body to JSON
				 };
			 
				 request(options)
				.then(function (parsedBody) {
					// POST succeeded...
					//console.log(parsedBody);
				})
				.catch(function (err) {
					console.log(err);
					// POST failed...
				});
				  
		//---------------------------------------------------------------------------------------------------//	
			  
		//-------------------------Onfleet Task Assigned Webhook creation  (working correctly)-------------------------------------//	
			  
				onfleet.webhooks.create(
				  {"url":"https://19a8718e.ngrok.io/onfleet_response/task_assigned","trigger":9,"triggerName":"Test Task Assigned"}
				).then(function(webhook) {
				  // New webhook created
					 console.log(webhook);
				}).catch(function(err) {
				  // Deal with an error
				  console.log(err);
				}); 
		//---------------------------------------------------------------------------------------------------//			 
		})
		.catch((error) => {
		  res.status(error.statusCode).send(error.error.error_description);
		});
		
	   }
	   
	   else{
	   
		   const accessTokenRequestUrl = 'https://' + shop + '/admin/oauth/access_token';
			const accessTokenPayload = {
			  client_id: apiKey,
			  client_secret: apiSecret,
			  code,
			};
			
		  request.post(accessTokenRequestUrl, { json: accessTokenPayload })
		 .then((accessTokenResponse) => {
		  const accessToken = accessTokenResponse.access_token;
		  
		  req.session.ShopifyAccessToken = accessToken;
		  req.session.save();
		  
		   console.log(req.session.ShopifyAccessToken);    
			   const store_url = shop;
			   
			   const shopRequestUrl = 'https://' + shop + '/admin/shop.json';
				  const shopRequestHeaders = {
					'X-Shopify-Access-Token': accessToken,
				  };
			   
			   request.get(shopRequestUrl, { headers: shopRequestHeaders })
			   .then((shopResponse) => {
			   
			   var obj = JSON.parse(shopResponse);
			   const shop_id   = obj.shop.id;
			   const shop_name = obj.shop.name;
			   console.log('Uploadvvv', shopResponse);
			   
			   
			   })
			   .catch((error) => {
			   res.status(error.statusCode).send(error.error.error_description);
			   });
			   
			   
		  })
		 .catch((error) => {
		  res.status(error.statusCode).send(error.error.error_description);
		 });	
	   
	   }
	   	   
   });
   });
   
   res.redirect('/index');
	  
  } else {
    res.status(400).send('Required parameters missing');
  }
});


app.use(function(req, res, next) {
  res.locals.delvy_date = req.session.delvy_date; 	
  res.locals.delvy_time_window = req.session.delvy_time_window; 
  res.locals.ShopifyAccessToken = req.session.ShopifyAccessToken;
  
  next();
});


app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});