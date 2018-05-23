var express = require('express');
var app = express();
var onfleet = require('onfleet')('33e1d0ed7307639a67c1a22db0ee4eed');

const request = require('request-promise');

app.get('/order_created_get', function (req, res) {
     //res.redirect('/shopify_response/order_created_get_resp');
	 console.log('order created');
	// console.log(req.session);
	 //var sees = req.session;
	 //console.log(sees.delvy_time_window);
	 /*var delivery_time       = req.session.delvy_time_window;
	 var delivery_time_arr   = delivery_time.split('-');
	 var delivery_time_start = delivery_time_arr[0].trim();
	 var delivery_time_end   = delivery_time_arr[1].trim();*/
	 
	 //console.log(req.cookies.delDate);
	 //console.log(req.session.delvy_time_window);
	 console.log(req);
	 console.log(req.session.delvy_date);
	 //console.log(delivery_time_start);
	// console.log(delivery_time_end);
	
	
	/*var options = {
    uri: 'https://onfleet-test-store.myshopify.com/admin/webhooks.json',
    qs: {
        access_token: '5284f2c00279edcff6b36a7c2e903fdc'// -> uri + '?access_token=xxxxx%20xxxxx'
    },
    headers: {
        'User-Agent': 'Request-Promise'
    },
    json: true // Automatically parses the JSON string in the response
};
 
request(options)
    .then(function (repos) {
        //console.log('User has %d repos', repos.length);
		console.log(repos);
    })
    .catch(function (err) {
        // API call failed...
    });
	*/
	
	
	
	/*var options = {
	method: 'DELETE',	
    uri: 'https://onfleet-test-store.myshopify.com/admin/webhooks/263923073066.json',
    qs: {
        access_token: 'afc99dc0537d5eb884d7fbfce11ddf79' // -> uri + '?access_token=xxxxx%20xxxxx'
    },
    headers: {
        'User-Agent': 'Request-Promise'
    },
    json: true // Automatically parses the JSON string in the response
};
 
request(options)
    .then(function (repos) {
        //console.log('User has %d repos', repos.length);
		console.log(repos);
    })
    .catch(function (err) {
        // API call failed...
		console.log(err);
    });*/
	
	
	/*var options = {
				 method: 'POST',
				 uri: 'https://onfleet-test-store.myshopify.com/admin/webhooks.json',
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
					'X-Shopify-Access-Token': '1d842843c9196486c5566376db3a14fc',
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
				});*/
	 
});

app.get('/order_created_get_resp', function (req, res) {
	console.log(req);
	console.log(req.session);
/* var passedVariable = req.query.data;
 console.log(req.session.delvy_date)
 console.log(passedVariable);*/

});
/*var sess;
app.use('/', function (request, response, next) {
	sess=request.session;
	request.sessID = sess.sessId;
	return next();
});*/

app.post('/order_created', function (request, response) {
	
     //console.log(res);
	// console.log(req.header.parsedOriginalUrl);
	//console.log(request.sessID);
	console.log(request);
	// console.log(request.session.delvy_date);
	 console.log(request.session.id);
	// console.log('order created post');
	 //console.log(req.headers);
	  
	// console.log(req.cookies.delDate);
	 // let Shopify know we received the order details ok
	 
	 //console.log(req.session);
   //  console.log(request.sessionStore.sessions);
	//console.log(request.sessionStore.sessions[0]);
	
	
	 //console.log(req.sessionStore.sessions.cookie.delvy_date);
	// console.log(req.sessionStore.sessions.cookie.delvy_time_window);
	 //console.log(req.sessionStore.MemoryStore[0].sessions);
	 //console.log(req.sessionStore.MemoryStore[0]['sessions']);
	 //console.log(req.sessionStore.MemoryStore);
	//console.log(req.socket);
	 //console.log(req.sessionStore);
	 //var ddd= JSON.parse(req.sessionStore);
	 //console.log(ddd);
	 //console.log(req.sessionStore.MemoryStore['domain']);
	 
	
	
	 
	
	// console.log(request.session.delvy_date);
	 /* var delivery_time       = req.session.delvy_time_window;
	 var delivery_time_arr   = delivery_time.split('-');
	 var delivery_time_start = delivery_time_arr[0].trim();
	 var delivery_time_end   = delivery_time_arr[1].trim();*/
	 /*var sees = req.session;
	 
	 console.log(req.session);
	 console.log(sees.delvy_time_window);*/
	 
	 // the body of the data received
	 
	 
	// var theData = request.body;
	// console.log(theData) 
	response.send('OK');
	//res.setHeader("Content-Type", "application/json"); 
	// res.redirect('/shopify_response/order_created_get_resp?data='+encodeURIComponent(theData));
	 
	
	 //res.redirect('/shopify_response/order_created_get_resp');
	// window.location="/shopify_response/order_created_get_resp";
	// window.location.href = "/shopify_response/order_created_get_resp";
	 //res.end();
	
	/* var shopify_order_id = theData['id'];
	 var customer_name    = theData['customer']['first_name']+' '+theData['customer']['last_name'];
	 var customer_addrs   = theData['customer']['default_address']['address1'];
	 var customer_phone   = theData['customer']['phone'];
	 var special_note     = 'Test special note from customer';*/
	 
	 //------------Test variables check by (send test notification) on shopify webhook------------//
	 
	 /*var d1 = Date.parse("2018-05-05 08:00 AM");
	 var d2 = Date.parse("2018-05-05 12:00 PM");
	 
	 console.log(d1);
	 console.log(d2);
	 
	 var shopify_order_id  = '2342342345636';
	 var customer_name  = 'Muhammad Usman';
	 var customer_addrs = '123 Elm Street, Somerville, MA, USA';
	 var customer_phone = '+923455393489';
	 var special_note   = 'Test special note from customer';*/
	 
	 /*console.log(theData);
	 console.log(customer_name);
	 console.log(customer_addrs);
	 console.log(customer_phone);
	 console.log(special_note);*/
	  
	  
	  
	// List a Teams created on onfleet :
	  /*onfleet.teams.list().then(function(task) {
		// New task created
		console.log(task);
	  }).catch(function(err) {
		console.log(err);
		// Deal with an error
	  });*/
	
   // Create a new task :
	 /* onfleet.tasks.create(
	  {"destination":{"address":{"unparsed":""+customer_addrs+""},"notes":"Small green door by garage door has pin pad, enter *4821*"},"recipients":[{"name":""+customer_name+"","phone":""+customer_phone+"","notes":""+special_note+""}],"completeAfter":1525503600000,"completeBefore":1525518000000,"notes":"some test task detail","autoAssign":{"mode":"distance","team":"KRzIbnnGc3cT5nQnZR8tzFhj"}}
	  ).then(function(task) {
		 var onfleet_task_id = task.id;
		 
		   var today 	  = new Date();
		   var month 	  = today.getMonth()+ 1;
		   var day   	  = today.getDate();
		   var year       = today.getFullYear();
		   var day_number = today.getDay();
		   
		   if (month.length < 2) month = '0' + month;
		   if (day.length < 2) day = '0' + day;
		   // Today date	
		   var today_date = year+'-'+month+'-'+day;
		 
		 req.getConnection(function(error, conn) {
		 conn.query('INSERT into tbl_shopify_order (shopify_order_id,onfleet_task_id,store_id,status,date)values("'+shopify_order_id+'","'+onfleet_task_id+'",26407184,1,"'+today_date+'")', function (error, results) {
         if (error) throw error;	  
		 });
		 });
		// New task created
		console.log(task);
	  }).catch(function(err) {
		console.log(err);
		// Deal with an error
	  });*/
			 
});

/** 
 * We assign app object to module.exports
 * 
 * module.exports exposes the app object as a module
 * 
 * module.exports should be used to return the object 
 * when this file is required in another module like app.js
 */ 
module.exports = app;